"use client"

import { ResourcesSection } from "@/components/resources-section"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeSection="resources" onSectionChange={() => {}} />
      <main className="pt-16">
        <ResourcesSection />
      </main>
      <Footer />
    </div>
  )
}
