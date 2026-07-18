"use client"

import { useReveal } from "@/hooks/use-reveal"
import { Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

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
        {/* Outer card with animated rotating gradient border */}
        <div className="gradient-border relative p-12 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-card/50 to-emerald-950/20 backdrop-blur-sm overflow-hidden">
          {/* Background glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

          {/* Second decorative glow — offset top-right */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-400/5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />

          <div className="relative text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-green-500 text-transparent bg-clip-text">
                Plan Your Cultural Journey
              </span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Let our AI guide help you create a personalized itinerary exploring African diaspora culture. Get
              recommendations for sites, events, and experiences based on your interests.
            </p>

            <Link
              href="/plan"
              className="inline-flex items-center gap-2 px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-lg transition-all hover:scale-105 group animate-pulse-glow"
            >
              <span>Start Planning</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Pill badges */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                Free to use
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                Powered by AI
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                Cultural database
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
