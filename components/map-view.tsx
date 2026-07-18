"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import type * as Leaflet from "leaflet"
import { countryProfiles } from "@/lib/country-profiles"

interface MapViewProps {
  selectedLocation: string | null
  onLocationSelect: (id: string | null) => void
  filters: string[]
  searchQuery: string
  highlightedCountry?: string | null
}

const AFRICAN_ORIGINS: Record<string, { lat: number; lng: number }> = {
  Nigeria: { lat: 9.082, lng: 8.6753 },
  Ethiopia: { lat: 9.145, lng: 40.4897 },
  Ghana: { lat: 7.9465, lng: -1.0232 },
  Congo: { lat: -4.0383, lng: 21.7587 },
  "Democratic Republic of Congo": { lat: -4.0383, lng: 21.7587 },
  Angola: { lat: -11.2027, lng: 17.8739 },
  Senegal: { lat: 14.4974, lng: -14.4524 },
  Mali: { lat: 17.5707, lng: -3.9962 },
  "Ivory Coast": { lat: 7.54, lng: -5.5471 },
  Cameroon: { lat: 7.3697, lng: 12.3547 },
  Mozambique: { lat: -18.6657, lng: 35.5296 },
  Guinea: { lat: 9.9456, lng: -9.6966 },
  "West Africa": { lat: 7.9465, lng: -1.0232 }, // Ghana center
  "Central Africa": { lat: -4.0383, lng: 21.7587 }, // Congo center
  "East Africa": { lat: -6.369, lng: 34.8888 }, // Tanzania center
}

const countryFlags: Record<string, string> = {
  germany: "de",
  brazil: "br",
  usa: "us",
  mexico: "mx",
  venezuela: "ve",
  jamaica: "jm",
  colombia: "co",
  haiti: "ht",
  france: "fr",
  cuba: "cu",
  uk: "gb",
  "dominican-republic": "do",
  italy: "it",
  "puerto-rico": "pr",
  peru: "pe",
  canada: "ca",
  spain: "es",
  ecuador: "ec",
  "trinidad-tobago": "tt",
}

const FILTER_KEYWORDS: Record<string, string[]> = {
  music: ["music", "dance", "rhythm", "samba", "song", "drum", "instrument", "jazz", "tempo", "bomba", "rumba"],
  food: ["food", "cuisine", "dish", "cook", "recipe", "bean", "cacao", "sugar", "coffee", "taste", "pastry"],
  religion: ["religion", "spiritual", "deity", "church", "god", "catholic", "candomble", "vodou", "santeria", "faith", "shaman"],
  language: ["language", "speech", "creole", "patois", "french", "spanish", "english", "speak", "dialect"],
  festivals: ["festival", "carnival", "celebration", "parade", "holiday", "event", "commemorating", "gathering"],
  sites: ["site", "monument", "fortress", "museum", "historical", "building", "cemetery", "landmark", "park"],
}

function markerIconHtml() {
  return `
    <div class="marker-inner">
      <span class="absolute w-8 h-8 rounded-full bg-emerald-500/25 animate-ping pointer-events-none"></span>
      <span class="absolute w-6 h-6 rounded-full border border-emerald-500/30 animate-pulse pointer-events-none"></span>
      <div class="marker-core"></div>
    </div>
  `
}

function popupHtml(country: (typeof countryProfiles)[number]) {
  const origins = Array.isArray(country.africanOrigins)
    ? country.africanOrigins.slice(0, 3).join(", ")
    : "Various African regions"
  const historicSites = country.culturalHighlights?.length || 0
  const flagCode = countryFlags[country.id] || "world"

  return `
    <div class="p-5 w-80">
      <button data-popup-close class="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 rounded-full bg-surface-2 border border-line flex items-center justify-center overflow-hidden">
          <img src="https://flagcdn.com/w40/${flagCode}.png" alt="${country.name} flag" class="w-full h-full object-cover" />
        </div>
        <div>
          <h3 class="text-xl font-bold text-foreground">${country.name}</h3>
          <p class="text-xs text-muted-foreground">African diaspora population</p>
        </div>
      </div>

      <div class="mb-4">
        <div class="text-4xl font-bold text-foreground mb-1">
          ${(country.population / 1000000).toFixed(1)}M
          <span class="text-lg font-normal text-muted-foreground">people</span>
        </div>
        <p class="text-xs text-muted-foreground">(of African descent)</p>
      </div>

      <div class="border-t border-line pt-4 space-y-3 mb-4">
        <div class="flex items-start gap-2">
          <svg class="w-4 h-4 text-emerald mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <div class="flex-1">
            <p class="text-xs text-muted-foreground mb-0.5">Top origins:</p>
            <p class="text-sm text-foreground font-medium">${origins}</p>
          </div>
        </div>

        <div class="flex items-start gap-2">
          <svg class="w-4 h-4 text-emerald mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <div class="flex-1">
            <p class="text-xs text-muted-foreground mb-0.5">Historic sites:</p>
            <p class="text-sm text-foreground font-medium">${historicSites} locations</p>
          </div>
        </div>
      </div>

      <button
        data-country-id="${country.id}"
        class="w-full py-3 px-4 bg-primary hover:bg-gold-strong text-primary-foreground font-semibold rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
      >
        Explore country
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    </div>
  `
}

