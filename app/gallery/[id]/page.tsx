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

async function getGalleryItem(id: string): Promise<GalleryItem | null> {
  try {
    const res = await fetch(`${API_URL}/api/public/gallery/${id}`, {
      next: { revalidate: 60 }
    })
    
    if (!res.ok) {
      return null
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching gallery item:', error)
    return null
  }
}

export default async function GalleryDetailPage({ params }: { params: { id: string } }) {
  const item = await getGalleryItem(params.id)

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Item Not Found</h1>
          <Link href="/gallery" className="text-blue-600 hover:underline">
            Back to Gallery
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/gallery" className="text-blue-600 hover:underline mb-8 inline-block">
        ← Back to Gallery
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative h-96 lg:h-full bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src={`${API_URL}${item.imageUrl}`}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        
        <div>
          <div className="text-sm text-blue-600 mb-2">{item.category}</div>
          <h1 className="text-4xl font-bold mb-6">{item.title}</h1>
          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
