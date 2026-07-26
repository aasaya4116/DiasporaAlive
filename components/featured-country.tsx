"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { countryProfiles } from "@/lib/country-profiles"

const featured = countryProfiles.find((c) => c.id === "brazil")

export function FeaturedCountry() {
  const { ref: sectionRef, visible: isVisible } = useReveal<HTMLElement>()

  if (!featured) return null

  return (
    <section
      ref={sectionRef}
      className={`relative py-20 px-8 transition-[opacity,transform] duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-2xl border border-border">
          {featured.imageUrl && (
            <img
              src={featured.imageUrl}
              alt={featured.name}
              className="aspect-[4/3] h-full w-full object-cover"
            />
          )}
        </div>

        {/* Copy */}
        <div>
          <span className="overline mb-3 block">Featured Country</span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">{featured.name}</h2>
          <p className="mb-6 leading-relaxed text-muted-foreground">{featured.overview ?? featured.history}</p>

          <ul className="mb-8 space-y-2.5">
            {featured.culturalHighlights.slice(0, 3).map((h) => (
              <li key={h.title} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span className="text-sm font-medium text-foreground">{h.title}</span>
              </li>
            ))}
          </ul>

          <Link
            href={`/country/${featured.id}`}
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-background transition hover:opacity-90 hover:-translate-y-px"
          >
            Explore {featured.name}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
