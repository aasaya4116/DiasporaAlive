"use client"

import { useReveal } from "@/hooks/use-reveal"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { newsItems } from "@/lib/content"

const previewNews = newsItems.slice(0, 3)

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

export function NewsPreview() {
  const { ref: sectionRef, visible: isVisible } = useReveal<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      className={`relative py-16 px-8 transition-[opacity,transform] duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <span className="overline block mb-3">News</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
              Latest News &amp; Events
            </h2>
            <p className="text-muted-foreground">Stay connected to diaspora culture worldwide</p>
          </div>
          <Link
            href="/news"
            className="group flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-gold hover:text-gold"
          >
            View all news
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {previewNews.map((item, index) => (
            <Link
              key={item.id}
              href="/news"
              className="group rounded-lg border border-border bg-card overflow-hidden transition hover:border-gold hover:-translate-y-0.5"
              style={{
                animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.15}s both` : "none",
              }}
            >
              {/* Image area */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-background/70 backdrop-blur-md border border-line text-xs font-semibold uppercase tracking-wider text-gold">
                  {item.category}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-4 text-xs text-ink-3 mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(item.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
