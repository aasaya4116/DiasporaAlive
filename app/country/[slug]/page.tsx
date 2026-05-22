import { countryProfiles } from "@/lib/country-profiles"
import { Globe, Users, TrendingUp, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return countryProfiles.map((country) => ({
    slug: country.id,
  }))
}

export default async function CountryProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const country = countryProfiles.find((c) => c.id === slug)

  if (!country) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-primary/20 bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Map
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Country Header */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-cyan">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-foreground mb-2">{country.name}</h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                African Diaspora Community
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="glow-border rounded-xl border border-primary/30 bg-card/50 backdrop-blur-sm p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-medium text-muted-foreground">Population</h3>
              </div>
              <p className="text-3xl font-bold text-foreground">{country.population.toLocaleString()}</p>
            </div>
            <div className="glow-border rounded-xl border border-primary/30 bg-card/50 backdrop-blur-sm p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-medium text-muted-foreground">Percentage</h3>
              </div>
              <p className="text-3xl font-bold text-foreground">{country.percentage}%</p>
            </div>
            <div className="glow-border rounded-xl border border-primary/30 bg-card/50 backdrop-blur-sm p-6">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-medium text-muted-foreground">African Origins</h3>
              </div>
              <p className="text-lg font-semibold text-foreground">{country.africanOrigins?.length || 0} regions</p>
            </div>
          </div>
        </div>

        {/* History Section */}
        <section className="mb-12 animate-fade-in-delay-1">
          <h2 className="text-3xl font-bold text-foreground mb-6">Historical Context</h2>
          <div className="glow-border rounded-xl border border-primary/30 bg-card/50 backdrop-blur-sm p-8">
            <p className="text-muted-foreground leading-relaxed text-lg">{country.history}</p>
          </div>
        </section>

        {/* African Origins */}
        {country.africanOrigins && country.africanOrigins.length > 0 && (
          <section className="mb-12 animate-fade-in-delay-2">
            <h2 className="text-3xl font-bold text-foreground mb-6">African Origins</h2>
            <div className="glow-border rounded-xl border border-primary/30 bg-card/50 backdrop-blur-sm p-8">
              <div className="flex flex-wrap gap-3">
                {country.africanOrigins.map((origin, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full bg-primary/20 text-primary font-medium text-sm border border-primary/30"
                  >
                    {origin}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Cultural Highlights */}
        <section className="animate-fade-in-delay-3">
          <h2 className="text-3xl font-bold text-foreground mb-6">Cultural Highlights</h2>
          <div className="grid grid-cols-1 gap-6">
            {country.culturalHighlights.map((highlight, index) => (
              <div
                key={index}
                className="glow-border rounded-xl border border-primary/30 bg-card/50 backdrop-blur-sm p-8 hover:bg-card/70 transition-colors"
              >
                <h3 className="text-2xl font-semibold text-primary mb-4">{highlight.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{highlight.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
