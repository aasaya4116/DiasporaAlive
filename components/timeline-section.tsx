"use client"

import { useReveal } from "@/hooks/use-reveal"
import { Calendar, MapPin } from "lucide-react"
import { timelineEvents } from "@/lib/content"

export function TimelineSection() {
  const { ref: sectionRef, visible: isVisible } = useReveal<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 px-8 transition-[opacity,transform] duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="overline block mb-3">Timeline</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">Historical Timeline</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trace the journey of the African diaspora through pivotal moments in history
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-gold/50 via-gold/20 to-transparent" />

          {/* Timeline events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div
                key={event.year}
                className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} gap-8`}
                style={{
                  animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : "none",
                }}
              >
                {/* Content card */}
                <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                  <div className="inline-block p-6 rounded-lg border border-border bg-card text-left transition hover:border-gold hover:-translate-y-0.5">
                    <div className="flex items-center gap-2 mb-2 text-gold">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-semibold">{event.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
                    <p className="text-muted-foreground mb-3">{event.description}</p>
                    <div className="flex items-center gap-2 text-sm text-ink-3">
                      <MapPin className="w-4 h-4" />
                      <span>{event.region}</span>
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="relative z-10">
                  <div className="w-4 h-4 rounded-full bg-gold border-4 border-background shadow-[0_0_12px_rgba(200,169,110,0.5)]" />
                </div>

                {/* Spacer */}
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
