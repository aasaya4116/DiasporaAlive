"use client"

import { useReveal } from "@/hooks/use-reveal"
import { Calendar, BookOpen, Library, ArrowRight } from "lucide-react"
import Link from "next/link"

const destinations = [
  {
    href: "/stories",
    icon: Library,
    title: "Research Topics",
    description: "Cross-cutting histories and movements across the diaspora, with sources.",
  },
  {
    href: "/timeline",
    icon: Calendar,
    title: "Historical Timeline",
    description: "Pivotal moments in diaspora history, from the 1500s to the independence era.",
  },
  {
    href: "/resources",
    icon: BookOpen,
    title: "Educational Resources",
    description: "Books, documentaries, and research for learning and teaching.",
  },
]

export function ExploreGrid() {
  const { ref: sectionRef, visible: isVisible } = useReveal<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      className={`relative py-16 px-8 transition-[opacity,transform] duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="overline block mb-3">Explore</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">Go Deeper</h2>
          <p className="text-muted-foreground">History, voices, events, and learning materials</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {destinations.map((dest, index) => {
            const Icon = dest.icon
            return (
              <Link
                key={dest.href}
                href={dest.href}
                className="group flex items-start gap-5 rounded-lg border border-border bg-card p-6 transition hover:border-gold hover:-translate-y-0.5"
                style={{
                  animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : "none",
                }}
              >
                <div className="shrink-0 w-12 h-12 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-gold transition-colors">
                      {dest.title}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-ink-3 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{dest.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
