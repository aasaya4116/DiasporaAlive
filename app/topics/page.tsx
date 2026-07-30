import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { topics } from "@/lib/topics"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Research Topics — Diaspora Alive",
  description: "Cross-cutting histories and movements across the African diaspora, with sources.",
}

export default function TopicsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeSection="topics" />
      <main className="pt-16">
        <section className="relative px-8 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <span className="overline mb-3 block">Research</span>
              <h1 className="mb-2 text-3xl md:text-4xl font-bold tracking-tight text-foreground">Topics</h1>
              <p className="text-muted-foreground">Cross-cutting histories and movements across the diaspora</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {topics.map((t) => (
                <Link
                  key={t.id}
                  href={`/topics/${t.id}`}
                  className="group rounded-lg border border-border bg-card p-6 transition hover:border-gold hover:-translate-y-0.5"
                >
                  <h2 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-gold">
                    {t.title}
                  </h2>
                  <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">{t.summary}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-gold">
                    Read
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
