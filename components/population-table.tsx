"use client"

import { useEffect, useRef, useState } from "react"
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

export function PopulationTable() {
  const [isVisible, setIsVisible] = useState(false)
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (tableRef.current) {
      observer.observe(tableRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={tableRef}
      className={cn(
        "px-6 py-16 transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      )}
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
          Diaspora Population by Country
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          African diaspora communities across the Americas and Caribbean
        </p>

        <div className="overflow-x-auto rounded-lg border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-emerald-500/30 bg-emerald-500/5">
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Place</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-emerald-400">Population</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-emerald-400">Percentage (% of total)</th>
              </tr>
            </thead>
            <tbody>
              {populationData.map((row, index) => (
                <tr
                  key={row.place}
                  className={cn(
                    "border-b border-border/50 transition-colors hover:bg-emerald-500/5",
                    index % 2 === 0 ? "bg-background" : "bg-card/30",
                  )}
                >
                  <td className="px-6 py-4 text-sm font-medium">{row.place}</td>
                  <td className="px-6 py-4 text-sm text-right text-muted-foreground">{row.population}</td>
                  <td className="px-6 py-4 text-sm text-right text-muted-foreground">{row.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
