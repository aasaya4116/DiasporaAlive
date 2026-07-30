import { countryProfiles } from "@/lib/country-profiles"
import { Globe, Users, TrendingUp, MapPin, ArrowLeft, ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { topicsForCountry } from "@/lib/topics"
import { Markdown } from "@/components/markdown"
import { Bibliography } from "@/components/bibliography"

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

  const isInDepth = Boolean(country.statistics?.length || country.culturalAspects?.length)

  const related = countryProfiles.filter((c) => c.region === country.region && c.id !== country.id).slice(0, 4)
  const relatedTopics = topicsForCountry(country.id)

  const alphabetical = [...countryProfiles].sort((a, b) => a.name.localeCompare(b.name))
  const position = alphabetical.findIndex((c) => c.id === country.id)
  const prevCountry = alphabetical[(position - 1 + alphabetical.length) % alphabetical.length]
  const nextCountry = alphabetical[(position + 1) % alphabetical.length]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-nav sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link
            href="/#map-section"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-strong transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Map
          </Link>
          <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <span className="text-ink-3">/</span>
            <span>{country.region}</span>
            <span className="text-ink-3">/</span>
            <span className="text-foreground">{country.name}</span>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Country Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center glow-gold">
              <Globe className="w-8 h-8 text-background" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">{country.name}</h1>
                {isInDepth ? (
                  <span className="rounded-full bg-emerald/10 border border-emerald/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald">
                    In-Depth Profile
                  </span>
                ) : (
                  <span className="rounded-full bg-secondary border border-line px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Overview
                  </span>
                )}
              </div>
              <p className="text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                African Diaspora Community
              </p>
            </div>
          </div>

          {country.imageUrl && (
            <div className="mt-8 overflow-hidden rounded-xl border border-border">
              <img src={country.imageUrl} alt={country.name} className="h-64 w-full object-cover" />
            </div>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-gold" />
                <h3 className="overline">Population</h3>
              </div>
              <p className="text-3xl font-bold font-mono tracking-tight text-foreground">
                {country.population.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-gold" />
                <h3 className="overline">Percentage</h3>
              </div>
              <p className="text-3xl font-bold font-mono tracking-tight text-foreground">{country.percentage}%</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-5 h-5 text-gold" />
                <h3 className="overline">African Origins</h3>
              </div>
              <p className="text-lg font-semibold text-foreground">{country.africanOrigins?.length || 0} regions</p>
            </div>
          </div>
        </div>

        {/* History Section */}
        <section className="mb-12">
          <span className="overline block mb-3">History</span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6">Historical Context</h2>
          <div className="rounded-lg border border-border bg-card p-8">
            {country.sections && country.sections.length > 0 ? (
              country.sections.map((s, i) => (
                <div key={i} className={i > 0 ? "mt-6" : ""}>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{s.heading}</h3>
                  <Markdown>{s.body}</Markdown>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground leading-relaxed text-lg">{country.history}</p>
            )}
          </div>
        </section>

        {/* Did You Know — rich stats for flagship countries */}
        {country.statistics && country.statistics.length > 0 && (
          <section className="mb-12">
            <span className="overline block mb-3">Key Facts</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6">Did You Know?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {country.statistics.map((stat, index) => (
                <div key={index} className="rounded-lg border border-gold/25 bg-gold/5 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    {stat.icon === "users" && <Users className="w-5 h-5 text-gold" />}
                    {stat.icon === "map" && <MapPin className="w-5 h-5 text-gold" />}
                    {stat.icon === "calendar" && <Calendar className="w-5 h-5 text-gold" />}
                    <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
                  </div>
                  <p className="text-xl font-semibold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* African Origins */}
        {country.africanOrigins && country.africanOrigins.length > 0 && (
          <section className="mb-12">
            <span className="overline block mb-3">Origins</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6">African Origins</h2>
            <div className="rounded-lg border border-border bg-card p-8">
              <div className="flex flex-wrap gap-3">
                {country.africanOrigins.map((origin, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full bg-gold/10 text-gold font-medium text-sm border border-gold/25"
                  >
                    {origin}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Cultural Traditions — thematic aspects for flagship countries */}
        {country.culturalAspects && country.culturalAspects.length > 0 && (
          <section className="mb-12">
            <span className="overline block mb-3">Traditions</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6">Cultural Traditions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {country.culturalAspects.map((aspect, index) => (
                <div key={index} className="rounded-lg border border-border bg-card p-6 transition hover:border-gold">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-foreground">{aspect.title}</h3>
                    <span className="shrink-0 rounded-full border border-gold/25 bg-gold/10 px-2.5 py-0.5 text-xs capitalize text-gold">
                      {aspect.category}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{aspect.description}</p>
                  {aspect.examples && aspect.examples.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {aspect.examples.map((example, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted-foreground"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Cultural Highlights */}
        <section className="mb-12">
          <span className="overline block mb-3">Culture</span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6">Cultural Highlights</h2>
          <div className="grid grid-cols-1 gap-6">
            {country.culturalHighlights.map((highlight, index) => (
              <div
                key={index}
                className="rounded-lg border border-border bg-card p-8 transition hover:border-gold"
              >
                <h3 className="text-2xl font-semibold text-gold mb-4">{highlight.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{highlight.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Topics */}
        {relatedTopics.length > 0 && (
          <section className="mb-12">
            <span className="overline block mb-3">Explore Further</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6">Related Topics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedTopics.map((t) => (
                <Link
                  key={t.id}
                  href={`/topics/${t.id}`}
                  className="group rounded-lg border border-border bg-card p-6 transition hover:border-gold hover:-translate-y-0.5"
                >
                  <p className="font-semibold text-foreground group-hover:text-gold transition-colors mb-1">{t.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{t.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bibliography */}
        {country.sources && country.sources.length > 0 && <Bibliography ids={country.sources} />}

        {/* More in this region */}
        {related.length > 0 && (
          <section className="mb-12">
            <span className="overline block mb-3">{country.region}</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6">More in this region</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((c) => (
                <Link
                  key={c.id}
                  href={`/country/${c.id}`}
                  className="group rounded-lg border border-border bg-card p-5 transition hover:border-gold hover:-translate-y-0.5"
                >
                  <p className="font-semibold text-foreground group-hover:text-gold transition-colors mb-1">
                    {c.name}
                  </p>
                  <p className="text-xs text-muted-foreground tabular-nums">
                    {(c.population / 1000000).toFixed(1)}M · {c.percentage.toFixed(1)}%
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Prev / next country */}
        <nav className="flex items-center justify-between gap-4 border-t border-line-subtle pt-8">
          <Link
            href={`/country/${prevCountry.id}`}
            className="group flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-gold hover:text-gold"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {prevCountry.name}
          </Link>
          <Link
            href={`/country/${nextCountry.id}`}
            className="group flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-gold hover:text-gold"
          >
            {nextCountry.name}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </nav>
      </main>
    </div>
  )
}
