"use client"

import { Music, Utensils, Church, Languages, PartyPopper, Landmark, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterChipsProps {
  selectedFilters: string[]
  onFiltersChange: (filters: string[]) => void
}

const filterCategories = [
  { id: "music", label: "Music & Dance", icon: Music },
  { id: "cuisine", label: "Cuisine", icon: Utensils },
  { id: "religion", label: "Religion", icon: Church },
  { id: "language", label: "Language", icon: Languages },
  { id: "festivals", label: "Festivals", icon: PartyPopper },
  { id: "sites", label: "Historic Sites", icon: Landmark },
]

export function FilterChips({ selectedFilters, onFiltersChange }: FilterChipsProps) {
  const toggleFilter = (filterId: string) => {
    if (selectedFilters.includes(filterId)) {
      onFiltersChange(selectedFilters.filter((f) => f !== filterId))
    } else {
      onFiltersChange([...selectedFilters, filterId])
    }
  }

  const clearAll = () => {
    onFiltersChange([])
  }

  const resultCount = selectedFilters.length > 0 ? Math.floor(Math.random() * 50) + 10 : 0

  return (
    <div className="glass-card max-w-5xl mx-auto p-6 rounded-2xl space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">Filter by category</p>
        {selectedFilters.length > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {filterCategories.map((category) => {
          const Icon = category.icon
          const isActive = selectedFilters.includes(category.id)

          return (
            <button
              key={category.id}
              onClick={() => toggleFilter(category.id)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/40 scale-105 glow-emerald"
                  : "bg-card/50 text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground hover:scale-[1.02]",
              )}
            >
              <Icon className="h-4 w-4" />
              {category.label}
            </button>
          )
        })}
      </div>

      {resultCount > 0 && (
        <p className="text-sm text-muted-foreground animate-in fade-in duration-300">
          {resultCount} cultural sites found
        </p>
      )}
    </div>
  )
}
