"use client"

import { useEffect, useRef, useState } from "react"
import { Globe, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function IntroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToMap = () => {
    const mapSection = document.getElementById("map-section")
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative min-h-[60vh] flex items-center justify-center px-6 py-20 bg-gradient-to-b from-background via-background to-card/30 border-b border-primary/20",
        "transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      )}
    >
      <div className="absolute inset-0 opacity-[0.15]">
        <img src="/images/diaspora-movement-africa-highlighted.jpg" alt="" className="w-full h-full object-cover" />
      </div>
      {/* </CHANGE> */}

      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
        <div
          className={cn(
            "inline-flex items-center justify-center mb-4 transition-all duration-1000 delay-200",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90",
          )}
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 border-2 border-primary/40 glow-cyan-strong">
            <Globe className="h-10 w-10 text-primary" />
          </div>
        </div>

        <h1
          className={cn(
            "text-5xl font-bold text-foreground text-balance transition-all duration-1000 delay-300 glow-cyan",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          Welcome to Diaspora Alive
        </h1>

        <p
          className={cn(
            "text-lg text-muted-foreground leading-relaxed text-pretty transition-all duration-1000 delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          Explore the rich cultural tapestry of the African diaspora across the Americas and Caribbean. Discover how
          African traditions, music, cuisine, languages, and spiritual practices have shaped communities around the
          world. Our interactive map brings to life the connections between continents, celebrating the vibrant heritage
          and ongoing influence of African cultures in the New World.
        </p>

        <button
          onClick={scrollToMap}
          className={cn(
            "inline-flex items-center gap-2 px-8 py-4 mt-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-1000 delay-700 hover:translate-y-1 glow-cyan-strong",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          Explore the Map
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </button>
      </div>
    </section>
  )
}
