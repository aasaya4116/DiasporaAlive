"use client"

import { NewsFeed } from "@/components/news-feed"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeSection="news" onSectionChange={() => {}} />
      <main className="pt-16">
        <NewsFeed />
      </main>
      <Footer />
    </div>
  )
}
