"use client"

import { useEffect, useRef, useState } from "react"
import { BookOpen, Film, GraduationCap, LinkIcon, Youtube } from "lucide-react"

interface Resource {
  title: string
  description: string
  type: "book" | "documentary" | "academic" | "website" | "video"
  url?: string
  isPlaceholder?: boolean
}

const resources: Resource[] = [
  {
    title: "The African Diaspora: A History Through Culture",
    description: "Comprehensive academic text exploring cultural continuities across the Atlantic",
    type: "book",
    isPlaceholder: true,
  },
  {
    title: "Roots of Rhythm: African Music in the Americas",
    description: "Documentary series tracing musical traditions from West Africa to the Caribbean and Americas",
    type: "documentary",
    isPlaceholder: true,
  },
  {
    title: "Journal of African Diaspora Studies",
    description: "Peer-reviewed academic journal featuring latest research on diaspora communities",
    type: "academic",
    isPlaceholder: true,
  },
  {
    title: "African Heritage Sites Database",
    description: "Interactive database of museums, monuments, and cultural sites across diaspora regions",
    type: "website",
    isPlaceholder: true,
  },
]

const resourceIcons = {
  book: BookOpen,
  documentary: Film,
  academic: GraduationCap,
  website: LinkIcon,
  video: Youtube,
}

const resourceColors = {
  book: "emerald",
  documentary: "green",
  academic: "teal",
  website: "lime",
  video: "emerald",
}

export function ResourcesSection() {
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
      className={`relative py-24 px-8 bg-gradient-to-b from-background/50 to-background transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 text-transparent bg-clip-text">
              Educational Resources
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Curated collection of books, documentaries, research papers, and digital archives
          </p>
        </div>

        {/* Resource Categories */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {resources.map((resource, index) => {
            const Icon = resourceIcons[resource.type]
            return (
              <div
                key={index}
                className={`group p-6 rounded-lg border border-emerald-500/20 bg-card/30 backdrop-blur-sm hover:border-emerald-500/40 transition-all hover:scale-105 ${
                  resource.isPlaceholder ? "opacity-70" : ""
                }`}
                style={{
                  animation: isVisible ? `fadeIn 0.6s ease-out ${index * 0.1}s both` : "none",
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-foreground">{resource.title}</h3>
                      <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize">
                        {resource.type}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{resource.description}</p>
                    {resource.url ? (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors inline-flex items-center gap-1"
                      >
                        Access resource
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </a>
                    ) : (
                      <span className="text-muted-foreground text-sm italic">Coming soon</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Resource Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {["Books", "Documentaries", "Academic Papers", "Podcasts"].map((category, index) => (
            <div
              key={category}
              className="p-6 rounded-lg border border-emerald-500/20 bg-card/30 backdrop-blur-sm text-center hover:border-emerald-500/40 transition-all hover:scale-105 cursor-pointer"
              style={{
                animation: isVisible ? `fadeIn 0.6s ease-out ${(index + 4) * 0.1}s both` : "none",
              }}
            >
              <div className="text-3xl font-bold text-emerald-400 mb-2">0</div>
              <div className="text-sm text-muted-foreground">{category}</div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <div className="inline-block p-8 rounded-lg border border-emerald-500/20 bg-card/30 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-foreground mb-3">Suggest a Resource</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Know of a valuable resource we should include? Help us build a comprehensive library.
            </p>
            <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
              Submit Resource
            </button>
          </div>
        </div>

        {/* Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground italic">
            Resources section framework ready for educational content and links
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
