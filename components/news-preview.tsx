"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface NewsItem {
  id: string
  title: string
  category: string
  date: string
  location: string
  excerpt: string
  image: string
}

const previewNews: NewsItem[] = [
  {
    id: "1",
    title: "Salvador Carnival Returns with Record Afro-Brazilian Participation",
    category: "Festival",
    date: "Feb 2024",
    location: "Salvador, Brazil",
    excerpt: "The largest street party in the world celebrates African heritage with traditional blocos and samba...",
    image: "/carnival-dancers-colorful-costumes-brazil.jpg",
  },
  {
    id: "2",
    title: 'New Museum Exhibition: "African Roots in Caribbean Cuisine"',
    category: "Exhibition",
    date: "Jan 2024",
    location: "Kingston, Jamaica",
    excerpt: "Exploring how West African culinary traditions shaped modern Caribbean food culture...",
    image: "/museum-exhibition-african-art.jpg",
  },
  {
    id: "3",
    title: "Annual Bomba Workshop Series Announced in San Juan",
    category: "Event",
    date: "Mar 2024",
    location: "San Juan, Puerto Rico",
    excerpt: "Learn traditional Afro-Puerto Rican dance and drumming from master practitioners...",
    image: "/bomba-drums-puerto-rico-dance.jpg",
  },
]

export function NewsPreview() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`relative py-16 px-8 bg-gradient-to-b from-background/50 to-background transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-emerald-400 to-green-500 text-transparent bg-clip-text">
                Latest News & Events
              </span>
            </h2>
            <p className="text-muted-foreground">Stay connected to diaspora culture worldwide</p>
          </div>
          <Link
            href="/news"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-500/20 bg-card/30 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all group"
          >
            <span className="text-emerald-400 font-medium">View all news</span>
            <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {previewNews.map((item, index) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="group rounded-lg border border-emerald-500/20 bg-card/30 backdrop-blur-sm hover:border-emerald-500/40 transition-all hover:scale-105 overflow-hidden"
              style={{
                animation: isVisible ? `fadeIn 0.6s ease-out ${index * 0.1}s both` : "none",
              }}
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-600/90 backdrop-blur-sm text-xs text-white font-medium">
                  {item.category}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
