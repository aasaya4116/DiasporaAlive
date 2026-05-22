"use client"

import { NewsFeed } from "@/components/news-feed"
import { Sidebar } from "@/components/sidebar"

export default function NewsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar activeSection="news" onSectionChange={() => {}} onCountryHover={() => {}} onSearch={() => {}} />

      <div className="flex-1 overflow-y-auto">
        <div className="py-24 px-8">
          <NewsFeed />
        </div>
      </div>
    </div>
  )
}
