const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

interface ContactInfo {
  id: number
  email: string
  phone: string
  address: string
  facebookUrl: string
  twitterUrl: string
  instagramUrl: string
  linkedinUrl: string
}

async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    const res = await fetch(`${API_URL}/api/public/contact`, {
      next: { revalidate: 60 }
    })
    
    if (!res.ok) {
      return null
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching contact info:', error)
    return null
  }
}

export default async function ContactPage() {
  const contact = await getContactInfo()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
      
      {contact ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              {contact.email && (
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📧</div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                      {contact.email}
                    </a>
                  </div>
                </div>
              )}
              
              {contact.phone && (
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📞</div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                      {contact.phone}
                    </a>
                  </div>
                </div>
              )}
              
              {contact.address && (
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📍</div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{contact.address}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Social Media Links */}
            <div className="mt-8">
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {contact.facebookUrl && (
                  <a 
                    href={contact.facebookUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-3xl hover:text-blue-600 transition"
                  >
                    📘
                  </a>
                )}
                {contact.twitterUrl && (
                  <a 
                    href={contact.twitterUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-3xl hover:text-blue-400 transition"
                  >
                    🐦
                  </a>
                )}
                {contact.instagramUrl && (
                  <a 
                    href={contact.instagramUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-3xl hover:text-pink-600 transition"
                  >
                    📷
                  </a>
                )}
                {contact.linkedinUrl && (
                  <a 
                    href={contact.linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-3xl hover:text-blue-700 transition"
                  >
                    💼
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form Placeholder */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  rows={5}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Your message"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Loading contact information...</p>
        </div>
      )}
    </div>
  )
}
