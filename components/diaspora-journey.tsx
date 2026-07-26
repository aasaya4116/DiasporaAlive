"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, SkipBack, SkipForward, Route, X } from "lucide-react"
import { countryProfiles } from "@/lib/country-profiles"

export interface JourneyStop {
  id: string
  connection?: string
}

// The curated default journey — the in-depth countries, roughly following the
// diaspora arc: South America -> Caribbean -> North America -> Europe.
export const CURATED_STOPS: JourneyStop[] = [
  "brazil",
  "colombia",
  "haiti",
  "cuba",
  "jamaica",
  "usa",
  "uk",
  "france",
].map((id) => ({ id }))

const DWELL_MS = 7000

type ResolvedStop = { country: (typeof countryProfiles)[number]; connection?: string }

function teaser(country: (typeof countryProfiles)[number]) {
  const text = country.overview ?? country.history
  if (text.length <= 130) return text
  return text.slice(0, 130).trimEnd() + "…"
}

interface DiasporaJourneyProps {
  stops: JourneyStop[]
  intro?: string | null
  activeCountryId: string | null
  onStopChange: (id: string) => void
  onClose: () => void
}

// Mounted only while a journey is active (parent controls that), so it starts
// fresh at stop 0 and auto-plays. Give it a `key` that changes per journey.
export function DiasporaJourney({ stops, intro, activeCountryId, onStopChange, onClose }: DiasporaJourneyProps) {
  const [playing, setPlaying] = useState(true)
  const [index, setIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // The last country id the journey itself pushed to the map, so we can tell
  // our own selection echoes apart from a genuine user pin-click.
  const lastPushedRef = useRef<string | null>(null)

  // Resolve each stop id to its country profile, carrying the AI "connection".
  const resolved = stops.reduce<ResolvedStop[]>((acc, s) => {
    const country = countryProfiles.find((c) => c.id === s.id)
    if (country) acc.push({ country, connection: s.connection })
    return acc
  }, [])

  const current = resolved[index]
  const currentId = current?.country.id ?? null

  // Auto-advance while playing
  useEffect(() => {
    if (!playing) return
    timerRef.current = setTimeout(() => {
      setIndex((i) => {
        if (i + 1 >= resolved.length) {
          setPlaying(false)
          return i
        }
        return i + 1
      })
    }, DWELL_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [playing, index, resolved.length])

  // Drive the map whenever the active stop changes
  useEffect(() => {
    if (!currentId) return
    lastPushedRef.current = currentId
    onStopChange(currentId)
  }, [index, currentId, onStopChange])

  // Follow *external* pin clicks only — skip ids the journey pushed itself, so
  // the panel and map can't oscillate.
  useEffect(() => {
    if (!activeCountryId || activeCountryId === lastPushedRef.current) return
    const i = stops.findIndex((s) => s.id === activeCountryId)
    if (i >= 0) {
      setIndex(i)
      setPlaying(false)
    }
  }, [activeCountryId, stops])

  const goTo = (i: number) => {
    setIndex(Math.max(0, Math.min(resolved.length - 1, i)))
  }

  if (!current) return null

  const atStart = index === 0
  const atEnd = index === resolved.length - 1
  const stopTeaser = current.connection ?? teaser(current.country)

  return (
    <div className="glass-panel absolute bottom-4 left-4 right-4 z-[900] max-h-[75vh] w-auto overflow-hidden rounded-2xl sm:right-auto sm:w-80">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <Route className="h-4 w-4 text-gold" />
          <span className="overline">Diaspora Journey</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close journey"
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* AI intro — the throughline of this journey */}
      {intro && (
        <p className="border-b border-white/10 px-4 py-3 text-xs leading-relaxed text-muted-foreground">{intro}</p>
      )}

      {/* Current stop */}
      <div className="flex gap-3 px-4 py-3">
        {current.country.imageUrl && (
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10">
            <img
              src={current.country.imageUrl}
              alt={current.country.name}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="truncate text-base font-bold text-foreground">{current.country.name}</h3>
            <span className="shrink-0 text-[11px] text-muted-foreground">
              {index + 1} / {resolved.length}
            </span>
          </div>
          <p className="text-[11px] text-gold">{current.country.region}</p>
          <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-muted-foreground">{stopTeaser}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4">
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gold transition-all duration-500"
            style={{ width: `${((index + 1) / resolved.length) * 100}%` }}
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
        {resolved.map((r, i) => (
          <button
            key={r.country.id}
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
              {r.country.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
