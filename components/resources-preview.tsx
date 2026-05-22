"use client"

import { useEffect, useRef, useState } from "react"
import { BookOpen, Video, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

export function ResourcesPreview() {
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

  const categories = [
    { icon: BookOpen, title: "Books & Literature", count: "150+" },
    { icon: Video, title: "Documentaries", count: "75+" },
    { icon: FileText, title: "Academic Papers", count: "200+" },
  ]

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
                Educational Resources
              </span>
            </h2>
            <p className="text-muted-foreground">Curated materials for learning and teaching</p>
          </div>
          <Link
            href="/resources"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-500/20 bg-card/30 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all group"
          >
            <span className="text-emerald-400 font-medium">Explore resources</span>
            <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <div
                key={index}
                className="p-6 rounded-lg border border-emerald-500/20 bg-card/30 backdrop-blur-sm hover:border-emerald-500/40 transition-all hover:scale-105 text-center"
                style={{
                  animation: isVisible ? `fadeIn 0.6s ease-out ${index * 0.1}s both` : "none",
                }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{category.title}</h3>
                <p className="text-3xl font-bold text-emerald-400">{category.count}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
