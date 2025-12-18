import Image from 'next/image'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

interface Product {
  id: number
  name: string
  description: string
  description2: string
  capacity: string
  price: number
  brand: string
  category: string
  warranty: string
  responsiblePerson: string
  imageUrl1: string
  imageUrl2: string
  imageUrl3: string
  imageUrl4: string
  imageUrl5: string
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/api/public/products/${id}`, {
      next: { revalidate: 60 }
    })
    
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <Link href="/products" className="text-blue-600 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const images = [
    product.imageUrl1,
    product.imageUrl2,
    product.imageUrl3,
    product.imageUrl4,
    product.imageUrl5,
  ].filter(Boolean)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/products" className="text-blue-600 hover:underline mb-8 inline-block">
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden mb-4">
            <Image
              src={`${API_URL}${images[0]}`}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.slice(1).map((img, idx) => (
                <div key={idx} className="relative h-24 bg-gray-200 rounded overflow-hidden">
                  <Image
                    src={`${API_URL}${img}`}
                    alt={`${product.name} ${idx + 2}`}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="text-sm text-blue-600 mb-2">{product.brand} • {product.category}</div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-blue-600 mb-6">${product.price}</p>

          <div className="space-y-4 mb-8">
            {product.capacity && (
              <div>
                <h3 className="font-semibold text-gray-700">Capacity</h3>
                <p className="text-gray-600">{product.capacity}</p>
              </div>
            )}
            
            {product.warranty && (
              <div>
                <h3 className="font-semibold text-gray-700">Warranty</h3>
                <p className="text-gray-600">{product.warranty}</p>
              </div>
            )}
            
            {product.responsiblePerson && (
              <div>
                <h3 className="font-semibold text-gray-700">Contact Person</h3>
                <p className="text-gray-600">{product.responsiblePerson}</p>
              </div>
            )}
          </div>

          <div className="border-t pt-6">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap mb-4">{product.description}</p>
            {product.description2 && (
              <p className="text-gray-700 whitespace-pre-wrap">{product.description2}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}