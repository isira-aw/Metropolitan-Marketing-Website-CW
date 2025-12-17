import Image from 'next/image'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

interface GalleryItem {
  id: number
  title: string
  imageUrl: string
  description: string
  category: string
  displayOrder: number
}

async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const res = await fetch(`${API_URL}/api/public/gallery`, {
      next: { revalidate: 60 } // ISR: revalidate every 60 seconds
    })
    
    if (!res.ok) {
      return []
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return []
  }
}

export default async function GalleryPage() {
  const items = await getGalleryItems()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Our Gallery</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No gallery items available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <Link 
              key={item.id} 
              href={`/gallery/${item.id}`}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="relative h-64 bg-gray-200">
                  <Image
                    src={`${API_URL}${item.imageUrl}`}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-600 mb-2">{item.category}</div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
