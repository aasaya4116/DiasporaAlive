"use client"

import { ResourcesSection } from "@/components/resources-section"
import { Sidebar } from "@/components/sidebar"

export default function ResourcesPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar activeSection="resources" onSectionChange={() => {}} onCountryHover={() => {}} onSearch={() => {}} />

      <div className="flex-1 overflow-y-auto">
        <div className="py-24 px-8">
          <ResourcesSection />
        </div>
      </div>
    </div>
  )
}
