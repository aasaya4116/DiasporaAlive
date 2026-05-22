"use client"

import { X, MapPin, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Location } from "@/lib/location-data"
import { Share2 } from "lucide-react"

interface LocationPanelProps {
  location: Location
  onClose: () => void
}

export function LocationPanel({ location, onClose }: LocationPanelProps) {
  return (
    <div className="w-full max-w-md border-l border-border bg-card md:w-96 lg:w-[28rem]">
      <ScrollArea className="h-full">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{location.name}</h2>
              <p className="text-sm text-muted-foreground">{location.country}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Hero Image */}
          <div className="mb-6 overflow-hidden rounded-lg">
            <img
              src={location.imageUrl || "/placeholder.svg"}
              alt={location.name}
              className="h-48 w-full object-cover"
            />
          </div>

          {/* Overview */}
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold text-foreground">Overview</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{location.overview}</p>
          </div>

          {/* Statistics */}
          <Card className="mb-6 border-primary/20 bg-primary/5 p-4">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Did You Know?</h3>
            <div className="space-y-3">
              {location.statistics.map((stat, index) => (
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

          {/* Cultural Aspects */}
          <div className="mb-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Cultural Influence</h3>
            <div className="space-y-4">
              {location.culturalAspects.map((aspect, index) => (
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
              ))}
            </div>
          </div>

          {/* African Origins */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-semibold text-foreground">African Origins</h3>
            <div className="flex flex-wrap gap-2">
              {location.africanOrigins.map((origin, index) => (
                <Badge key={index} className="bg-accent text-accent-foreground">
                  {origin}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button className="flex-1 gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Learn More
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
