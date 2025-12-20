import Image from 'next/image'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">About Us</h1>

      {about ? (
        <>
          {/* ================= COMPANY / CHAIRMAN ================= */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">
              {about.companyName || 'Our Company'}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
              {about.companyDescription}
            </p>
          </section>

          {/* ================= OWNER ================= */}
          {about.ownerName && (
            <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Chairman Message
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {about.ownerImageUrl && (
                  <div className="relative h-96 rounded-lg overflow-hidden">
                    <Image
                      src={`${API_URL}${about.ownerImageUrl}`}
                      alt={about.ownerName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {about.ownerName}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-4">
                    {about.ownerTitle}
                  </p>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {about.ownerDescription}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* ================= MANAGEMENT TEAM ================= */}
          {managementTeam.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">
                Management Team
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {managementTeam.map((member, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg p-6 text-center"
                  >
                    {member.profileImage && (
                      <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                        <Image
                          src={`${API_URL}${member.profileImage}`}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-blue-600">{member.designation}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ================= MILESTONES ================= */}
          {milestones.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-center mb-8">
                Our Milestones
              </h2>

              <div className="space-y-8">
                {milestones.map((m, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
                  >
                    {m.image && (
                      <div className="relative h-48 rounded overflow-hidden">
                        <Image
                          src={`${API_URL}${m.image}`}
                          alt={`Milestone ${m.year}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <h3 className="text-2xl font-bold mb-2">{m.year}</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Loading company information...
          </p>
        </div>
      )}
    </div>
  )
}
