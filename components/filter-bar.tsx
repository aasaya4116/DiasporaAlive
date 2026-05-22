"use client"

import { Button } from "@/components/ui/button"
import { Music, Utensils, Church, Languages, PartyPopper, MapPin } from "lucide-react"

const filters = [
  { id: "music", label: "Music & Dance", icon: Music },
  { id: "food", label: "Cuisine", icon: Utensils },
  { id: "religion", label: "Religion", icon: Church },
  { id: "language", label: "Language", icon: Languages },
  { id: "festivals", label: "Festivals", icon: PartyPopper },
  { id: "sites", label: "Historic Sites", icon: MapPin },
]

interface FilterBarProps {
  selectedFilters: string[]
  onFiltersChange: (filters: string[]) => void
}

export function FilterBar({ selectedFilters, onFiltersChange }: FilterBarProps) {
  const toggleFilter = (filterId: string) => {
    if (selectedFilters.includes(filterId)) {
      onFiltersChange(selectedFilters.filter((f) => f !== filterId))
    } else {
      onFiltersChange([...selectedFilters, filterId])
    }
  }

  return (
    <div className="border-b border-border bg-card px-6 py-3">
      <div className="flex items-center gap-2 overflow-x-auto">
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Filter by:</span>
        {filters.map((filter) => {
          const Icon = filter.icon
          const isActive = selectedFilters.includes(filter.id)
          return (
            <Button
              key={filter.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter(filter.id)}
              className="gap-2 whitespace-nowrap"
            >
              <Icon className="h-4 w-4" />
              {filter.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
