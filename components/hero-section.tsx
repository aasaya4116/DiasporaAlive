"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { FilterChips } from "@/components/filter-chips"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface HeroSectionProps {
  selectedFilters: string[]
  onFiltersChange: (filters: string[]) => void
  highlightedCountry: string | null
  searchQuery: string
  onSearchChange: (query: string) => void
}

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
    <section className="relative min-h-screen flex flex-col">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/images/image.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/30 via-background/10 to-background/80" />

      <div className="relative z-20 w-full px-6 py-6 flex justify-end">
        <div className="relative w-96">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search locations, cultures, traditions..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 h-12 bg-card/80 backdrop-blur-sm border-border/50 rounded-xl"
          />
        </div>
      </div>

      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div
          className={cn(
            "max-w-3xl w-full text-center space-y-8 transition-all duration-1000 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
        >
          <h1 className="text-6xl font-semibold text-foreground tracking-tight leading-tight">
            Welcome to Diaspora Alive
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Trace the global influence of African culture — from music and language to food, faith, and tradition.
          </p>

          <button
            onClick={() => {
              document.getElementById("map-section")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="inline-flex items-center gap-2 px-10 py-4 mt-6 rounded-xl bg-primary text-primary-foreground font-medium text-lg hover:scale-[1.02] transition-all duration-200 hover:glow-emerald-strong shadow-lg"
          >
            Explore the map
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      </div>

      <div id="filters" className="relative z-30 pb-12 px-6">
        <FilterChips selectedFilters={selectedFilters} onFiltersChange={onFiltersChange} />
      </div>
    </section>
  )
}
