"use client"

import { useEffect, useRef, useState } from "react"
import { Quote, User } from "lucide-react"
import Link from "next/link"

interface Story {
  id: string
  name: string
  location: string
  heritage: string
  excerpt: string
  image?: string
  isPlaceholder?: boolean
}

const stories: Story[] = [
  {
    id: "1",
    name: "Maria Santos",
    location: "São Paulo, Brazil",
    heritage: "Angolan descent",
    excerpt:
      "Growing up in Salvador, I always felt the rhythm of Africa in our samba circles. It wasn't until I visited Luanda that I understood the depth of that connection...",
    isPlaceholder: true,
  },
  {
    id: "2",
    name: "Jean-Pierre Toussaint",
    location: "Port-au-Prince, Haiti",
    heritage: "Beninese & Congolese roots",
    excerpt:
      "The drums speak a language my ancestors taught us. Every Vodou ceremony is a conversation across centuries, a bridge between continents...",
    isPlaceholder: true,
  },
  {
    id: "3",
    name: "Keisha Williams",
    location: "New Orleans, USA",
    heritage: "West African heritage",
    excerpt:
      "When I tasted my grandmother's gumbo, I tasted centuries. The okra, the spices, the care—it all traced back to Nigeria. Food became my map home...",
    isPlaceholder: true,
  },
]

export function StoriesSection() {
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
      className={`relative py-24 px-8 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 text-transparent bg-clip-text">
              Diaspora Voices
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Personal stories of connection, heritage, and belonging from diaspora communities worldwide
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className={`group relative p-6 rounded-lg border border-emerald-500/20 bg-card/30 backdrop-blur-sm hover:border-emerald-500/40 transition-all hover:scale-105 ${
                story.isPlaceholder ? "opacity-70" : ""
              }`}
              style={{
                animation: isVisible ? `fadeIn 0.6s ease-out ${index * 0.1}s both` : "none",
              }}
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 text-emerald-500/20">
                <Quote className="w-8 h-8" />
              </div>

              {/* Profile */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{story.name}</h3>
                  <p className="text-sm text-muted-foreground">{story.location}</p>
                </div>
              </div>

              {/* Heritage badge */}
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 mb-4">
                {story.heritage}
              </div>

              {/* Excerpt */}
              <p className="text-muted-foreground leading-relaxed mb-4 italic">{story.excerpt}</p>

              {/* Read more link */}
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

        {/* Call to action */}
        <div className="text-center mt-12">
          <div className="inline-block p-8 rounded-lg border border-emerald-500/20 bg-card/30 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-foreground mb-3">Share Your Story</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Your journey matters. Help us build a living archive of diaspora experiences.
            </p>
            <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
              Submit Your Story
            </button>
          </div>
        </div>

        {/* Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground italic">
            Stories section framework ready for community narratives
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
