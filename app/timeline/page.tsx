"use client"

import { TimelineSection } from "@/components/timeline-section"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeSection="timeline" onSectionChange={() => {}} />
      <main className="pt-16">
        <TimelineSection />
      </main>
      <Footer />
    </div>
  )
}
