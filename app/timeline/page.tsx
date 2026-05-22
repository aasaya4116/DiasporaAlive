"use client"

import { TimelineSection } from "@/components/timeline-section"
import { Sidebar } from "@/components/sidebar"

export default function TimelinePage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar activeSection="timeline" onSectionChange={() => {}} onCountryHover={() => {}} onSearch={() => {}} />

      <div className="flex-1 overflow-y-auto">
        <div className="py-24 px-8">
          <TimelineSection />
        </div>
      </div>
    </div>
  )
}
