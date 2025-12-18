'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

interface Product {
  id: number
  name: string
  description: string
  capacity: string
  price: number
  brand: string
  category: string
  imageUrl1: string
}

interface PageData {
  content: Product[]
  totalPages: number
  totalElements: number
  number: number
  size: number
}

interface Brand {
  id: number
  name: string
}

interface Category {
  id: number
  name: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMetadata()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [page, search, category, brand])

  const fetchMetadata = async () => {
    try {
      const [brandsRes, categoriesRes] = await Promise.all([
        fetch(`${API_URL}/api/public/brands`),
        fetch(`${API_URL}/api/public/categories`)
      ])
      
      const brandsData = await brandsRes.json()
      const categoriesData = await categoriesRes.json()
      
      setBrands(brandsData)
      setCategories(categoriesData)
    } catch (error) {
      console.error('Error fetching metadata:', error)
    }
  }

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: '12'
      })
      
      if (search) params.append('search', search)
      if (category) params.append('category', category)
      if (brand) params.append('brand', brand)
      
      const response = await fetch(`${API_URL}/api/public/products?${params}`)
      const data: PageData = await response.json()
      
      setProducts(data.content)
      setTotalPages(data.totalPages)
      setTotalElements(data.totalElements)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(0)
    fetchProducts()
  }

  const handleClearFilters = () => {
    setSearch('')
    setCategory('')
    setBrand('')
    setPage(0)
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    let startPage = Math.max(0, page - 2)
    let endPage = Math.min(totalPages - 1, startPage + maxVisible - 1)

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(0, endPage - maxVisible + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-4 py-2 rounded ${
            i === page
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {i + 1}
        </button>
      )
    }

    return pages
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">All Brands</option>
              {brands.map((b) => (
                <option key={b.id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
            
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
            
            <button
              type="button"
              onClick={handleClearFilters}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Clear
            </button>
          </div>
        </form>

        {/* Results Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {products.length} of {totalElements} products
          {(search || category || brand) && (
            <span className="ml-2">
              (filtered{search && ` by "${search}"`}{category && ` in ${category}`}{brand && ` from ${brand}`})
            </span>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg mb-4">No products found.</p>
          <button
            onClick={handleClearFilters}
            className="text-blue-600 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer h-full flex flex-col">
                  <div className="relative h-48 bg-gray-200">
                    <Image
                      src={`${API_URL}${product.imageUrl1}`}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="text-sm text-blue-600 mb-1">{product.brand}</div>
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2 flex-1">{product.name}</h3>
                    {product.capacity && (
                      <p className="text-sm text-gray-600 mb-2">{product.capacity}</p>
                    )}
                    <p className="text-2xl font-bold text-blue-600">${product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 space-y-4">
              <div className="flex justify-center items-center space-x-2">
                {/* First Page */}
                <button
                  onClick={() => setPage(0)}
                  disabled={page === 0}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ««
                </button>
                
                {/* Previous */}
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {/* Page Numbers */}
                {renderPageNumbers()}
                
                {/* Next */}
                <button
                  onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                  disabled={page >= totalPages - 1}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
                
                {/* Last Page */}
                <button
                  onClick={() => setPage(totalPages - 1)}
                  disabled={page >= totalPages - 1}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  »»
                </button>
              </div>
              
              {/* Page Info */}
              <div className="text-center text-sm text-gray-600">
                Page <span className="font-semibold">{page + 1}</span> of{' '}
                <span className="font-semibold">{totalPages}</span>
                {' '}({totalElements} total products)
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}