import Image from 'next/image'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

/* ================= HELPERS ================= */

// Normalize image path to ensure it starts with /
function getImageUrl(path: string | null | undefined): string {
  if (!path) return ''
  // If path already starts with http:// or https://, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${API_URL}${normalizedPath}`
}

/* ================= TYPES ================= */

interface ManagementMember {
  name: string
  designation: string
  profileImage: string
}

interface Milestone {
  year: number
  description: string
  image: string
}

interface AboutUs {
  id: number
  companyName: string
  companyDescription: string
  ownerName: string
  ownerTitle: string
  ownerDescription: string
  ownerImageUrl: string
  managementTeamJson: string
  milestonesJson: string
}

/* ================= FETCH ================= */

async function getAboutUs(): Promise<AboutUs | null> {
  try {
    const res = await fetch(`${API_URL}/api/public/about`, {
      next: { revalidate: 60 }
    })

    if (!res.ok) return null
    return res.json()
  } catch (error) {
    console.error('Error fetching about us:', error)
    return null
  }
}

/* ================= PAGE ================= */

export default async function AboutPage() {
  const about = await getAboutUs()

  const managementTeam: ManagementMember[] = about?.managementTeamJson
    ? JSON.parse(about.managementTeamJson)
    : []

  const milestones: Milestone[] = about?.milestonesJson
    ? JSON.parse(about.milestonesJson)
    : []

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-metro-blue via-blue-700 to-metro-red overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-down">
            About Us
          </h1>
          <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {about ? (
          <>
            {/* ================= COMPANY DESCRIPTION ================= */}
            <section className="mb-16 animate-fade-in-up">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 border-2 border-gray-200 hover:border-metro-blue transition-all duration-300 hover-lift">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-metro-gray">
                  {about.companyName || 'Our Company'}
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-metro-blue to-metro-red mb-6 rounded-full"></div>
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                  {about.companyDescription}
                </p>
              </div>
            </section>

            {/* ================= CHAIRMAN MESSAGE ================= */}
            {about.ownerName && (
              <section className="mb-16 animate-slide-in-left">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden border-2 border-gray-200 hover:border-metro-red transition-all duration-300 hover-lift">
                  <div className="p-8 md:p-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-metro-gray">
                      Chairman's Message
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-metro-blue to-metro-red mx-auto mb-12 rounded-full"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      {about.ownerImageUrl && (
                        <div className="relative h-96 rounded-2xl overflow-hidden group">
                          <Image
                            src={getImageUrl(about.ownerImageUrl)}
                            alt={about.ownerName}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-metro-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      )}

                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-metro-gray">
                          {about.ownerName}
                        </h3>
                        <p className="text-metro-blue font-semibold mb-6 text-lg">
                          {about.ownerTitle}
                        </p>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                          {about.ownerDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* ================= MANAGEMENT TEAM ================= */}
            {managementTeam.length > 0 && (
              <section className="mb-16 animate-scale-in">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-metro-gray mb-4">
                    Management Team
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-metro-blue to-metro-red mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {managementTeam.map((member, index) => (
                    <div
                      key={index}
                      className="group hover-lift bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-metro-blue transition-all duration-300"
                    >
                      {member.profileImage && (
                        <div className="relative w-full h-64 overflow-hidden">
                          <Image
                            src={getImageUrl(member.profileImage)}
                            alt={member.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-metro-blue/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      )}
                      <div className="p-6 text-center">
                        <h3 className="text-xl font-semibold mb-2 text-metro-gray group-hover:text-metro-blue transition-colors duration-300">
                          {member.name}
                        </h3>
                        <p className="text-metro-red font-medium">{member.designation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ================= MILESTONES ================= */}
            {milestones.length > 0 && (
              <section className="animate-fade-in">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-metro-gray mb-4">
                    Our Milestones
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-metro-blue to-metro-red mx-auto rounded-full"></div>
                </div>

                <div className="space-y-8">
                  {milestones.map((m, index) => (
                    <div
                      key={index}
                      className="group hover-lift bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-metro-red transition-all duration-300"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 items-center">
                        {m.image && (
                          <div className="relative h-48 md:h-full rounded-xl overflow-hidden">
                            <Image
                              src={getImageUrl(m.image)}
                              alt={`Milestone ${m.year}`}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          </div>
                        )}

                        <div className="md:col-span-2 p-4">
                          <div className="inline-block px-6 py-2 bg-gradient-to-r from-metro-blue to-metro-red text-white rounded-full font-bold text-xl mb-4">
                            {m.year}
                          </div>
                          <p className="text-gray-700 leading-relaxed text-lg">
                            {m.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📄</div>
            <p className="text-gray-500 text-xl">
              Loading company information...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
