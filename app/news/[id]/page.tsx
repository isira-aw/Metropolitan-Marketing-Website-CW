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
  updatedAt: string
}

async function getNewsItem(id: string): Promise<NewsItem | null> {
  try {
    const res = await fetch(`${API_URL}/api/public/news/${id}`, {
      next: { revalidate: 60 }
    })
    
    if (!res.ok) {
      return null
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching news item:', error)
    return null
  }
}

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const item = await getNewsItem(params.id)

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">News Not Found</h1>
          <Link href="/news" className="text-blue-600 hover:underline">
            Back to News
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/news" className="text-blue-600 hover:underline mb-8 inline-block">
        ← Back to News
      </Link>
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm text-blue-600 font-medium">{item.category}</span>
          {item.isFeatured && (
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              Featured
            </span>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{item.title}</h1>
        <div className="flex items-center gap-6 text-gray-600 text-sm">
          {item.author && <span>By {item.author}</span>}
          <span>{new Date(item.createdAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
          <span>👁 {item.viewCount} views</span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative h-96 lg:h-[500px] bg-gray-200 rounded-lg overflow-hidden mb-8">
        <Image
          src={`${API_URL}${item.imageUrl}`}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 896px"
          priority
        />
      </div>

      {/* Description */}
      {item.description && (
        <div className="mb-8">
          <p className="text-xl text-gray-700 leading-relaxed font-medium">
            {item.description}
          </p>
        </div>
      )}

      {/* Content */}
      {item.content && (
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {item.content}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Last updated: {new Date(item.updatedAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          <Link 
            href="/news"
            className="text-blue-600 hover:underline font-medium"
          >
            ← Back to all news
          </Link>
        </div>
      </div>
    </div>
  )
}