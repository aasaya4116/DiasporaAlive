"use client"

import { Calendar, MapPin, Tag, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const categories = ["All", "Cultural Events", "Festivals", "Exhibitions", "Research", "Community"]

// Placeholder news items - ready for real data
const placeholderNews = [
  {
    id: "1",
    title: "Annual Afro-Brazilian Carnival Returns to Salvador",
    excerpt:
      "The largest street party celebrating African heritage kicks off with traditional Samba performances and cultural parades.",
    category: "Festivals",
    location: "Salvador, Brazil",
    date: "2024-02-10",
    image: "/carnival-dancers-colorful-costumes-brazil.jpg",
    link: "#",
  },
  {
    id: "2",
    title: "New Exhibition: Black British History at the V&A",
    excerpt:
      "Exploring 500 years of African and Caribbean contributions to British culture through art, fashion, and music.",
    category: "Exhibitions",
    location: "London, UK",
    date: "2024-01-15",
    image: "/museum-exhibition-african-art.jpg",
    link: "#",
  },
  {
    id: "3",
    title: "Bomba Workshop Series Launches in San Juan",
    excerpt:
      "Learn traditional Afro-Puerto Rican dance and drumming from master practitioners at the Don Rafael Cepeda School.",
    category: "Cultural Events",
    location: "San Juan, Puerto Rico",
    date: "2024-03-01",
    image: "/bomba-drums-puerto-rico-dance.jpg",
    link: "#",
  },
]

export function NewsFeed() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isVisible, setIsVisible] = useState(false)

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const filteredNews =
    selectedCategory === "All" ? placeholderNews : placeholderNews.filter((item) => item.category === selectedCategory)

  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-1000 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Latest{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
              News & Events
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay connected with cultural celebrations, exhibitions, and community events across the African diaspora
          </p>
        </div>

        {/* Category filters */}
        <div
          className={cn(
            "flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-200 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card backdrop-blur-sm border border-border/50",
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
                "group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 transform",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={news.image || "/placeholder.svg"}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium rounded-full">
                    {news.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{news.excerpt}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
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

                <a
                  href={news.link}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  Read more
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Framework note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary">
            <Tag className="h-4 w-4" />
            Framework Ready: Connect to news API or curate content manually
          </div>
        </div>
      </div>
    </section>
  )
}
