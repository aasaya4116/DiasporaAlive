import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { topics, getTopic } from "@/lib/topics"
import { countryProfiles } from "@/lib/country-profiles"
import { Footer } from "@/components/footer"
import { Markdown } from "@/components/markdown"
import { Bibliography } from "@/components/bibliography"

export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.id }))
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const topic = getTopic(slug)

  if (!topic) {
    notFound()
  }

  const relatedCountries = topic.countries
    .map((id) => countryProfiles.find((c) => c.id === id))
    .filter((c): c is (typeof countryProfiles)[number] => Boolean(c))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-nav sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link
            href="/topics"
            className="inline-flex items-center gap-2 text-gold transition-colors hover:text-gold-strong"
          >
            <ArrowLeft className="h-4 w-4" />
            All Topics
          </Link>
          <nav aria-label="Breadcrumb" className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
            <Link href="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <span className="text-ink-3">/</span>
            <Link href="/topics" className="transition-colors hover:text-gold">
              Topics
            </Link>
            <span className="text-ink-3">/</span>
            <span className="text-foreground">{topic.title}</span>
          </nav>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-6 py-12">
        <div className="mb-8">
          <span className="overline mb-3 block">Research Topic</span>
          <h1 className="mb-4 text-4xl md:text-5xl font-bold tracking-tight text-foreground">{topic.title}</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">{topic.summary}</p>
          {(topic.author || topic.year) && (
            <p className="mt-4 text-sm text-ink-3">
              {topic.author}
              {topic.author && topic.year ? " · " : ""}
              {topic.year}
            </p>
          )}
        </div>

        {/* Article */}
        <article className="mb-12 rounded-lg border border-border bg-card p-8">
          {topic.sections.map((s, i) => (
            <div key={i} className={i > 0 ? "mt-8" : ""}>
              <h2 className="mb-3 text-xl font-bold text-foreground">{s.heading}</h2>
              <Markdown>{s.body}</Markdown>
            </div>
          ))}
        </article>

        {/* Related countries */}
        {relatedCountries.length > 0 && (
          <section className="mb-12">
            <span className="overline mb-3 block">On the Map</span>
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">Related Countries</h2>
            <div className="flex flex-wrap gap-2">
              {relatedCountries.map((c) => (
                <Link
                  key={c.id}
                  href={`/country/${c.id}`}
                  className="rounded-full border border-line px-4 py-2 text-sm text-muted-foreground transition hover:border-gold hover:text-gold"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bibliography */}
        {topic.sources && topic.sources.length > 0 && <Bibliography ids={topic.sources} />}
      </main>
      <Footer />
    </div>
  )
}
