"use client"

import { useEffect, useRef, useState } from "react"
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

const AFRICA_CENTER = { lat: 0, lng: 20 }

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
  "dominican republic": "do",
  italy: "it",
  "puerto rico": "pr",
  peru: "pe",
  canada: "ca",
  spain: "es",
  ecuador: "ec",
  "trinidad and tobago": "tt",
}

export function MapView({ selectedLocation, onLocationSelect, filters, searchQuery, highlightedCountry }: MapViewProps) {
  const mapRef = useRef<any>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const arcsRef = useRef<any[]>([])
  const africaLayerRef = useRef<any>(null)
  const africanMarkersRef = useRef<any[]>([])
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const selectedCountry = selectedLocation === "new-orleans" ? "usa" : selectedLocation

  const filteredCountries = countryProfiles.filter((country) => {
    // Search query filter
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

    // Filter bar category filter
    if (filters && filters.length > 0) {
      const matchesFilter = filters.some((filterId) => {
        const keywords: Record<string, string[]> = {
          music: ["music", "dance", "rhythm", "samba", "song", "drum", "instrument", "jazz", "tempo", "bomba", "rumba"],
          food: ["food", "cuisine", "dish", "cook", "recipe", "bean", "cacao", "sugar", "coffee", "taste", "pastry"],
          religion: ["religion", "spiritual", "deity", "church", "god", "catholic", "candomble", "vodou", "santeria", "faith", "shaman"],
          language: ["language", "speech", "creole", "patois", "french", "spanish", "english", "speak", "dialect"],
          festivals: ["festival", "carnival", "celebration", "parade", "holiday", "event", "commemorating", "gathering"],
          sites: ["site", "monument", "fortress", "museum", "historical", "building", "cemetery", "landmark", "park"],
        }
        const activeKeywords = keywords[filterId] || [filterId]
        
        const inHistory = activeKeywords.some((keyword) => country.history.toLowerCase().includes(keyword))
        const inHighlights = country.culturalHighlights.some((h) => 
          activeKeywords.some((keyword) => h.title.toLowerCase().includes(keyword) || h.description.toLowerCase().includes(keyword))
        )
        return inHistory || inHighlights
      })
      if (!matchesFilter) {
        return false
      }
    }

    return true
  })

  useEffect(() => {
    if (typeof window !== "undefined" && !mapInstanceRef.current) {
      import("leaflet").then((L) => {
        if (mapRef.current && !mapInstanceRef.current) {
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

          mapInstanceRef.current = map
          setIsMapLoaded(true)

          const style = document.createElement("style")
          style.textContent = `
            .leaflet-container {
              background: #0a0e1a !important;
            }
            .leaflet-popup-content-wrapper {
              background: rgba(15, 23, 42, 0.95) !important;
              backdrop-filter: blur(24px);
              border: 1px solid rgba(16, 185, 129, 0.3) !important;
              border-radius: 1rem !important;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(16, 185, 129, 0.2) !important;
              padding: 0 !important;
            }
            .leaflet-popup-content {
              color: #e2e8f0 !important;
              margin: 0 !important;
              min-width: 280px;
            }
            .leaflet-popup-tip {
              background: rgba(15, 23, 42, 0.95) !important;
              border: 1px solid rgba(16, 185, 129, 0.3) !important;
            }
            .leaflet-control-zoom {
              border: 1px solid rgba(16, 185, 129, 0.3) !important;
              border-radius: 0.75rem !important;
              overflow: hidden;
              box-shadow: 0 0 20px rgba(16, 185, 129, 0.2) !important;
            }
            .leaflet-control-zoom a {
              background: rgba(15, 23, 42, 0.9) !important;
              color: #10b981 !important;
              border-bottom: 1px solid rgba(16, 185, 129, 0.2) !important;
              transition: all 0.2s ease;
            }
            .leaflet-control-zoom a:hover {
              background: rgba(16, 185, 129, 0.2) !important;
              transform: scale(0.96);
            }
            .connection-arc {
              stroke: #10b981;
              stroke-width: 2;
              fill: none;
              opacity: 0;
              stroke-dasharray: 1000;
              stroke-dashoffset: 1000;
              animation: drawArc 2s ease-out forwards, pulseArc 2s ease-in-out infinite 2s;
            }
            @keyframes drawArc {
              to {
                stroke-dashoffset: 0;
                opacity: 0.7;
              }
            }
            @keyframes pulseArc {
              0%, 100% {
                opacity: 0.7;
                stroke-width: 2;
              }
              50% {
                opacity: 1;
                stroke-width: 3;
              }
            }
            .african-origin-marker {
              animation: originPulse 2s ease-in-out infinite;
            }
            @keyframes originPulse {
              0%, 100% {
                transform: scale(1);
                opacity: 0.6;
              }
              50% {
                transform: scale(1.2);
                opacity: 1;
              }
            }
          `
          document.head.appendChild(style)
        }
      })
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (isMapLoaded && mapInstanceRef.current) {
      import("leaflet").then((L) => {
        markersRef.current.forEach((marker) => marker.remove())
        arcsRef.current.forEach((arc) => arc.remove())
        africanMarkersRef.current.forEach((marker) => marker.remove())
        markersRef.current = []
        arcsRef.current = []
        africanMarkersRef.current = []

        filteredCountries.forEach((country) => {
          const isHighlighted = highlightedCountry === country.id
          const isSelected = selectedCountry === country.id

          const iconHtml = `
            <div class="relative flex items-center justify-center transition-all duration-200 ${
              isHighlighted ? "scale-125" : "scale-100"
            }">
              <div class="${
                isSelected
                  ? "w-6 h-6 bg-[#10b981] rounded-full shadow-[0_0_25px_rgba(16,185,129,0.9)] border-2 border-[#10b981]"
                  : isHighlighted
                    ? "w-5 h-5 bg-[#10b981] rounded-full shadow-[0_0_20px_rgba(16,185,129,0.7)] border border-[#10b981]"
                    : "w-4 h-4 bg-[#10b981] rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"
              }"></div>
            </div>
          `

          const customIcon = L.divIcon({
            html: iconHtml,
            className: "custom-marker-icon",
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          })

          if (!country.coordinates || typeof country.coordinates.lat !== 'number' || typeof country.coordinates.lng !== 'number') {
            return
          }

          const marker = L.marker([country.coordinates.lat, country.coordinates.lng], {
            icon: customIcon,
          }).addTo(mapInstanceRef.current)

          const origins = Array.isArray(country.africanOrigins)
            ? country.africanOrigins.slice(0, 3).join(", ")
            : "Various African regions"
          const historicSites = country.culturalHighlights?.length || 0
          const flagCode = countryFlags[country.id] || "world"

          const popupContent = `
            <div class="p-5 w-80">
              <button class="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors" onclick="this.closest('.leaflet-popup').remove()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
                  <img src="https://flagcdn.com/w40/${flagCode}.png" alt="${country.name} flag" class="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 class="text-xl font-bold text-white">${country.name}</h3>
                  <p class="text-xs text-slate-400">African diaspora population</p>
                </div>
              </div>
              
              <div class="mb-4">
                <div class="text-4xl font-bold text-white mb-1">
                  ${(country.population / 1000000).toFixed(1)}M
                  <span class="text-lg font-normal text-slate-400">people</span>
                </div>
                <p class="text-xs text-slate-400">(of African descent)</p>
              </div>
              
              <div class="border-t border-slate-700 pt-4 space-y-3 mb-4">
                <div class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-[#10b981] mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  <div class="flex-1">
                    <p class="text-xs text-slate-400 mb-0.5">Top origins:</p>
                    <p class="text-sm text-white font-medium">${origins}</p>
                  </div>
                </div>
                
                <div class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-[#10b981] mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <div class="flex-1">
                    <p class="text-xs text-slate-400 mb-0.5">Historic sites:</p>
                    <p class="text-sm text-white font-medium">${historicSites} locations</p>
                  </div>
                </div>
              </div>
              
              <button 
                onclick="window.location.href='/country/${country.id}'"
                class="w-full py-3 px-4 bg-[#10b981] hover:bg-[#059669] text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                Explore country
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          `

          marker.bindPopup(popupContent, {
            maxWidth: 320,
            className: "country-info-popup",
            closeButton: false,
          })

          marker.on("click", () => {
            const locId = country.id === "usa" ? "new-orleans" : country.id
            onLocationSelect(locId)
          })

          if (isSelected) {
            const origins = Array.isArray(country.africanOrigins) ? country.africanOrigins : []
            origins.forEach((origin: string) => {
              const originCoords = AFRICAN_ORIGINS[origin]
              if (originCoords) {
                const originIconHtml = `
                  <div class="african-origin-marker">
                    <div class="w-3 h-3 bg-yellow-500 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.8)] border border-yellow-400"></div>
                  </div>
                `

                const originIcon = L.divIcon({
                  html: originIconHtml,
                  className: "african-origin-icon",
                  iconSize: [12, 12],
                  iconAnchor: [6, 6],
                })

                const originMarker = L.marker([originCoords.lat, originCoords.lng], {
                  icon: originIcon,
                }).addTo(mapInstanceRef.current)

                originMarker.bindPopup(`<div class="p-2 text-white font-semibold">${origin}</div>`, {
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
                  },
                ).addTo(mapInstanceRef.current)

                arcsRef.current.push(arcPath)
              }
            })

            mapInstanceRef.current.flyTo([country.coordinates.lat, country.coordinates.lng], 4, {
              animate: true,
              duration: 1.5,
            })
            
            setTimeout(() => {
              marker.openPopup()
            }, 1000)
          }

          markersRef.current.push(marker)
        })
      })
    }
  }, [isMapLoaded, filteredCountries, highlightedCountry, selectedCountry])

  return (
    <div className="relative flex-1 bg-[#0a0e1a] overflow-hidden">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <div ref={mapRef} className="w-full h-full" />
    </div>
  )
}
