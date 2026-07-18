"use client"

import { useReveal } from "@/hooks/use-reveal"
import { BookOpen, Film, GraduationCap, LinkIcon, Youtube } from "lucide-react"
import { resources, type Resource } from "@/lib/content"

const resourceIcons: Record<Resource["type"], typeof BookOpen> = {
  book: BookOpen,
  documentary: Film,
  academic: GraduationCap,
  website: LinkIcon,
  video: Youtube,
}

export function ResourcesSection() {
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
          <span className="overline block mb-3">Learn</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">Educational Resources</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Curated collection of books, documentaries, research papers, and digital archives
          </p>
        </div>

        {/* Resources */}
        <div className="grid md:grid-cols-2 gap-6">
          {resources.map((resource, index) => {
            const Icon = resourceIcons[resource.type]
            return (
              <div
                key={resource.title}
                className="group p-6 rounded-lg border border-border bg-card transition hover:border-gold hover:-translate-y-0.5"
                style={{
                  animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : "none",
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gold/10 border border-gold/25">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-foreground">{resource.title}</h3>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-gold/10 text-gold border border-gold/25 capitalize">
                        {resource.type}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{resource.description}</p>
                    {resource.url ? (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold text-sm font-medium hover:text-gold-strong transition-colors inline-flex items-center gap-1"
                      >
                        Access resource
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </a>
                    ) : (
                      <span className="text-ink-3 text-sm italic">Coming soon</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
