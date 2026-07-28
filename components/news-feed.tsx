"use client"

import { Calendar, MapPin } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { newsCategories, newsItems } from "@/lib/content"

export function NewsFeed() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const filteredNews =
    selectedCategory === "All" ? newsItems : newsItems.filter((item) => item.category === selectedCategory)

  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div
          className={cn(
            "text-center mb-16 transition-[opacity,transform] duration-700 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="overline block mb-3">News</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">News &amp; Events</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay connected with cultural celebrations, exhibitions, and community events across the African diaspora
          </p>
        </div>

        {/* Category filters */}
        <div
          className={cn(
            "flex flex-wrap justify-center gap-3 mb-12 transition-[opacity,transform] duration-700 delay-200 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {newsCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200",
                selectedCategory === category
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-card text-muted-foreground border border-border hover:border-gold hover:text-foreground",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news, index) => (
            <article
              key={news.id}
              className={cn(
                "group bg-card border border-border rounded-lg overflow-hidden transition hover:border-gold hover:-translate-y-0.5",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={news.image || "/placeholder.svg"}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-background/70 backdrop-blur-md border border-line text-xs font-semibold uppercase tracking-wider text-gold">
                    {news.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-gold transition-colors duration-200 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{news.excerpt}</p>

                <div className="flex items-center gap-4 text-xs text-ink-3 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(news.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {news.location}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
