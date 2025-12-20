import Image from 'next/image'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

interface NewsItem {
  id: number
  title: string
  imageUrl: string
  thumbnailUrl?: string
  description: string
  content?: string
  category: string
  author?: string
  viewCount: number
  isFeatured: boolean
  createdAt: string
}

async function getNewsItems(): Promise<NewsItem[]> {
  try {
    const res = await fetch(`${API_URL}/api/public/news/active?page=0&size=100`, {
      next: { revalidate: 60 } // ISR: revalidate every 60 seconds
    })
    
    if (!res.ok) {
      return []
    }
    
    const data = await res.json()
    return data.content || []
  } catch (error) {
    console.error('Error fetching news items:', error)
    return []
  }
}

export default async function NewsPage() {
  const items = await getNewsItems()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Latest News</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No news available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <Link 
              key={item.id} 
              href={`/news/${item.id}`}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="relative h-64 bg-gray-200">
                  <Image
                    src={`${API_URL}${item.thumbnailUrl || item.imageUrl}`}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {item.isFeatured && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-600">{item.category}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2 mb-4">{item.description}</p>
                  {item.author && (
                    <p className="text-sm text-gray-500">By {item.author}</p>
                  )}
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                    <span>👁 {item.viewCount} views</span>
                    <span className="text-blue-600 font-medium group-hover:underline">
                      Read more →
                    </span>
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