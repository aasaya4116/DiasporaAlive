"use client"

import { useReveal } from "@/hooks/use-reveal"
import { Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

const badges = ["Free to use", "Powered by AI", "Cultural database"]

export function ItineraryCTA() {
  const { ref: sectionRef, visible: isVisible } = useReveal<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      className={`relative py-16 px-8 transition-[opacity,transform] duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative p-12 rounded-xl glass-panel overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/[0.06] rounded-full blur-3xl" />

          <div className="relative text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold flex items-center justify-center glow-gold">
              <Sparkles className="w-8 h-8 text-background" />
            </div>

            <span className="overline block mb-3">Trip Planner</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Plan Your Cultural Journey
            </h2>

            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Let our AI guide help you create a personalized itinerary exploring African diaspora culture. Get
              recommendations for sites, events, and experiences based on your interests.
            </p>

            <Link
              href="/plan"
              className="group inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gold text-background font-semibold text-lg transition hover:opacity-90 hover:-translate-y-px"
            >
              <span>Start Planning</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Pill badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-gold/10 border border-gold/25 text-gold"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
