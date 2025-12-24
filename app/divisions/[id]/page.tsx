import Image from 'next/image'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

interface Division {
  divisionsId: string
  divisionsName: string
  slug: string
  status: string
  basicInfo?: {
    shortDescription: string
    longDescription: string
    bannerImage: string
  }
  subDivisions?: SubDivision[]
  contactUs?: {
    location: { latitude: string; longitude: string }
    contacts: Contact[]
  }
}

interface SubDivision {
  subDivisionsName: string
  simpleDivisions: string
  keyFeatures: string[]
  globalPartners: Partner[]
  brands: Partner[]
  sections: Section[]
  responsiblePersons: ResponsiblePerson[]
}

interface Partner {
  imageUrl: string
  link: string
  name: string
}

interface Section {
  title: string
  description: string
}

interface ResponsiblePerson {
  profileImage: string
  name: string
  designation: string
  contactNumber: string
  email: string
  whatsAppNumber: string
  vCard: string
}

interface Contact {
  title: string
  description: string
  email: string
  number: string
}

async function getDivision(slug: string): Promise<Division | null> {
  try {
    const res = await fetch(`${API_URL}/api/public/divisions/slug/${slug}`, {
      next: { revalidate: 60 }
    })
    
    if (!res.ok) {
      return null
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching division:', error)
    return null
  }
}

export default async function DivisionDetailPage({ params }: { params: { id: string } }) {
  const division = await getDivision(params.id)

  if (!division) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Division Not Found</h1>
          <Link href="/divisions" className="text-blue-600 hover:underline">
            Back to Divisions
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {division.basicInfo?.bannerImage && (
        <div className="relative h-96 bg-gray-900">
          <Image
            src={`${API_URL}${division.basicInfo.bannerImage}`}
            alt={division.divisionsName}
            fill
            className="object-cover opacity-50"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-5xl font-bold mb-4">{division.divisionsName}</h1>
              {division.basicInfo.shortDescription && (
                <p className="text-xl max-w-2xl mx-auto">
                  {division.basicInfo.shortDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/divisions" className="text-blue-600 hover:underline mb-8 inline-block">
          ← Back to Divisions
        </Link>

        {/* Long Description */}
        {division.basicInfo?.longDescription && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
              {division.basicInfo.longDescription}
            </p>
          </div>
        )}

        {/* Sub-Divisions */}
        {division.subDivisions && division.subDivisions.length > 0 && (
          <div className="space-y-12">
            {division.subDivisions.map((subDiv, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Sub-Division Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
                  <h2 className="text-3xl font-bold mb-2">{subDiv.subDivisionsName}</h2>
                  {subDiv.simpleDivisions && (
                    <p className="text-blue-100 text-lg">{subDiv.simpleDivisions}</p>
                  )}
                </div>

                <div className="p-8 space-y-8">
                  {/* Key Features */}
                  {subDiv.keyFeatures && subDiv.keyFeatures.length > 0 && (
                    <section>
                      <h3 className="text-2xl font-bold mb-4 flex items-center">
                        <span className="text-blue-600 mr-2">✓</span> Key Features
                      </h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {subDiv.keyFeatures.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start">
                            <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* Sections */}
                  {subDiv.sections && subDiv.sections.length > 0 && (
                    <section>
                      <h3 className="text-2xl font-bold mb-6">Our Services</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {subDiv.sections.map((section, sIndex) => (
                          <div key={sIndex} className="border-l-4 border-blue-600 pl-4 py-2">
                            <h4 className="text-lg font-semibold mb-2">{section.title}</h4>
                            <p className="text-gray-600">{section.description}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Global Partners */}
                  {subDiv.globalPartners && subDiv.globalPartners.length > 0 && (
                    <section>
                      <h3 className="text-2xl font-bold mb-6">Global Partners</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {subDiv.globalPartners.map((partner, pIndex) => (
                          <a
                            key={pIndex}
                            href={partner.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white p-4 rounded-lg border hover:shadow-lg transition flex items-center justify-center"
                            title={partner.name}
                          >
                            <div className="relative w-full h-20">
                              <Image
                                src={`${API_URL}${partner.imageUrl}`}
                                alt={partner.name}
                                fill
                                className="object-contain"
                                sizes="200px"
                              />
                            </div>
                          </a>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Brands */}
                  {subDiv.brands && subDiv.brands.length > 0 && (
                    <section>
                      <h3 className="text-2xl font-bold mb-6">Brands We Carry</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {subDiv.brands.map((brand, bIndex) => (
                          <a
                            key={bIndex}
                            href={brand.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white p-4 rounded-lg border hover:shadow-lg transition flex items-center justify-center"
                            title={brand.name}
                          >
                            <div className="relative w-full h-20">
                              <Image
                                src={`${API_URL}${brand.imageUrl}`}
                                alt={brand.name}
                                fill
                                className="object-contain"
                                sizes="200px"
                              />
                            </div>
                          </a>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Responsible Persons */}
                  {subDiv.responsiblePersons && subDiv.responsiblePersons.length > 0 && (
                    <section>
                      <h3 className="text-2xl font-bold mb-6">Contact Our Team</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subDiv.responsiblePersons.map((person, rpIndex) => (
                          <div key={rpIndex} className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md p-6 hover:shadow-xl transition">
                            {person.profileImage && (
                              <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-blue-600">
                                <Image
                                  src={`${API_URL}${person.profileImage}`}
                                  alt={person.name}
                                  fill
                                  className="object-cover"
                                  sizes="96px"
                                />
                              </div>
                            )}
                            <h4 className="text-xl font-semibold text-center mb-1">{person.name}</h4>
                            <p className="text-gray-600 text-center mb-4">{person.designation}</p>
                            
                            <div className="space-y-2">
                              {person.email && (
                                <a 
                                  href={`mailto:${person.email}`} 
                                  className="flex items-center text-sm text-gray-700 hover:text-blue-600 transition"
                                >
                                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                  {person.email}
                                </a>
                              )}
                              {person.contactNumber && (
                                <a 
                                  href={`tel:${person.contactNumber}`} 
                                  className="flex items-center text-sm text-gray-700 hover:text-blue-600 transition"
                                >
                                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                  </svg>
                                  {person.contactNumber}
                                </a>
                              )}
                              {person.whatsAppNumber && (
                                <a 
                                  href={`https://wa.me/${person.whatsAppNumber.replace(/[^0-9]/g, '')}`} 
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center text-sm text-green-600 hover:text-green-700 font-medium transition"
                                >
                                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                  </svg>
                                  WhatsApp
                                </a>
                              )}
                              {person.vCard && (
                                <a 
                                  href={person.vCard} 
                                  download
                                  className="flex items-center text-sm text-gray-700 hover:text-blue-600 transition"
                                >
                                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                  </svg>
                                  Download vCard
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact Us Section */}
        {division.contactUs && (
          <div className="mt-12 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
              <h2 className="text-3xl font-bold">Contact Us</h2>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Map */}
                {division.contactUs.location && division.contactUs.location.latitude && division.contactUs.location.longitude && (
                  <div className="bg-gray-200 rounded-lg overflow-hidden h-96">
                    <iframe
                      src={`https://www.google.com/maps?q=${division.contactUs.location.latitude},${division.contactUs.location.longitude}&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title="Location Map"
                    />
                  </div>
                )}
                
                {/* Contact Details */}
                {division.contactUs.contacts && division.contactUs.contacts.length > 0 && (
                  <div className="space-y-6">
                    {division.contactUs.contacts.map((contact, index) => (
                      <div key={index} className="border-l-4 border-blue-600 pl-6 py-4">
                        <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
                        {contact.description && (
                          <p className="text-gray-600 mb-4">{contact.description}</p>
                        )}
                        {contact.email && (
                          <a 
                            href={`mailto:${contact.email}`} 
                            className="flex items-center text-blue-600 hover:underline mb-2"
                          >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {contact.email}
                          </a>
                        )}
                        {contact.number && (
                          <a 
                            href={`tel:${contact.number}`} 
                            className="flex items-center text-blue-600 hover:underline"
                          >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {contact.number}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Back to top */}
        <div className="mt-12 text-center">
          <Link 
            href="/divisions"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            ← Back to All Divisions
          </Link>
        </div>
      </div>
    </div>
  )
}