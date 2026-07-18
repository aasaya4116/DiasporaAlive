"use client"

import Link from "next/link"
import { X, MapPin, Users, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { CountryProfile } from "@/lib/country-profiles"

interface LocationPanelProps {
  country: CountryProfile
  onClose: () => void
}

export function LocationPanel({ country, onClose }: LocationPanelProps) {
  return (
    <div className="w-full max-w-md border-l border-border bg-card md:w-96 lg:w-[28rem]">
      <ScrollArea className="h-full">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{country.name}</h2>
              <p className="text-sm text-muted-foreground">
                {(country.population / 1000000).toFixed(1)}M people of African descent ·{" "}
                {country.percentage}% of population
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Hero Image */}
          {country.imageUrl && (
            <div className="mb-6 overflow-hidden rounded-lg">
              <img
                src={country.imageUrl}
                alt={country.name}
                className="h-48 w-full object-cover"
              />
            </div>
          )}

          {/* Overview */}
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold text-foreground">Overview</h3>
            <p className={`text-sm leading-relaxed text-muted-foreground ${country.overview ? "" : "line-clamp-6"}`}>
              {country.overview ?? country.history}
            </p>
          </div>

          {/* Statistics */}
          {country.statistics && country.statistics.length > 0 && (
            <Card className="mb-6 border-primary/20 bg-primary/5 p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Did You Know?</h3>
              <div className="space-y-3">
                {country.statistics.map((stat, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1">
                      {stat.icon === "users" && <Users className="h-4 w-4 text-primary" />}
                      {stat.icon === "map" && <MapPin className="h-4 w-4 text-primary" />}
                      {stat.icon === "calendar" && <Calendar className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-foreground">{stat.label}</p>
                      <p className="text-sm font-semibold text-primary">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Cultural Influence */}
          <div className="mb-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Cultural Influence</h3>
            <div className="space-y-4">
              {country.culturalAspects
                ? country.culturalAspects.map((aspect, index) => (
                    <div key={index} className="rounded-lg border border-border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="font-medium text-foreground">{aspect.title}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {aspect.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{aspect.description}</p>
                      {aspect.examples && aspect.examples.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {aspect.examples.map((example, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {example}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                : country.culturalHighlights.slice(0, 4).map((highlight, index) => (
                    <div key={index} className="rounded-lg border border-border p-4">
                      <h4 className="mb-2 font-medium text-foreground">{highlight.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-4">{highlight.description}</p>
                    </div>
                  ))}
            </div>
          </div>

          {/* African Origins */}
          {country.africanOrigins && country.africanOrigins.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold text-foreground">African Origins</h3>
              <div className="flex flex-wrap gap-2">
                {country.africanOrigins.map((origin, index) => (
                  <Badge key={index} variant="outline" className="border-primary/40 text-primary">
                    {origin}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <Button asChild className="w-full gap-2">
            <Link href={`/country/${country.id}`}>
              View Full Profile
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </ScrollArea>
    </div>
  )
}
