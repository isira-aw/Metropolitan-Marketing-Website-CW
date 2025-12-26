import BlogFilters from '@/components/BlogFilters'
import Image from 'next/image'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

interface Blog {
  blogId: number
  topic: string
  date: string
  division: string
  imageUrl: string
  shortDescription: string
  slug: string
  viewCount: number
}

interface PageResponse {
  content: Blog[]
  pageNumber: number
  pageSize: number
  totalElements: number
  totalPages: number
  last: boolean
  first: boolean
}

async function getBlogs(
  page: number = 0,
  size: number = 12,
  division?: string,
  keyword?: string
): Promise<PageResponse> {
  try {
    let url = ''
    
    if (division && keyword) {
      url = `${API_URL}/api/public/blogs/division/${division}/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`
    } else if (division) {
      url = `${API_URL}/api/public/blogs/division/${division}?page=${page}&size=${size}`
    } else if (keyword) {
      url = `${API_URL}/api/public/blogs/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`
    } else {
      url = `${API_URL}/api/public/blogs?page=${page}&size=${size}`
    }

    const res = await fetch(url, { next: { revalidate: 60 } })
    
    if (!res.ok) {
      return {
        content: [],
        pageNumber: 0,
        pageSize: size,
        totalElements: 0,
        totalPages: 0,
        last: true,
        first: true
      }
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return {
      content: [],
      pageNumber: 0,
      pageSize: size,
      totalElements: 0,
      totalPages: 0,
      last: true,
      first: true
    }
  }
}

async function getDivisions(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/api/public/blogs/divisions`, {
      next: { revalidate: 3600 }
    })
    
    if (!res.ok) return []
    return res.json()
  } catch (error) {
    return []
  }
}

export default async function BlogsPage({
  searchParams
}: {
  searchParams: { page?: string; division?: string; search?: string }
}) {
  const currentPage = parseInt(searchParams.page || '0')
  const selectedDivision = searchParams.division
  const searchKeyword = searchParams.search

  const [pageData, divisions] = await Promise.all([
    getBlogs(currentPage, 12, selectedDivision, searchKeyword),
    getDivisions()
  ])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-metro-blue via-blue-700 to-metro-red overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-metro-red rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-down">
            Blogs & Articles
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">
            Explore our latest blogs and articles covering a wide range of topics in marketing, advertising, and industry insights.
          </p>
          <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <BlogFilters divisions={divisions} />

        {/* Results Summary */}
        <div className="mb-6 text-gray-600">
          Showing {pageData.content.length} of {pageData.totalElements} articles
        </div>

        {/* Blog Grid */}
        {pageData.content.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blogs found.</p>
            {(selectedDivision || searchKeyword) && (
              <Link
                href="/blogs"
                className="mt-4 inline-block text-blue-600 hover:underline"
              >
                Clear filters to see all blogs
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageData.content.map((blog) => (
              <Link 
                key={blog.blogId} 
                href={`/blogs/${blog.slug}`}
                className="group cursor-pointer"
              >
                <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-64 bg-gray-200 overflow-hidden">
                    <Image
                      src={`${API_URL}${blog.imageUrl}`}
                      alt={blog.topic}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {blog.division}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(blog.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                      <span className="mx-2">•</span>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {blog.viewCount}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {blog.topic}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {blog.shortDescription}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:underline">
                      Read more
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!pageData.last && pageData.content.length > 0 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {!pageData.first && (
              <Link
                href={`/blogs?${new URLSearchParams({
                  ...(selectedDivision && { division: selectedDivision }),
                  ...(searchKeyword && { search: searchKeyword }),
                  page: (currentPage - 1).toString()
                }).toString()}`}
                className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
              >
                Previous
              </Link>
            )}
            
            <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Page {pageData.pageNumber + 1} of {pageData.totalPages}
            </span>
            
            {!pageData.last && (
              <Link
                href={`/blogs?${new URLSearchParams({
                  ...(selectedDivision && { division: selectedDivision }),
                  ...(searchKeyword && { search: searchKeyword }),
                  page: (currentPage + 1).toString()
                }).toString()}`}
                className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}