"use client"

import { useReveal } from "@/hooks/use-reveal"
import { Quote, User } from "lucide-react"
import { stories } from "@/lib/content"

export function StoriesSection() {
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
          <span className="overline block mb-3">Voices</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">Diaspora Voices</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Personal stories of connection, heritage, and belonging from diaspora communities worldwide
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className="group relative p-6 rounded-lg border border-border bg-card transition hover:border-gold hover:-translate-y-0.5"
              style={{
                animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : "none",
              }}
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 text-gold/15">
                <Quote className="w-8 h-8" />
              </div>

              {/* Profile */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-surface-3 border border-gold/40 flex items-center justify-center">
                  <User className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{story.name}</h3>
                  <p className="text-sm text-muted-foreground">{story.location}</p>
                </div>
              </div>

              {/* Heritage badge */}
              <div className="inline-block px-3 py-1 rounded-full bg-emerald/10 border border-emerald/25 text-xs font-medium text-emerald mb-4">
                {story.heritage}
              </div>

              {/* Excerpt */}
              <p className="text-muted-foreground leading-relaxed italic border-l-2 border-l-gold/60 pl-4">
                {story.excerpt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
