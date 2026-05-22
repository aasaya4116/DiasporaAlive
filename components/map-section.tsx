"use client"

import { useEffect, useRef, useState } from "react"
import { MapView } from "@/components/map-view"
import { LocationPanel } from "@/components/location-panel"
import { FilterBar } from "@/components/filter-bar"
import { locations } from "@/lib/location-data"
import { cn } from "@/lib/utils"

interface MapSectionProps {
  searchQuery: string
}

export function MapSection({ searchQuery }: MapSectionProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const location = selectedLocation ? locations.find((l) => l.id === selectedLocation) : null

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

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="map-section"
      ref={sectionRef}
      className={cn(
        "min-h-screen flex flex-col overflow-hidden transition-all duration-1000 ease-out",
        isVisible ? "opacity-100" : "opacity-0",
      )}
    >
      <div
        className={cn(
          "transition-all duration-1000 delay-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10",
        )}
      >
        <FilterBar selectedFilters={selectedFilters} onFiltersChange={setSelectedFilters} />
      </div>

      <div
        className={cn(
          "relative flex flex-1 overflow-hidden transition-all duration-1000 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        )}
      >
        <MapView
          selectedLocation={selectedLocation}
          onLocationSelect={setSelectedLocation}
          filters={selectedFilters}
          searchQuery={searchQuery}
        />

        {location && <LocationPanel location={location} onClose={() => setSelectedLocation(null)} />}
      </div>
    </section>
  )
}
