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
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  const points = [
    { icon: '🚀', text: 'Powering Progress with Precision' },
    { icon: '⚡', text: 'Electrical Engineering Excellence Across Six Divisions.' },
    { icon: '🌍', text: 'Powering the Future Through Integrated Expertise' }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % points.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

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

      {/* Our Vision/Mission Section */}
      <section
        id="vision"
        data-animate
        className={`py-20 bg-white transition-all duration-1000 ${
          visibleSections.has('vision') ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Content - Vision & Mission */}
            <div className="space-y-10">
              {/* Vision */}
              <h2 className="text-4xl font-bold text-metro-gray mb-6">
                  Our <span className="text-metro-blue">Vision</span>
                </h2>
              <div className="hover-lift">
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-metro-blue transition-all duration-300">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    A Metropolitan solution in every Place of Work.
                  </p>
                </div>
              </div>

              {/* Mission */}
              <h2 className="text-4xl font-bold text-metro-gray mb-6">
                  Our <span className="text-metro-red">Mission</span>
                </h2>
              <div className="hover-lift">
                
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-metro-red transition-all duration-300">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We offer Work Place and Personal Productivity solutions 
                    and services, that exceed customer expectations and unparalleled 
                    marketing capabilities to our business partners whilst providing 
                    our Staff the opportunity for personal advancement with performance 
                    based recognition and rewards.
                  </p>
                </div>
              </div>

              {/* Vision Points */}
              <div className="flex items-center gap-4 bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border-2 border-gray-200 hover:border-metro-blue transition-all duration-300 hover-lift">
  <div className="text-4xl flex-shrink-0">{points[currentIndex].icon}</div>
  <span className="text-gray-700 font-medium">{points[currentIndex].text}</span>
</div>

            </div>

            {/* Right Visual Card - Corporate Values */}
            <div className="hover-lift lg:sticky lg:top-8 rounded-xl border-2 border-gray-200 hover:border-metro-blue transition-all duration-300 hover-lift">
              <div className="bg-gradient-to-br  to-blue-700 rounded-3xl p-8 text-white shadow-2xl">
                <h3 className="text-3xl font-bold mb-6 text-center">Corporate Values</h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/20">
                  <img 
                    src="https://ik.imagekit.io/ayen/Metropolitan/metro-values-graph2.png"
                    alt="Corporate Values"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Brands Section */}
      {content?.ourBrands && content.ourBrands.length > 0 && (
        <section
          id="brands"
          data-animate
          className={`py-20 bg-gray-50 transition-all duration-1000 ${visibleSections.has('brands')
            ? 'opacity-100 translate-y-0'
            : 'opacity-100 translate-y-0'
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
                          src={`${API_URL}${brand.imageUrl}`}
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
          className={`py-20 bg-white transition-all duration-1000 ${visibleSections.has('customers') ? 'opacity-100 translate-y-0'
            : 'opacity-100 translate-y-0'
            }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-metro-gray mb-4">Our Customers</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-metro-blue to-metro-red mx-auto mt-4 rounded-full"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">
                Trusted by leading companies around the world
              </p>
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
                        src={`${API_URL}${customer.imageUrl}`}
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
          className={`py-20 bg-gray-50 transition-all duration-1000 ${visibleSections.has('platforms') ? 'opacity-100 translate-y-0'
            : 'opacity-100 translate-y-0'
            }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-metro-gray mb-4">Our Platforms</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-metro-blue to-metro-red mx-auto mt-4 rounded-full"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">
                Integrated with the best platforms for your success
              </p>
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
                        src={`${API_URL}${platform.imageUrl}`}
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

      {/* Why Choose Us Section */}
      <section
        id="why-choose-us"
        data-animate
        className={`py-20 bg-white transition-all duration-1000 ${
          visibleSections.has('why-choose-us') ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-metro-gray mb-4">Why Choose Us?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-metro-blue to-metro-red mx-auto mt-6 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
              We consider our customers as partners and share our business 
              acumen and entrepreneurial vision to create and implement 
              innovative solutions to empower their success.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: '/Assets/Images/icons/experienced-team-icon.svg', title: 'Experienced Team' },
              { icon: '/Assets/Images/icons/tools-icon.svg', title: 'Advanced Equipment' },
              { icon: '/Assets/Images/icons/trained-staff-icon.svg', title: 'Trained Staff' },
              { icon: '/Assets/Images/icons/gear-icon.svg', title: 'Genuine Spare Parts' },
              { icon: '/Assets/Images/icons/24-hours-call-icon.svg', title: '24/7/365 Service' },
              { icon: '/Assets/Images/icons/product-icon.svg', title: 'Ex-Stock Products' },
              { icon: '/Assets/Images/icons/handshake-icon.svg', title: 'Trusted Partner' },
              { icon: '/Assets/Images/icons/quality-icon.svg', title: 'Quality Assurance' }
            ].map((feature, index) => (
              <div
                key={index}
                className="group hover-lift bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 text-center border-2 border-gray-200 hover:border-metro-blue transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <img 
                    src={feature.icon} 
                    alt={feature.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-base font-semibold text-metro-gray group-hover:text-metro-blue transition-colors duration-300">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Two Column Section - Blog */}
      <section
        id="blog-cta"
        data-animate
        className={`py-0 bg-white transition-all duration-1000 ${
          visibleSections.has('blog-cta') ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200">
            {/* Text Content */}
            <div className="p-12 lg:p-16 order-2 lg:order-1">
              <h3 className="text-4xl md:text-5xl font-bold text-metro-gray mb-6">
                What have we done?
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Showcasing our projects and engineering achievements across diverse industries.
              </p>
              <Link
                href="/blogs"
                className="inline-block px-8 py-4 bg-gradient-to-r from-metro-blue to-blue-700 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
              >
                Our Blog
              </Link>
            </div>
            {/* Image Content */}
            <div className="relative h-80 lg:h-full min-h-[400px] bg-gradient-to-br from-metro-blue/10 to-metro-red/10 order-1 lg:order-2">
              <div className="absolute inset-0 bg-[url('/Assets/Images/blog-image.jpg')] bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-metro-blue/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Section - Contact */}
      <section
        id="contact-cta"
        data-animate
        className={`py-20 bg-white transition-all duration-1000 ${
          visibleSections.has('contact-cta') ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200">
            {/* Image Content */}
            <div className="relative h-80 lg:h-full min-h-[400px] bg-gradient-to-br from-metro-red/10 to-metro-blue/10">
              <div className="absolute inset-0 bg-[url('/Assets/Images/contact-image.jpg')] bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-gradient-to-l from-metro-red/20 to-transparent"></div>
            </div>
            {/* Text Content */}
            <div className="p-12 lg:p-16">
              <h3 className="text-4xl md:text-5xl font-bold text-metro-gray mb-6">
                Get in Touch
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed mt ">
                Have questions or projects? Let's talk.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-gradient-to-r from-metro-red to-red-700 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {content?.recommendations && content.recommendations.length > 0 && (
        <section
          id="testimonials"
          data-animate
          className={`py-20 bg-gray-50 transition-all duration-1000 ${visibleSections.has('testimonials') ? 'opacity-100 translate-y-0'
            : 'opacity-100 translate-y-0'
            }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-metro-gray mb-4">
                What Our Clients Say
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-metro-blue to-metro-red mx-auto mt-4 rounded-full"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">
                Don't just take our word for it - hear from our satisfied clients
              </p>
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
                          src={`${API_URL}${recommendation.imageUrl}`}
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