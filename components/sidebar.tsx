"use client"

import { Map, Globe, Search, ChevronDown, Calendar, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"
import { countryProfiles } from "@/lib/country-profiles"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  onCountryHover?: (countryId: string | null) => void
  onSearch?: (query: string) => void
}

const menuItems = [
  { id: "map", label: "Interactive Map", icon: Map },
  { id: "profiles", label: "Country Profiles", icon: Globe, hasSubmenu: true },
  { id: "search", label: "Search", icon: Search },
  { id: "news", label: "News & Events", icon: Calendar },
  { id: "planner", label: "Trip Planner", icon: Sparkles },
]

const regionGroups = {
  Americas: ["brazil", "usa", "mexico", "colombia", "venezuela"],
  Caribbean: ["jamaica", "haiti", "cuba"],
  Europe: ["france", "germany", "uk"],
}

export function Sidebar({ activeSection, onSectionChange, onCountryHover, onSearch }: SidebarProps) {
  const [isProfilesExpanded, setIsProfilesExpanded] = useState(true)
  const [expandedRegions, setExpandedRegions] = useState<string[]>(["Americas", "Caribbean", "Europe"])
  const [searchQuery, setSearchQuery] = useState("")

  const toggleRegion = (region: string) => {
    setExpandedRegions((prev) => (prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]))
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    onSearch?.(value)
  }

  return (
    <aside className="w-64 border-r border-border/50 bg-card/50 backdrop-blur-xl flex flex-col">
      <div className="p-6 border-b border-border/50">
        <h1 className="text-xl font-semibold text-foreground tracking-tight">Diaspora Alive</h1>
        <p className="text-xs text-muted-foreground mt-1">Cultural heritage map</p>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    if (item.hasSubmenu) {
                      setIsProfilesExpanded(!isProfilesExpanded)
                    }
                    onSectionChange(item.id)
                    if (item.id === "map") {
                      document.getElementById("map-section")?.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "text-muted-foreground hover:bg-card hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                  {item.hasSubmenu && (
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 ml-auto transition-transform duration-200",
                        isProfilesExpanded ? "rotate-180" : "",
                      )}
                    />
                  )}
                </button>

                {item.id === "search" && isActive && (
                  <div className="mt-2 px-2">
                    <input
                      type="text"
                      placeholder="Search countries..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                )}

                {item.hasSubmenu && isProfilesExpanded && (
                  <ul className="mt-2 ml-2 space-y-2">
                    {Object.entries(regionGroups).map(([region, countryIds]) => (
                      <li key={region}>
                        <button
                          onClick={() => toggleRegion(region)}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-card/50 transition-all"
                        >
                          <ChevronDown
                            className={cn(
                              "h-3 w-3 transition-transform",
                              expandedRegions.includes(region) ? "rotate-180" : "",
                            )}
                          />
                          {region}
                        </button>

                        {expandedRegions.includes(region) && (
                          <ul className="mt-1 ml-5 space-y-1">
                            {countryIds
                              .map((id) => countryProfiles.find((c) => c.id === id))
                              .filter(Boolean)
                              .map((country) => (
                                <li key={country!.id}>
                                  <Link
                                    href={`/country/${country!.id}`}
                                    onMouseEnter={() => onCountryHover?.(country!.id)}
                                    onMouseLeave={() => onCountryHover?.(null)}
                                    className="block px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 hover:translate-x-1"
                                    title={`${country!.population} population`}
                                  >
                                    {country!.name}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
