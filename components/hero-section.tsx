"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, Globe, Users, MapPin } from "lucide-react"
import { AuroraBackground } from "@/components/aurora-background"

interface HeroSectionProps {
  selectedFilters: string[]
  onFiltersChange: (filters: string[]) => void
  highlightedCountry: string | null
  searchQuery: string
  onSearchChange: (query: string) => void
}

const floatingStats = [
  { icon: Globe, value: "19", label: "Countries", delay: "0.8s" },
  { icon: Users, value: "136M+", label: "People", delay: "1s" },
  { icon: MapPin, value: "500+", label: "Cultural Sites", delay: "1.2s" },
]

export function HeroSection({
  selectedFilters,
  onFiltersChange,
  highlightedCountry,
  searchQuery,
  onSearchChange,
}: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/images/image.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Animated canvas stardust and aurora mesh overlay */}
      <AuroraBackground />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-background/60 via-background/30 to-background/90" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 z-[3] animate-grid-pulse pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.55 0.15 150 / 0.1) 1px, transparent 1px), linear-gradient(90deg, oklch(0.55 0.15 150 / 0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center">
        {/* Tagline badge */}
        <div
          className={cn(
            "inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: "0.2s" }}
        >
          <Globe className="h-4 w-4 text-emerald-400" />
          <span className="text-sm font-medium text-emerald-300 tracking-wide">
            Interactive Cultural Heritage Map
          </span>
        </div>

        {/* Main heading — massive bold typography */}
        <h1
          className={cn(
            "transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: "0.4s" }}
        >
          <span className="block text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground/90 tracking-tight leading-tight mb-2">
            Trace the African
          </span>
          <span
            className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none animate-shimmer"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #10b981 0%, #34d399 25%, #fbbf24 50%, #34d399 75%, #10b981 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Diaspora
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={cn(
            "mt-6 text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{ transitionDelay: "0.6s" }}
        >
          From music and language to food, faith, and tradition — explore the
          global influence of African culture across the Americas and Caribbean.
        </p>

        {/* CTA button */}
        <div
          className={cn(
            "mt-10 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{ transitionDelay: "0.7s" }}
        >
          <button
            onClick={() => {
              document
                .getElementById("map-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }}
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_oklch(0.6_0.18_145/0.4)] shadow-lg shadow-emerald-900/30"
          >
            Explore the Map
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Floating stat cards */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {floatingStats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className={cn(
                  "glass-panel rounded-2xl px-6 py-4 flex items-center gap-4 transition-all duration-1000",
                  i === 1 ? "animate-float-delayed" : "animate-float",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{
                  transitionDelay: stat.delay,
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-foreground tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-all duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{ transitionDelay: "1.5s" }}
      >
        <span className="text-xs text-muted-foreground/60 uppercase tracking-[0.2em] font-medium">
          Explore
        </span>
        <ChevronDown className="w-5 h-5 text-emerald-400/60 animate-scroll-pulse" />
      </div>
    </section>
  )
}
