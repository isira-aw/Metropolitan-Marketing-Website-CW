'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface BlogFiltersProps {
  divisions: string[]
}

export default function BlogFilters({ divisions }: BlogFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const selectedDivision = searchParams.get('division') || ''
  const searchKeyword = searchParams.get('search') || ''

  const handleDivisionChange = (division: string) => {
    const params = new URLSearchParams()
    if (division) params.set('division', division)
    if (searchKeyword) params.set('search', searchKeyword)
    router.push(`/blogs?${params.toString()}`)
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const search = formData.get('search') as string
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (selectedDivision) params.set('division', selectedDivision)
    router.push(`/blogs?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/blogs')
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Division Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Filter by Division</label>
          <select
            value={selectedDivision}
            onChange={(e) => handleDivisionChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">All Divisions</option>
            {divisions.map(div => (
              <option key={div} value={div}>{div}</option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div>
          <label className="block text-sm font-medium mb-2">Search</label>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              name="search"
              defaultValue={searchKeyword}
              placeholder="Search blogs..."
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedDivision || searchKeyword) && (
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-600">Active filters:</span>
          {selectedDivision && (
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {selectedDivision}
            </span>
          )}
          {searchKeyword && (
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              "{searchKeyword}"
            </span>
          )}
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}