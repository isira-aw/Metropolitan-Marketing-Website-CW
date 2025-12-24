import Image from 'next/image'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

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

async function getDivisions(): Promise<Division[]> {
  try {
    const res = await fetch(`${API_URL}/api/public/divisions`, {
      next: { revalidate: 60 }
    })
    
    if (!res.ok) {
      return []
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching divisions:', error)
    return []
  }
}

export default async function DivisionsPage() {
  const divisions = await getDivisions()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">Our Divisions</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Explore our diverse divisions and discover the services we offer
      </p>
      
      {divisions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No divisions available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {divisions.map((division) => (
            <Link 
              key={division.divisionsId} 
              href={`/divisions/${division.slug}`}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                {division.basicInfo?.bannerImage && (
                  <div className="relative h-64 bg-gray-200 overflow-hidden">
                    <Image
                      src={`${API_URL}${division.basicInfo.bannerImage}`}
                      alt={division.divisionsName}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                    {division.divisionsName}
                  </h3>
                  {division.basicInfo?.shortDescription && (
                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {division.basicInfo.shortDescription}
                    </p>
                  )}
                  <div className="flex items-center text-blue-600 font-medium group-hover:underline">
                    Learn more
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}