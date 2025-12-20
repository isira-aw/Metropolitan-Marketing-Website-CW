'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

interface BrandItem {
  imageUrl: string
  link: string
  name: string
}

interface CustomerItem {
  imageUrl: string
  link: string
  name: string
}

interface PlatformItem {
  imageUrl: string
  link: string
  name: string
}

interface RecommendationItem {
  imageUrl: string
  link: string
  name: string
  message: string
  rating: number
}

interface HomeContent {
  welcomeMessage: string
  shortParagraph: string
  ourBrands: BrandItem[]
  ourCustomers: CustomerItem[]
  ourPlatforms: PlatformItem[]
  recommendations: RecommendationItem[]
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg 
    className="w-5 h-5" 
    fill={filled ? 'currentColor' : 'none'} 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
    />
  </svg>
)

export default function Home() {
  const [content, setContent] = useState<HomeContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHomeContent()
  }, [])

  const fetchHomeContent = async () => {
    try {
      const response = await fetch(`${API_URL}/api/public/home`)
      const data = await response.json()
      setContent(data)
    } catch (error) {
      console.error('Error fetching home content:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            {content?.welcomeMessage || 'Welcome to Our Platform'}
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {content?.shortParagraph || 'Discover our amazing products and services'}
          </p>
          <div className="space-x-4">
            <Link 
              href="/news" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
            >
              View news
            </Link>
            <Link 
              href="/contact" 
              className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Our Brands Section */}
      {content?.ourBrands && content.ourBrands.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Brands</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {content.ourBrands.map((brand, index) => (
                <a
                  key={index}
                  href={brand.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-500 flex items-center justify-center aspect-square">
                    {brand.imageUrl ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={`${API_URL}${brand.imageUrl}`}
                          alt={brand.name}
                          fill
                          className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                        />
                      </div>
                    ) : (
                      <span className="text-lg font-semibold text-gray-700">{brand.name}</span>
                    )}
                  </div>
                  <p className="text-center mt-3 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition">
                    {brand.name}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Customers Section */}
      {content?.ourCustomers && content.ourCustomers.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Our Customers</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Trusted by leading companies around the world
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {content.ourCustomers.map((customer, index) => (
                <a
                  key={index}
                  href={customer.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-400"
                >
                  <div className="relative h-24 mb-3">
                    {customer.imageUrl ? (
                      <Image
                        src={`${API_URL}${customer.imageUrl}`}
                        alt={customer.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-lg font-semibold text-gray-700">{customer.name}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-center text-sm font-medium text-gray-700 group-hover:text-blue-600 transition">
                    {customer.name}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Platforms Section */}
      {content?.ourPlatforms && content.ourPlatforms.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Our Platforms</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Integrated with the best platforms for your success
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {content.ourPlatforms.map((platform, index) => (
                <a
                  key={index}
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-blue-500"
                >
                  <div className="relative h-20 mb-4">
                    {platform.imageUrl ? (
                      <Image
                        src={`${API_URL}${platform.imageUrl}`}
                        alt={platform.name}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-lg font-semibold text-gray-700">{platform.name}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-center font-semibold text-gray-800 group-hover:text-blue-600 transition">
                    {platform.name}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section (Static) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl transition-shadow border border-gray-200">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Quality Service</h3>
              <p className="text-gray-600">We provide top-notch services to our clients with attention to detail</p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl transition-shadow border border-gray-200">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Fast Delivery</h3>
              <p className="text-gray-600">Quick turnaround time for all projects without compromising quality</p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl transition-shadow border border-gray-200">
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Professional Team</h3>
              <p className="text-gray-600">Experienced professionals dedicated to your success</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials/Recommendations Section */}
      {content?.recommendations && content.recommendations.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
              What Our Clients Say
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200"
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-4 text-yellow-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} filled={star <= recommendation.rating} />
                    ))}
                  </div>

                  {/* Message */}
                  <p className="text-gray-700 mb-6 italic leading-relaxed">
                    "{recommendation.message}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      {recommendation.imageUrl ? (
                        <Image
                          src={`${API_URL}${recommendation.imageUrl}`}
                          alt={recommendation.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500 font-bold text-xl">
                          {recommendation.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{recommendation.name}</p>
                      {recommendation.link && (
                        <a
                          href={recommendation.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View Profile →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers and experience excellence
          </p>
          <div className="space-x-4">
            <Link 
              href="/contact" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition inline-block text-lg"
            >
              Contact Us Today
            </Link>
            <Link 
              href="/news" 
              className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition inline-block text-lg"
            >
              View Our News
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}