export function MapView({ selectedLocation, onLocationSelect, filters, searchQuery, highlightedCountry }: MapViewProps) {
  const router = useRouter()
  const mapRef = useRef<HTMLDivElement | null>(null)
  const mapInstanceRef = useRef<Leaflet.Map | null>(null)
  const leafletRef = useRef<typeof Leaflet | null>(null)
  const markersRef = useRef<Map<string, Leaflet.Marker>>(new Map())
  const arcsRef = useRef<Leaflet.Polyline[]>([])
  const africanMarkersRef = useRef<Leaflet.Marker[]>([])
  const popupTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const selectedCountry = selectedLocation

  // Refs mirror the stateful props so the marker-build effect can re-apply
  // classes without depending on (and re-running for) every hover change.
  const highlightedRef = useRef<string | null | undefined>(highlightedCountry)
  highlightedRef.current = highlightedCountry
  const selectedRef = useRef<string | null>(selectedCountry)
  selectedRef.current = selectedCountry

  const filteredCountries = useMemo(() => {
    return countryProfiles.filter((country) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        const nameMatches = country.name.toLowerCase().includes(q)
        const historyMatches = country.history.toLowerCase().includes(q)
        const highlightMatches = country.culturalHighlights.some(
          (h) => h.title.toLowerCase().includes(q) || h.description.toLowerCase().includes(q)
        )
        const originMatches = country.africanOrigins?.some((o) => o.toLowerCase().includes(q))
        if (!nameMatches && !historyMatches && !highlightMatches && !originMatches) {
          return false
        }
      }

      if (filters && filters.length > 0) {
        const matchesFilter = filters.some((filterId) => {
          const activeKeywords = FILTER_KEYWORDS[filterId] || [filterId]
          const inHistory = activeKeywords.some((keyword) => country.history.toLowerCase().includes(keyword))
          const inHighlights = country.culturalHighlights.some((h) =>
            activeKeywords.some(
              (keyword) => h.title.toLowerCase().includes(keyword) || h.description.toLowerCase().includes(keyword)
            )
          )
          return inHistory || inHighlights
        })
        if (!matchesFilter) {
          return false
        }
      }

      return true
    })
  }, [searchQuery, filters])

  // Init map once
  useEffect(() => {
    let cancelled = false

    if (typeof window !== "undefined" && !mapInstanceRef.current) {
      import("leaflet").then((L) => {
        if (cancelled || !mapRef.current || mapInstanceRef.current) return

        const map = L.map(mapRef.current, {
          center: [15, -20],
          zoom: 3,
          minZoom: 2,
          maxZoom: 8,
          zoomControl: true,
        })

        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
          attribution: "© OpenStreetMap contributors © CARTO",
          subdomains: "abcd",
          maxZoom: 20,
        }).addTo(map)

        leafletRef.current = L
        mapInstanceRef.current = map
        setIsMapLoaded(true)
      })
    }

    return () => {
      cancelled = true
      if (popupTimeoutRef.current) {
        clearTimeout(popupTimeoutRef.current)
        popupTimeoutRef.current = null
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
      markersRef.current.clear()
      arcsRef.current = []
      africanMarkersRef.current = []
      leafletRef.current = null
    }
  }, [])

  // Build markers — only when the filtered set changes, never on hover/selection
  useEffect(() => {
    const L = leafletRef.current
    const map = mapInstanceRef.current
    if (!isMapLoaded || !L || !map) return

    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current.clear()

    filteredCountries.forEach((country) => {
      if (!country.coordinates || typeof country.coordinates.lat !== "number" || typeof country.coordinates.lng !== "number") {
        return
      }

      const customIcon = L.divIcon({
        html: markerIconHtml(),
        className: "custom-marker-icon",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      const marker = L.marker([country.coordinates.lat, country.coordinates.lng], {
        icon: customIcon,
      }).addTo(map)

      marker.bindPopup(popupHtml(country), {
        maxWidth: 320,
        className: "country-info-popup",
        closeButton: false,
      })

      marker.on("click", () => {
        onLocationSelect(country.id)
      })

      marker.on("popupopen", (e) => {
        const popupEl = e.popup.getElement()
        if (!popupEl) return
        popupEl.querySelector("[data-popup-close]")?.addEventListener("click", () => {
          map.closePopup()
        })
        popupEl.querySelector<HTMLElement>("[data-country-id]")?.addEventListener("click", (evt) => {
          const id = (evt.currentTarget as HTMLElement).getAttribute("data-country-id")
          if (id) router.push(`/country/${id}`)
        })
      })

      // Re-apply stateful classes after a rebuild
      const el = marker.getElement()
      if (el) {
        el.classList.toggle("marker-highlighted", highlightedRef.current === country.id)
        el.classList.toggle("marker-selected", selectedRef.current === country.id)
      }

      markersRef.current.set(country.id, marker)
    })
  }, [isMapLoaded, filteredCountries, onLocationSelect, router])

  // Hover highlight — toggles a class on the affected markers only
  useEffect(() => {
    if (!isMapLoaded) return
    markersRef.current.forEach((marker, id) => {
      marker.getElement()?.classList.toggle("marker-highlighted", highlightedCountry === id)
    })
  }, [isMapLoaded, highlightedCountry])

  // Selection — arcs, origin markers, flyTo, popup
  useEffect(() => {
    const L = leafletRef.current
    const map = mapInstanceRef.current
    if (!isMapLoaded || !L || !map) return

    arcsRef.current.forEach((arc) => arc.remove())
    africanMarkersRef.current.forEach((marker) => marker.remove())
    arcsRef.current = []
    africanMarkersRef.current = []

    markersRef.current.forEach((marker, id) => {
      marker.getElement()?.classList.toggle("marker-selected", selectedCountry === id)
    })

    if (!selectedCountry) return

    const country = filteredCountries.find((c) => c.id === selectedCountry)
    const marker = markersRef.current.get(selectedCountry)
    if (!country || !marker) return

    const origins = Array.isArray(country.africanOrigins) ? country.africanOrigins : []
    origins.forEach((origin) => {
      const originCoords = AFRICAN_ORIGINS[origin]
      if (!originCoords) return

      const originIcon = L.divIcon({
        html: `
          <div class="african-origin-marker">
            <div class="w-3 h-3 bg-gold rounded-full shadow-[0_0_15px_rgba(200,169,110,0.8)] border border-gold-strong"></div>
          </div>
        `,
        className: "african-origin-icon",
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      })

      const originMarker = L.marker([originCoords.lat, originCoords.lng], {
        icon: originIcon,
      }).addTo(map)

      originMarker.bindPopup(`<div class="p-2 text-foreground font-semibold">${origin}</div>`, {
        className: "country-info-popup",
      })

      africanMarkersRef.current.push(originMarker)

      const midLat = (originCoords.lat + country.coordinates.lat) / 2
      const midLng = (originCoords.lng + country.coordinates.lng) / 2
      const curveLat = midLat + (country.coordinates.lng - originCoords.lng) * 0.1
      const curveLng = midLng - (country.coordinates.lat - originCoords.lat) * 0.1

      const arcPath = L.polyline(
        [
          [originCoords.lat, originCoords.lng],
          [curveLat, curveLng],
          [country.coordinates.lat, country.coordinates.lng],
        ],
        {
          color: "#10b981",
          weight: 2,
          opacity: 0.7,
          className: "connection-arc",
          smoothFactor: 3,
        }
      ).addTo(map)

      arcsRef.current.push(arcPath)
    })

    map.flyTo([country.coordinates.lat, country.coordinates.lng], 4, {
      animate: true,
      duration: 1.5,
    })

    popupTimeoutRef.current = setTimeout(() => {
      marker.openPopup()
    }, 1000)

    return () => {
      if (popupTimeoutRef.current) {
        clearTimeout(popupTimeoutRef.current)
        popupTimeoutRef.current = null
      }
    }
  }, [isMapLoaded, selectedCountry, filteredCountries])

  return (
    <div className="relative flex-1 bg-background overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />

      {/* Empty state — nothing matches the search/filters */}
      {isMapLoaded && filteredCountries.length === 0 && (
        <div className="pointer-events-none absolute inset-0 z-[800] flex items-center justify-center px-6">
          <div className="glass-panel rounded-xl px-8 py-6 text-center max-w-sm">
            <p className="overline mb-2">No Matches</p>
            <p className="text-sm font-medium text-foreground mb-1">
              {searchQuery ? `No countries match "${searchQuery}"` : "No countries match these filters"}
            </p>
            <p className="text-xs text-muted-foreground">
              Try a different search term or clear the filters above
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
