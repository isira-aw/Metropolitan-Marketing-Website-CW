import Image from 'next/image'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

interface AboutUs {
  id: number
  companyName: string
  companyDescription: string
  ownerName: string
  ownerTitle: string
  ownerDescription: string
  ownerImageUrl: string
}

async function getAboutUs(): Promise<AboutUs | null> {
  try {
    const res = await fetch(`${API_URL}/api/public/about`, {
      next: { revalidate: 60 }
    })
    
    if (!res.ok) {
      return null
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching about us:', error)
    return null
  }
}

export default async function AboutPage() {
  const about = await getAboutUs()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">About Us</h1>
      
      {about ? (
        <>
          {/* Company Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">{about.companyName || 'Our Company'}</h2>
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
              {about.companyDescription || 'Welcome to our company.'}
            </p>
          </div>

          {/* Owner/Team Section */}
          {about.ownerName && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {about.ownerImageUrl && (
                  <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={`${API_URL}${about.ownerImageUrl}`}
                      alt={about.ownerName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold mb-2">{about.ownerName}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{about.ownerTitle}</p>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {about.ownerDescription}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Loading company information...</p>
        </div>
      )}
    </div>
  )
}
