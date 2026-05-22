"use client"

import { useEffect, useRef, useState } from "react"
import { Quote, User, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Story {
  id: string
  name: string
  location: string
  heritage: string
  excerpt: string
}

const previewStories: Story[] = [
  {
    id: "1",
    name: "Maria Santos",
    location: "São Paulo, Brazil",
    heritage: "Angolan descent",
    excerpt:
      "Growing up in Salvador, I always felt the rhythm of Africa in our samba circles. It wasn't until I visited Luanda that I understood the depth...",
  },
  {
    id: "2",
    name: "Jean-Pierre Toussaint",
    location: "Port-au-Prince, Haiti",
    heritage: "Beninese & Congolese roots",
    excerpt:
      "The drums speak a language my ancestors taught us. Every Vodou ceremony is a conversation across centuries...",
  },
]

export function StoriesPreview() {
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
                Diaspora Voices
              </span>
            </h2>
            <p className="text-muted-foreground">Personal stories of heritage and belonging</p>
          </div>
          <Link
            href="/stories"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-500/20 bg-card/30 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all group"
          >
            <span className="text-emerald-400 font-medium">Read all stories</span>
            <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {previewStories.map((story, index) => (
            <div
              key={story.id}
              className="group relative p-6 rounded-lg border border-emerald-500/20 bg-card/30 backdrop-blur-sm hover:border-emerald-500/40 transition-all hover:scale-105"
              style={{
                animation: isVisible ? `fadeIn 0.6s ease-out ${index * 0.1}s both` : "none",
              }}
            >
              <div className="absolute top-4 right-4 text-emerald-500/20">
                <Quote className="w-8 h-8" />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{story.name}</h3>
                  <p className="text-sm text-muted-foreground">{story.location}</p>
                </div>
              </div>

              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 mb-4">
                {story.heritage}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4 italic">{story.excerpt}</p>

              <Link
                href={`/stories/${story.id}`}
                className="text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors inline-flex items-center gap-1"
              >
                Read full story
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
