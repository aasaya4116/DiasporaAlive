"use client"

import { useState } from "react"
import { useReveal } from "@/hooks/use-reveal"
import { MapView } from "@/components/map-view"
import { DiasporaJourney, CURATED_STOPS, type JourneyStop } from "@/components/diaspora-journey"
import { TraceBox } from "@/components/trace-box"
import { cn } from "@/lib/utils"

interface MapSectionProps {
  searchQuery: string
  highlightedCountry?: string | null
}

interface ActiveJourney {
  stops: JourneyStop[]
  intro: string | null
}

export function MapSection({ searchQuery, highlightedCountry }: MapSectionProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [journey, setJourney] = useState<ActiveJourney | null>(null)
  const { ref: sectionRef, visible: isVisible } = useReveal<HTMLElement>()

  // Remount the journey per distinct itinerary so it always starts fresh at stop 0.
  const journeyKey = journey?.stops.map((s) => s.id).join("-") ?? ""

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
          "relative flex flex-1 overflow-hidden transition-[opacity,transform] duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        )}
      >
        <MapView
          selectedLocation={selectedLocation}
          onLocationSelect={setSelectedLocation}
          searchQuery={searchQuery}
          highlightedCountry={highlightedCountry}
        />

        {journey ? (
          <DiasporaJourney
            key={journeyKey}
            stops={journey.stops}
            intro={journey.intro}
            activeCountryId={selectedLocation}
            onStopChange={setSelectedLocation}
            onClose={() => setJourney(null)}
          />
        ) : (
          <TraceBox
            onTrace={(r) => setJourney({ stops: r.stops, intro: r.intro })}
            onStartCurated={() => setJourney({ stops: CURATED_STOPS, intro: null })}
          />
        )}
      </div>
    </section>
  )
}
