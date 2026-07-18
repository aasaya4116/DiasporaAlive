"use client"

import { ItineraryAgent } from "@/components/itinerary-agent"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"

export default function PlanPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeSection="plan" onSectionChange={() => {}} />
      <main className="pt-16">
        <ItineraryAgent />
      </main>
      <Footer />
    </div>
  )
}
