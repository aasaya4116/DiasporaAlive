"use client"

import { StoriesSection } from "@/components/stories-section"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeSection="stories" onSectionChange={() => {}} />
      <main className="pt-16">
        <StoriesSection />
      </main>
      <Footer />
    </div>
  )
}
