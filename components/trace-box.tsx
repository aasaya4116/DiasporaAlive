"use client"

import { useState } from "react"
import { Sparkles, Route, ArrowUp, Loader2 } from "lucide-react"
import type { JourneyStop } from "@/components/diaspora-journey"

interface TraceResult {
  intro: string | null
  stops: JourneyStop[]
}

interface TraceBoxProps {
  onTrace: (result: TraceResult) => void
  onStartCurated: () => void
}

const EXAMPLES = ["Afro-Latin rhythms", "Where did the Yoruba go?", "Carnival traditions"]

export function TraceBox({ onTrace, onStartCurated }: TraceBoxProps) {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runTrace = async (raw: string) => {
    const q = raw.trim()
    if (!q || loading) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/trace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        setError(body?.error ?? "Something went wrong. Please try again.")
        return
      }
      const data = (await res.json()) as TraceResult
      if (!data.stops?.length) {
        setError("No matches in the collection — try another theme.")
        return
      }
      onTrace(data)
      setQuery("")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-panel absolute inset-x-4 bottom-4 z-[900] mx-auto max-w-md rounded-2xl p-3 sm:inset-x-auto sm:left-1/2 sm:w-[26rem] sm:-translate-x-1/2">
      <div className="mb-2 flex items-center gap-1.5 px-1">
        <Sparkles className="h-3.5 w-3.5 text-gold" />
        <span className="overline">Trace the diaspora</span>
      </div>

      <div className="flex items-center gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && runTrace(query)}
          disabled={loading}
          placeholder="A theme, an era, a culture…"
          className="flex-1 rounded-full border border-line bg-surface-2 px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-gold disabled:opacity-60"
        />
        <button
          onClick={() => runTrace(query)}
          disabled={loading || !query.trim()}
          aria-label="Trace"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-background transition hover:opacity-90 disabled:opacity-40"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" />}
        </button>
      </div>

      {error ? (
        <p className="mt-2 px-1 text-xs text-destructive">{error}</p>
      ) : (
        <div className="mt-2.5 flex flex-wrap gap-1.5 px-1">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => runTrace(ex)}
              disabled={loading}
              className="rounded-full border border-line px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-gold hover:text-gold disabled:opacity-60"
            >
              {ex}
            </button>
          ))}
          <button
            onClick={onStartCurated}
            disabled={loading}
            className="flex items-center gap-1 rounded-full border border-line px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-gold hover:text-gold disabled:opacity-60"
          >
            <Route className="h-3 w-3" />
            Guided tour
          </button>
        </div>
      )}
    </div>
  )
}
