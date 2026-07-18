"use client"

import { useReveal } from "@/hooks/use-reveal"
import { Quote, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import { stories } from "@/lib/content"

const previewStories = stories.slice(0, 2)

export function StoriesPreview() {
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
            <span className="overline block mb-3">Voices</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">Diaspora Voices</h2>
            <p className="text-muted-foreground">Personal stories of heritage and belonging</p>
          </div>
          <Link
            href="/stories"
            className="group flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-gold hover:text-gold"
          >
            Read all stories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {previewStories.map((story, index) => (
            <div
              key={story.id}
              className="group relative p-6 rounded-lg border border-border bg-card transition hover:border-gold hover:-translate-y-0.5"
              style={{
                animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : "none",
              }}
            >
              {/* Decorative quote icon */}
              <div className="absolute top-4 right-4 text-gold/10">
                <Quote className="w-16 h-16" />
              </div>

              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-full bg-surface-3 border border-gold/40 flex items-center justify-center shrink-0">
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

              {/* Pull-quote excerpt with gold left rail */}
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
