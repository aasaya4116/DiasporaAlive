"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, SkipBack, SkipForward, Route, X } from "lucide-react"
import { countryProfiles } from "@/lib/country-profiles"

// Curated narrative order — the in-depth countries, roughly following the
// diaspora arc: South America -> Caribbean -> North America -> Europe.
const JOURNEY_IDS = ["brazil", "colombia", "haiti", "cuba", "jamaica", "usa", "uk", "france"]

const stops = JOURNEY_IDS.map((id) => countryProfiles.find((c) => c.id === id)).filter(
  (c): c is (typeof countryProfiles)[number] => Boolean(c)
)

const DWELL_MS = 7000

function teaser(country: (typeof countryProfiles)[number]) {
  const text = country.overview ?? country.history
  if (text.length <= 130) return text
  return text.slice(0, 130).trimEnd() + "…"
}

interface DiasporaJourneyProps {
  activeCountryId: string | null
  onStopChange: (id: string) => void
  onStart?: () => void
}

export function DiasporaJourney({ activeCountryId, onStopChange, onStart }: DiasporaJourneyProps) {
  const [open, setOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [index, setIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const current = stops[index]

  // Auto-advance while playing
  useEffect(() => {
    if (!open || !playing) return
    timerRef.current = setTimeout(() => {
      setIndex((i) => {
        if (i + 1 >= stops.length) {
          setPlaying(false)
          return i
        }
        return i + 1
      })
    }, DWELL_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [open, playing, index])

  // Drive the map whenever the active stop changes
  useEffect(() => {
    if (!open) return
    onStopChange(current.id)
  }, [open, index, current.id, onStopChange])

  // Follow direct pin clicks that land on a journey country
  useEffect(() => {
    if (!open || !activeCountryId) return
    const i = stops.findIndex((s) => s.id === activeCountryId)
    if (i >= 0 && i !== index) {
      setIndex(i)
      setPlaying(false)
    }
  }, [activeCountryId, open, index])

  const start = () => {
    onStart?.()
    setOpen(true)
    setIndex(0)
    setPlaying(true)
  }

  const exit = () => {
    setPlaying(false)
    setOpen(false)
  }

  const goTo = (i: number) => {
    setIndex(Math.max(0, Math.min(stops.length - 1, i)))
  }

  if (!open) {
    return (
      <button
        onClick={start}
        className="absolute bottom-4 left-4 z-[900] inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-background shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition hover:opacity-90 hover:-translate-y-px"
      >
        <Route className="h-4 w-4" />
        Start the Diaspora Journey
      </button>
    )
  }

  const atStart = index === 0
  const atEnd = index === stops.length - 1

  return (
    <div className="glass-panel absolute bottom-4 left-4 right-4 z-[900] max-h-[70vh] w-auto overflow-hidden rounded-2xl sm:right-auto sm:w-80">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <Route className="h-4 w-4 text-gold" />
          <span className="overline">Diaspora Journey</span>
        </div>
        <button
          onClick={exit}
          aria-label="Close journey"
          className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Current stop */}
      <div className="flex gap-3 px-4 py-3">
        {current.imageUrl && (
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10">
            <img src={current.imageUrl} alt={current.name} className="h-full w-full object-cover" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="truncate text-base font-bold text-foreground">{current.name}</h3>
            <span className="shrink-0 text-[11px] text-muted-foreground">
              {index + 1} / {stops.length}
            </span>
          </div>
          <p className="text-[11px] text-gold">{current.region}</p>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{teaser(current)}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4">
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gold transition-all duration-500"
            style={{ width: `${((index + 1) / stops.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2 px-4 py-3">
        <button
          onClick={() => goTo(index - 1)}
          disabled={atStart}
          aria-label="Previous stop"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-foreground transition hover:border-gold hover:text-gold disabled:opacity-30 disabled:hover:border-line disabled:hover:text-foreground"
        >
          <SkipBack className="h-4 w-4" />
        </button>
        <button
          onClick={() => {
            if (atEnd) {
              setIndex(0)
              setPlaying(true)
            } else {
              setPlaying((p) => !p)
            }
          }}
          aria-label={playing ? "Pause" : "Play"}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-background transition hover:opacity-90"
        >
          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-px" />}
        </button>
        <button
          onClick={() => goTo(index + 1)}
          disabled={atEnd}
          aria-label="Next stop"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-foreground transition hover:border-gold hover:text-gold disabled:opacity-30 disabled:hover:border-line disabled:hover:text-foreground"
        >
          <SkipForward className="h-4 w-4" />
        </button>
      </div>

      {/* Stop list */}
      <div className="max-h-40 overflow-y-auto border-t border-white/10 px-2 py-2">
        {stops.map((stop, i) => (
          <button
            key={stop.id}
            onClick={() => goTo(i)}
            className={`flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors ${
              i === index ? "bg-gold/10" : "hover:bg-white/5"
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                i === index ? "bg-gold text-background" : "bg-white/10 text-muted-foreground"
              }`}
            >
              {i + 1}
            </span>
            <span
              className={`truncate text-sm ${i === index ? "font-semibold text-foreground" : "text-muted-foreground"}`}
            >
              {stop.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
