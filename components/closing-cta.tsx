"use client"

import { ArrowRight } from "lucide-react"

export function ClosingCTA() {
  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed photographic backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/images/diaspora-hero-wide.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/60" />

      <div className="relative z-10 mx-auto max-w-3xl px-8 py-28 text-center">
        <span className="overline mb-3 block">Begin</span>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          Trace the diaspora across the globe
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
          Nineteen countries. Centuries of migration. One interactive map.
        </p>
        <a
          href="#map-section"
          className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-lg font-semibold text-background transition hover:opacity-90 hover:-translate-y-px"
        >
          Explore the Map
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  )
}
