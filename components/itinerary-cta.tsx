"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export function ItineraryCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`relative py-16 px-8 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative p-12 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-card/50 to-emerald-950/20 backdrop-blur-sm overflow-hidden">
          {/* Background glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

          <div className="relative text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
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
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-all hover:scale-105 group"
            >
              <span>Start Planning</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <p className="text-sm text-muted-foreground mt-6">
              Free to use • Powered by AI • Based on our cultural database
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
