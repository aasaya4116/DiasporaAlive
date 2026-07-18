"use client"

import { useState } from "react"
import { useReveal } from "@/hooks/use-reveal"
import { MapView } from "@/components/map-view"
import { FilterBar } from "@/components/filter-bar"
import { cn } from "@/lib/utils"

interface MapSectionProps {
  searchQuery: string
  highlightedCountry?: string | null
}

export function MapSection({ searchQuery, highlightedCountry }: MapSectionProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const { ref: sectionRef, visible: isVisible } = useReveal<HTMLElement>()

  return (
    <section
      id="map-section"
      ref={sectionRef}
      className={cn(
        "min-h-screen flex flex-col overflow-hidden scroll-mt-16 transition-[opacity,transform] duration-700 ease-out",
        isVisible ? "opacity-100" : "opacity-0",
      )}
    >
      <div
        className={cn(
          "transition-[opacity,transform] duration-700 delay-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10",
        )}
      >
        <FilterBar selectedFilters={selectedFilters} onFiltersChange={setSelectedFilters} />
      </div>

      <div
        className={cn(
          "relative flex flex-1 overflow-hidden transition-[opacity,transform] duration-700 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        )}
      >
        <MapView
          selectedLocation={selectedLocation}
          onLocationSelect={setSelectedLocation}
          filters={selectedFilters}
          searchQuery={searchQuery}
          highlightedCountry={highlightedCountry}
        />
      </div>
    </section>
  )
}
