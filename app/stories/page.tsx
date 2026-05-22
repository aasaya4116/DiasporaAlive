"use client"

import { StoriesSection } from "@/components/stories-section"
import { Sidebar } from "@/components/sidebar"

export default function StoriesPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar activeSection="stories" onSectionChange={() => {}} onCountryHover={() => {}} onSearch={() => {}} />

      <div className="flex-1 overflow-y-auto">
        <div className="py-24 px-8">
          <StoriesSection />
        </div>
      </div>
    </div>
  )
}
