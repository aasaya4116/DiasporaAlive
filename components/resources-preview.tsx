"use client"

import { useReveal } from "@/hooks/use-reveal"
import { BookOpen, Video, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

const categories = [
  { icon: BookOpen, title: "Books & Literature", description: "Foundational texts and new voices" },
  { icon: Video, title: "Documentaries", description: "Stories told on screen" },
  { icon: FileText, title: "Academic Papers", description: "Research on diaspora communities" },
]

export function ResourcesPreview() {
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
            <span className="overline block mb-3">Learn</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
              Educational Resources
            </h2>
            <p className="text-muted-foreground">Curated materials for learning and teaching</p>
          </div>
          <Link
            href="/resources"
            className="group flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-gold hover:text-gold"
          >
            Explore resources
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <div
                key={category.title}
                className="p-6 rounded-lg border border-border bg-card text-center transition hover:border-gold hover:-translate-y-0.5"
                style={{
                  animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : "none",
                }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{category.title}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
