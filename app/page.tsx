'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchHomeContent()

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1 }
    )

    const sections = document.querySelectorAll('[data-animate]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
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
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-metro-blue via-blue-700 to-metro-red">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-metro-red rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {content?.welcomeMessage || 'Welcome to Our Platform'}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              {content?.shortParagraph || 'Discover our amazing products and services'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/news"
                className="px-8 py-4 bg-white text-metro-blue rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                View News
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-metro-blue transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Our Brands Section */}
      {content?.ourBrands && content.ourBrands.length > 0 && (
        <section
          id="brands"
          data-animate
          className={`py-20 bg-gray-50 transition-all duration-1000 ${
            visibleSections.has('brands') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-metro-gray mb-4">Our Brands</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-metro-blue to-metro-red mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
              {content.ourBrands.map((brand, index) => (
                <a
                  key={index}
                  href={brand.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-metro-blue transition-all duration-300 flex items-center justify-center aspect-square">
                    {brand.imageUrl ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={getImageUrl(brand.imageUrl)}
                          alt={brand.name}
                          fill
                          className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                        />
                      </div>
                    ) : (
                      <span className="text-lg font-semibold text-metro-gray">{brand.name}</span>
                    )}
                  </div>
                  <p className="text-center mt-4 text-sm font-medium text-metro-gray group-hover:text-metro-blue transition-colors duration-300">
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
        <section
          id="customers"
          data-animate
          className={`py-20 bg-white transition-all duration-1000 ${
            visibleSections.has('customers') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-metro-gray mb-4">Our Customers</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Trusted by leading companies around the world
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-metro-blue to-metro-red mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {content.ourCustomers.map((customer, index) => (
                <a
                  key={index}
                  href={customer.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group hover-lift bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-metro-red transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-24 mb-3">
                    {customer.imageUrl ? (
                      <Image
                        src={getImageUrl(customer.imageUrl)}
                        alt={customer.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-lg font-semibold text-metro-gray">{customer.name}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-center text-sm font-medium text-metro-gray group-hover:text-metro-red transition-colors duration-300">
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
        <section
          id="platforms"
          data-animate
          className={`py-20 bg-gray-50 transition-all duration-1000 ${
            visibleSections.has('platforms') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-metro-gray mb-4">Our Platforms</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Integrated with the best platforms for your success
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-metro-blue to-metro-red mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {content.ourPlatforms.map((platform, index) => (
                <a
                  key={index}
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group hover-lift bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-metro-blue transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-20 mb-4">
                    {platform.imageUrl ? (
                      <Image
                        src={getImageUrl(platform.imageUrl)}
                        alt={platform.name}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-lg font-semibold text-metro-gray">{platform.name}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-center font-semibold text-metro-gray group-hover:text-metro-blue transition-colors duration-300">
                    {platform.name}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section
        id="features"
        data-animate
        className={`py-20 bg-white transition-all duration-1000 ${
          visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-metro-gray mb-4">Why Choose Us</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-metro-blue to-metro-red mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Quality Service', description: 'We provide top-notch services to our clients with attention to detail' },
              { icon: '⚡', title: 'Fast Delivery', description: 'Quick turnaround time for all projects without compromising quality' },
              { icon: '💼', title: 'Professional Team', description: 'Experienced professionals dedicated to your success' }
            ].map((feature, index) => (
              <div
                key={index}
                className="group hover-lift bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center border-2 border-gray-200 hover:border-metro-blue transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-3 text-metro-gray group-hover:text-metro-blue transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {content?.recommendations && content.recommendations.length > 0 && (
        <section
          id="testimonials"
          data-animate
          className={`py-20 bg-gray-50 transition-all duration-1000 ${
            visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-metro-gray mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it - hear from our satisfied clients
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-metro-blue to-metro-red mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="hover-lift bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-metro-red transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex gap-1 mb-4 text-yellow-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} filled={star <= recommendation.rating} />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">
                    "{recommendation.message}"
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-metro-blue to-metro-red flex-shrink-0">
                      {recommendation.imageUrl ? (
                        <Image
                          src={getImageUrl(recommendation.imageUrl)}
                          alt={recommendation.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-white font-bold text-xl">
                          {recommendation.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-metro-gray">{recommendation.name}</p>
                      {recommendation.link && (
                        <a
                          href={recommendation.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-metro-blue hover:text-metro-red transition-colors duration-300"
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
      <section className="py-24 bg-gradient-to-br from-metro-blue via-blue-700 to-metro-red text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Join thousands of satisfied customers and experience excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-metro-blue rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform text-lg"
            >
              Contact Us Today
            </Link>
            <Link
              href="/news"
              className="px-8 py-4 bg-transparent border-2 border-white rounded-full font-semibold hover:bg-white hover:text-metro-blue transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform text-lg"
            >
              View Our News
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
