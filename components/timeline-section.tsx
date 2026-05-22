"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar, MapPin } from "lucide-react"

interface TimelineEvent {
  year: string
  title: string
  description: string
  region: string
  isPlaceholder?: boolean
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "1500s",
    title: "Beginning of Transatlantic Slave Trade",
    description: "Portuguese traders establish first routes from West Africa to the Americas",
    region: "West Africa → Americas",
    isPlaceholder: true,
  },
  {
    year: "1619",
    title: "First Enslaved Africans in North America",
    description: "First documented arrival of enslaved Africans in English North America at Jamestown",
    region: "Angola → Virginia",
    isPlaceholder: true,
  },
  {
    year: "1791",
    title: "Haitian Revolution Begins",
    description: "Enslaved Africans in Saint-Domingue rise up, leading to first independent Black republic",
    region: "Haiti",
    isPlaceholder: true,
  },
  {
    year: "1834",
    title: "Abolition in British Empire",
    description: "Slavery abolished across British colonies, affecting Caribbean and other territories",
    region: "Caribbean & British Colonies",
    isPlaceholder: true,
  },
  {
    year: "1888",
    title: "Brazil Abolishes Slavery",
    description: "Last country in the Americas to abolish slavery, marking end of Atlantic slave trade era",
    region: "Brazil",
    isPlaceholder: true,
  },
  {
    year: "1960s",
    title: "African Independence Movements",
    description: "Wave of independence across African nations, strengthening diaspora connections",
    region: "Africa",
    isPlaceholder: true,
  },
]

export function TimelineSection() {
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
      className={`relative py-24 px-8 bg-gradient-to-b from-background to-background/50 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 text-transparent bg-clip-text">
              Historical Timeline
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trace the journey of the African diaspora through pivotal moments in history
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-emerald-500/50 via-emerald-500/30 to-transparent" />

          {/* Timeline events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} gap-8`}
                style={{
                  animation: isVisible ? `fadeInTimeline 0.6s ease-out ${index * 0.1}s both` : "none",
                }}
              >
                {/* Content card */}
                <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                  <div
                    className={`inline-block p-6 rounded-lg border border-emerald-500/20 bg-card/50 backdrop-blur-sm hover:border-emerald-500/40 transition-all hover:scale-105 ${
                      event.isPlaceholder ? "opacity-70" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2 text-emerald-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-semibold">{event.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
                    <p className="text-muted-foreground mb-3">{event.description}</p>
                    <div className="flex items-center gap-2 text-sm text-emerald-500/70">
                      <MapPin className="w-4 h-4" />
                      <span>{event.region}</span>
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="relative z-10">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 border-4 border-background shadow-lg shadow-emerald-500/50" />
                </div>

                {/* Spacer */}
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Note about placeholder content */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground italic">Timeline framework ready for historical event content</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInTimeline {
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
