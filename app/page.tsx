"use client"

import { Suspense, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { HeroSection } from "@/components/hero-section"
import { MapSection } from "@/components/map-section"
import { PopulationTable } from "@/components/population-table"
import { WhySection } from "@/components/why-section"
import { TimelinePreview } from "@/components/timeline-preview"
import { StoriesPreview } from "@/components/stories-preview"
import { NewsPreview } from "@/components/news-preview"
import { ResourcesPreview } from "@/components/resources-preview"
import { ItineraryCTA } from "@/components/itinerary-cta"
import { Footer } from "@/components/footer"

function PageContent() {
  const [activeSection, setActiveSection] = useState("map")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onCountryHover={setSelectedCountry}
        onSearch={setSearchQuery}
      />

      <div className="flex-1 overflow-y-auto">
        <HeroSection
          selectedFilters={selectedFilters}
          onFiltersChange={setSelectedFilters}
          highlightedCountry={selectedCountry}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <MapSection searchQuery={searchQuery} />
        <PopulationTable />
        <NewsPreview />
        <ItineraryCTA />
        <TimelinePreview />
        <StoriesPreview />
        <ResourcesPreview />
        <WhySection />
        <Footer />
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <PageContent />
    </Suspense>
  )
}
