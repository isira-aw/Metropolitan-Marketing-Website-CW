'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/divisions', label: 'Divisions' },
    { href: '/news', label: 'News' },
    { href: '/blogs', label: 'Blogs' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg py-2'
          : 'bg-white/95 backdrop-blur-md py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-metro-blue to-metro-red bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105 inline-block">
                Metropolitan
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-metro-red group-hover:w-full transition-all duration-300"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 lg:px-4 py-2 text-metro-gray hover:text-metro-blue font-medium transition-colors duration-300 group"
                style={{
                  animation: `fadeInDown 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-metro-red group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-4 px-6 py-2.5 bg-metro-blue text-white rounded-full font-semibold hover:bg-metro-red transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ animation: 'fadeInDown 0.5s ease-out 0.6s both' }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-metro-gray transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-metro-gray transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-metro-gray transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col space-y-2 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-metro-gray hover:text-metro-blue hover:bg-gray-50 rounded-lg font-medium transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mx-4 px-6 py-3 bg-metro-blue text-white rounded-full font-semibold hover:bg-metro-red transition-all duration-300 text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
