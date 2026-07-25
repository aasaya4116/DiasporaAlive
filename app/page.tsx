"use client"

import { Suspense, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { HeroSection } from "@/components/hero-section"
import { MapSection } from "@/components/map-section"
import { PopulationTable } from "@/components/population-table"
import { ExploreGrid } from "@/components/explore-grid"
import { PageLoader } from "@/components/page-loader"

function PageContent() {
  const [activeSection, setActiveSection] = useState("map")
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onCountryHover={setSelectedCountry}
        onSearch={setSearchQuery}
      />

      <main>
        <HeroSection />
        <MapSection searchQuery={searchQuery} highlightedCountry={selectedCountry} />
        <PopulationTable />
        <ExploreGrid />
      </main>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<PageLoader />}>
      <PageContent />
    </Suspense>
  )
}
