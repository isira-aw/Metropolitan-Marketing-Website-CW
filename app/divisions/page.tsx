'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

// Normalize image path to ensure it starts with /
function getImageUrl(path: string | null | undefined): string {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${API_URL}${normalizedPath}`
}

interface Division {
  divisionsId: string
  divisionsName: string
  slug: string
  status: string
  displayOrder: number
  basicInfo?: {
    shortDescription: string
    longDescription: string
    bannerImage: string
  }
  createdAt: string
  updatedAt: string
}

export default function DivisionsPage() {
  const [divisions, setDivisions] = useState<Division[]>([])
  const [loading, setLoading] = useState(true)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/public/divisions`, {
          cache: 'no-store'
        })
        if (res.ok) {
          const data = await res.json()
          setDivisions(data)
        }
      } catch (error) {
        console.error('Error fetching divisions:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()

    // Intersection Observer for card animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleCards((prev) => new Set(prev).add(index))
          }
        })
      },
      { threshold: 0.1 }
    )

    const cards = document.querySelectorAll('[data-card]')
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [loading])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-metro-blue/30 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-metro-red border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-metro-gray text-lg font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-metro-blue via-blue-700 to-metro-red overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-metro-red rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-down">
            Our Divisions
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">
            Explore our diverse divisions and discover the services we offer
          </p>
          <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {divisions.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🏢</div>
            <p className="text-gray-500 text-xl mb-4">No divisions available yet.</p>
            <p className="text-gray-400">Check back soon for updates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {divisions.map((division, index) => (
              <Link
                key={division.divisionsId}
                href={`/divisions/${division.slug}`}
                data-card
                data-index={index}
                className={`group cursor-pointer transition-all duration-700 ${
                  visibleCards.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="hover-lift bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-metro-blue transition-all duration-300 h-full">
                  {division.basicInfo?.bannerImage && (
                    <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      <Image
                        src={getImageUrl(division.basicInfo.bannerImage)}
                        alt={division.divisionsName}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-metro-blue/80 via-metro-blue/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                          {division.divisionsName}
                        </h3>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    {!division.basicInfo?.bannerImage && (
                      <h3 className="text-2xl font-bold mb-4 text-metro-gray group-hover:text-metro-blue transition-colors duration-300">
                        {division.divisionsName}
                      </h3>
                    )}
                    {division.basicInfo?.shortDescription && (
                      <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                        {division.basicInfo.shortDescription}
                      </p>
                    )}
                    <div className="flex items-center text-metro-blue group-hover:text-metro-red font-semibold transition-colors duration-300">
                      <span>Learn more</span>
                      <svg
                        className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-metro-gray mb-6">
            Need More Information?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-metro-blue to-metro-red mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 mb-8">
            Our team is here to help you find the right solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-metro-blue text-white rounded-full font-semibold hover:bg-metro-red transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              Contact Us
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-transparent border-2 border-metro-blue text-metro-blue rounded-full font-semibold hover:bg-metro-blue hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
