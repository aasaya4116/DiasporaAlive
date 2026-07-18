"use client"

import { useReveal } from "@/hooks/use-reveal"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
import { timelineEvents } from "@/lib/content"

const previewEvents = timelineEvents.slice(0, 3)

export function TimelinePreview() {
  const { ref: sectionRef, visible: isVisible } = useReveal<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      className={`relative py-16 px-8 transition-[opacity,transform] duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <span className="overline block mb-3">Timeline</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">Historical Timeline</h2>
            <p className="text-muted-foreground">Key moments in diaspora history</p>
          </div>
          <Link
            href="/timeline"
            className="group flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-gold hover:text-gold"
          >
            View full timeline
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {previewEvents.map((event, index) => (
            <div
              key={event.year}
              className="p-6 rounded-lg border border-border bg-card transition hover:border-gold hover:-translate-y-0.5"
              style={{
                animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : "none",
              }}
            >
              <div className="flex items-center gap-2 mb-3 text-gold">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-semibold">{event.year}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{event.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
              <div className="flex items-center gap-2 text-xs text-ink-3">
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
