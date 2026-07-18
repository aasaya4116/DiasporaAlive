"use client"

import { useRef } from "react"
import { useReveal } from "@/hooks/use-reveal"
import { cn } from "@/lib/utils"

const populationData = [
  { place: "Brazil", population: "55,900,000", percentage: "26.67%" },
  { place: "USA", population: "46,282,080", percentage: "14.40%" },
  { place: "Haiti", population: "10,305,766", percentage: "95.00%" },
  { place: "Colombia", population: "4,944,400", percentage: "10.16%" },
  { place: "France", population: "3,800,000", percentage: "5.88%" },
  { place: "Jamaica", population: "2,731,419", percentage: "97.43%" },
  { place: "Venezuela", population: "2,641,481", percentage: "8.79%" },
  { place: "UK", population: "2,080,000", percentage: "3.19%" },
  { place: "DR", population: "1,985,991", percentage: "18.55%" },
  { place: "Mexico", population: "1,386,556", percentage: "1.07%" },
  { place: "Cuba", population: "1,126,894", percentage: "9.89%" },
  { place: "Italy", population: "1,100,000", percentage: "1.84%" },
  { place: "Puerto Rico", population: "979,842", percentage: "26.62%" },
  { place: "Peru", population: "875,427", percentage: "2.76%" },
  { place: "Germany", population: "817,150", percentage: "1.01%" },
  { place: "Canada", population: "783,795", percentage: "2.16%" },
  { place: "Spain", population: "690,291", percentage: "1.50%" },
  { place: "Ecuador", population: "680,000", percentage: "4.15%" },
  { place: "T&T", population: "607,472", percentage: "44.50%" },
]

/** Short display labels for top-4 hero cards */
const shortPopulationLabels: Record<string, string> = {
  Brazil: "55.9M",
  USA: "46.3M",
  Haiti: "10.3M",
  Colombia: "4.9M",
}

/** Mock history sparkline coordinates */
const sparklines: Record<string, number[]> = {
  Brazil: [30, 45, 35, 55, 60, 80],
  USA: [20, 30, 42, 50, 48, 70],
  Haiti: [50, 60, 55, 65, 75, 95],
  Colombia: [15, 25, 20, 35, 45, 55],
}

function generateSparklinePath(points: number[]) {
  const width = 100
  const height = 30
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min

  return points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * width
      const y = height - ((p - min) / range) * (height - 4) - 2
      return `${i === 0 ? "M" : "L"} ${x} ${y}`
    })
    .join(" ")
}

function TiltCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Max rotation 8 degrees
    const rotateX = -(y / (rect.height / 2)) * 8
    const rotateY = (x / (rect.width / 2)) * 8

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`

    // Set custom properties for glare effect
    const glareX = ((e.clientX - rect.left) / rect.width) * 100
    const glareY = ((e.clientY - rect.top) / rect.height) * 100
    card.style.setProperty("--glare-x", `${glareX}%`)
    card.style.setProperty("--glare-y", `${glareY}%`)
    card.style.setProperty("--glare-opacity", "0.15")
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    card.style.setProperty("--glare-opacity", "0")
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "transition-all duration-200 ease-out relative overflow-hidden",
        className
      )}
      style={{
        ...style,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Glare effect overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
        style={{
          background:
            "radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.15) 0%, transparent 60%)",
          opacity: "var(--glare-opacity, 0)",
        }}
      />
      {children}
    </div>
  )
}

const topCountries = populationData.slice(0, 4)
const remainingCountries = populationData.slice(4)

export function PopulationTable() {
  const { ref: tableRef, visible: isVisible } = useReveal<HTMLElement>()

  return (
    <section
      ref={tableRef}
      className={cn(
        "px-6 py-16 transition-[opacity,transform] duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      )}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="overline block mb-3">By the Numbers</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
            Diaspora Population by Country
          </h2>
          <p className="text-muted-foreground">
            African diaspora communities across the Americas and Caribbean
          </p>
        </div>

        {/* Top 4 — large interactive feature cards with 3D tilt and sparklines */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {topCountries.map((row, index) => (
            <TiltCard
              key={row.place}
              className="glass-panel hover-lift relative rounded-xl p-6 border-l-2 border-l-gold/60"
              style={{
                animation: isVisible
                  ? `countUp 0.7s ease-out ${index * 0.12}s both`
                  : "none",
              }}
            >
              <p className="overline mb-1">{row.place}</p>
              <p className="text-3xl md:text-4xl font-bold font-mono text-foreground leading-tight tracking-tight">
                {shortPopulationLabels[row.place]}
              </p>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                {row.percentage} of population
              </p>

              {/* Mini Sparkline Graph */}
              <div className="h-8 w-full mt-4 flex items-end opacity-70">
                <svg className="w-full h-full text-gold overflow-visible" viewBox="0 0 100 30">
                  <path
                    d={generateSparklinePath(sparklines[row.place])}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={`${generateSparklinePath(sparklines[row.place])} L 100 30 L 0 30 Z`}
                    fill="url(#sparkline-grad)"
                    opacity="0.1"
                  />
                  <defs>
                    <linearGradient id="sparkline-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c8a96e" />
                      <stop offset="100%" stopColor="#c8a96e" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Remaining countries — compact 2-column card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {remainingCountries.map((row, index) => (
            <div
              key={row.place}
              className="glass-panel hover-lift rounded-lg px-5 py-3 flex items-center justify-between border-l-2 border-l-gold/30"
              style={{
                animation: isVisible
                  ? `countUp 0.5s ease-out ${0.5 + index * 0.06}s both`
                  : "none",
              }}
            >
              <span className="font-medium text-sm text-foreground">
                {row.place}
              </span>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground tabular-nums">
                  {row.population}
                </span>
                <span className="text-xs text-gold/80 font-semibold tabular-nums min-w-[52px] text-right">
                  {row.percentage}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
