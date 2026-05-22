"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

interface TimelineEvent {
  year: string
  title: string
  description: string
  region: string
}

const previewEvents: TimelineEvent[] = [
  {
    year: "1619",
    title: "First Enslaved Africans in North America",
    description: "First documented arrival of enslaved Africans in English North America at Jamestown",
    region: "Angola → Virginia",
  },
  {
    year: "1791",
    title: "Haitian Revolution Begins",
    description: "Enslaved Africans in Saint-Domingue rise up, leading to first independent Black republic",
    region: "Haiti",
  },
  {
    year: "1960s",
    title: "African Independence Movements",
    description: "Wave of independence across African nations, strengthening diaspora connections",
    region: "Africa",
  },
]

export function TimelinePreview() {
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
      className={`relative py-16 px-8 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-emerald-400 to-green-500 text-transparent bg-clip-text">
                Historical Timeline
              </span>
            </h2>
            <p className="text-muted-foreground">Key moments in diaspora history</p>
          </div>
          <Link
            href="/timeline"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-500/20 bg-card/30 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all group"
          >
            <span className="text-emerald-400 font-medium">View full timeline</span>
            <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {previewEvents.map((event, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-emerald-500/20 bg-card/30 backdrop-blur-sm hover:border-emerald-500/40 transition-all hover:scale-105"
              style={{
                animation: isVisible ? `fadeIn 0.6s ease-out ${index * 0.1}s both` : "none",
              }}
            >
              <div className="flex items-center gap-2 mb-3 text-emerald-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-semibold">{event.year}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{event.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
              <div className="flex items-center gap-2 text-xs text-emerald-500/70">
                <MapPin className="w-3 h-3" />
                <span>{event.region}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
