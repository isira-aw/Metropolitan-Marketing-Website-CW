import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Marketing</span>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition">
              Products
            </Link>
            <Link href="/divisions" className="text-gray-700 hover:text-blue-600 transition">
              Divisions
            </Link>
            <Link href="/news" className="text-gray-700 hover:text-blue-600 transition">
              News
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
