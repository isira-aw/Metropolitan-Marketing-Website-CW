'use client'

interface ShareButtonsProps {
  topic: string
  url: string
}

export default function ShareButtons({ topic, url }: ShareButtonsProps) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url)
    alert('Link copied to clipboard!')
  }

  return (
    <div className="mt-12 pt-8 border-t">
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-gray-600 font-medium">Share this article:</span>
        <button
          onClick={handleCopyLink}
          className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Copy Link
        </button>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(topic)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
          Twitter
        </a>
      </div>
    </div>
  )
}