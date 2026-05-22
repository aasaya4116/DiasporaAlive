"use client"

import { ItineraryAgent } from "@/components/itinerary-agent"
import { Sidebar } from "@/components/sidebar"

export default function PlanPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar activeSection="plan" onSectionChange={() => {}} onCountryHover={() => {}} onSearch={() => {}} />

      <div className="flex-1 overflow-y-auto">
        <div className="h-full">
          <ItineraryAgent />
        </div>
      </div>
    </div>
  )
}
