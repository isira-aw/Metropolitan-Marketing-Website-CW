'use client'

import { useState, useEffect } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

interface ContactInfo {
  id: number
  email: string
  phone: string
  address: string
  facebookUrl: string
  twitterUrl: string
  instagramUrl: string
  linkedinUrl: string
}

async function getContactInfoData(): Promise<ContactInfo | null> {
  try {
    const res = await fetch(`${API_URL}/api/public/contact`, {
      cache: 'no-store'
    })
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    console.error('Error fetching contact info:', error)
    return null
  }
}

export default function ContactPage() {
  const [contact, setContact] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({
    type: null,
    message: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      const data = await getContactInfoData()
      setContact(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate form submission
    setFormStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' })
    setFormData({ name: '', email: '', message: '' })

    setTimeout(() => {
      setFormStatus({ type: null, message: '' })
    }, 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

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
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-down">
            Contact Us
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">
            We'd love to hear from you. Get in touch with our team today!
          </p>
          <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {contact ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="animate-slide-in-left">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-10 border-2 border-gray-200 hover:border-metro-blue transition-all duration-300 hover-lift h-full">
                <h2 className="text-3xl font-bold mb-8 text-metro-gray">Get in Touch</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-metro-blue to-metro-red mb-8 rounded-full"></div>

                <div className="space-y-6">
                  {contact.email && (
                    <div className="flex items-start group">
                      <div className="flex-shrink-0 w-12 h-12 bg-metro-blue/10 rounded-full flex items-center justify-center group-hover:bg-metro-blue group-hover:scale-110 transition-all duration-300">
                        <svg className="w-6 h-6 text-metro-blue group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-lg mb-1 text-metro-gray">Email</h3>
                        <a href={`mailto:${contact.email}`} className="text-metro-blue hover:text-metro-red transition-colors duration-300 text-lg">
                          {contact.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {contact.phone && (
                    <div className="flex items-start group">
                      <div className="flex-shrink-0 w-12 h-12 bg-metro-red/10 rounded-full flex items-center justify-center group-hover:bg-metro-red group-hover:scale-110 transition-all duration-300">
                        <svg className="w-6 h-6 text-metro-red group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-lg mb-1 text-metro-gray">Phone</h3>
                        <a href={`tel:${contact.phone}`} className="text-metro-blue hover:text-metro-red transition-colors duration-300 text-lg">
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {contact.address && (
                    <div className="flex items-start group">
                      <div className="flex-shrink-0 w-12 h-12 bg-metro-gray/10 rounded-full flex items-center justify-center group-hover:bg-metro-gray group-hover:scale-110 transition-all duration-300">
                        <svg className="w-6 h-6 text-metro-gray group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-lg mb-1 text-metro-gray">Address</h3>
                        <p className="text-gray-700 whitespace-pre-wrap text-lg leading-relaxed">{contact.address}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Social Media Links */}
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <h3 className="font-semibold text-lg mb-6 text-metro-gray">Follow Us</h3>
                  <div className="flex space-x-4">
                    {contact.facebookUrl && (
                      <a
                        href={contact.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-metro-blue to-blue-600 text-white flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300"
                        aria-label="Facebook"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                    )}
                    {contact.twitterUrl && (
                      <a
                        href={contact.twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 text-white flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300"
                        aria-label="Twitter"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    )}
                    {contact.instagramUrl && (
                      <a
                        href={contact.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300"
                        aria-label="Instagram"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    )}
                    {contact.linkedinUrl && (
                      <a
                        href={contact.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-metro-blue to-blue-800 text-white flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-slide-in-right">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 md:p-10 border-2 border-gray-200 hover:border-metro-red transition-all duration-300 hover-lift h-full">
                <h2 className="text-3xl font-bold mb-8 text-metro-gray">Send us a Message</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-metro-blue to-metro-red mb-8 rounded-full"></div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2 text-metro-gray">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-metro-blue transition-all duration-300 text-metro-gray"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2 text-metro-gray">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-metro-blue transition-all duration-300 text-metro-gray"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2 text-metro-gray">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-metro-blue transition-all duration-300 resize-none text-metro-gray"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-metro-blue to-metro-red text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg"
                  >
                    Send Message
                  </button>

                  {formStatus.type && (
                    <div className={`p-4 rounded-xl ${formStatus.type === 'success' ? 'bg-green-50 text-green-700 border-2 border-green-200' : 'bg-red-50 text-red-700 border-2 border-red-200'} animate-fade-in`}>
                      {formStatus.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📧</div>
            <p className="text-gray-500 text-xl">Loading contact information...</p>
          </div>
        )}
      </div>
    </div>
  )
}
