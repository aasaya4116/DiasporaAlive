"use client"

import { Globe, ChevronDown, Search, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { countryProfiles, type CountryRegion } from "@/lib/country-profiles"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  onCountryHover?: (countryId: string | null) => void
  onSearch?: (query: string) => void
}

const navLinks = [
  { id: "map", label: "Map", href: "#map-section" },
  { id: "timeline", label: "Timeline", href: "/timeline" },
  { id: "stories", label: "Stories", href: "/stories" },
  { id: "news", label: "News", href: "/news" },
  { id: "plan", label: "Trip Planner", href: "/plan" },
]

const REGION_ORDER: CountryRegion[] = ["Americas", "Caribbean", "Europe"]

const regionGroups = REGION_ORDER.map((region) => ({
  region,
  countries: countryProfiles.filter((c) => c.region === region),
}))

export function Sidebar({ activeSection, onSectionChange, onCountryHover, onSearch }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isCountriesOpen, setIsCountriesOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Works from any page: smooth-scroll on home, navigate home otherwise
  const goToMap = () => {
    onSectionChange("map")
    if (pathname === "/") {
      document.getElementById("map-section")?.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push("/#map-section")
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    onSearch?.(value)
  }

  return (
    <>
      {/* Floating Glass Navigation */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "glass-nav-scrolled" : "glass-nav"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(200,169,110,0.4)] transition-shadow">
              <Globe className="w-4 h-4 text-background" />
            </div>
            <span className="text-lg font-bold text-foreground">Diaspora Alive</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.id} className="relative">
                {link.id === "map" ? (
                  <button
                    onClick={goToMap}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                      activeSection === link.id
                        ? "text-gold bg-gold/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                      "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Countries dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCountriesOpen(!isCountriesOpen)}
                className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200"
              >
                Countries
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200",
                    isCountriesOpen ? "rotate-180" : ""
                  )}
                />
              </button>

              {isCountriesOpen && (
                <div className="absolute top-full mt-2 right-0 w-64 max-h-[70vh] overflow-y-auto glass-panel rounded-2xl p-4 shadow-2xl">
                  {regionGroups.map(({ region, countries }) => (
                    <div key={region} className="mb-3 last:mb-0">
                      <p className="overline mb-1.5 px-2">{region}</p>
                      <div className="space-y-0.5">
                        {countries.map((country) => (
                          <Link
                            key={country.id}
                            href={`/country/${country.id}`}
                            onMouseEnter={() => onCountryHover?.(country.id)}
                            onMouseLeave={() => onCountryHover?.(null)}
                            onClick={() => setIsCountriesOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all duration-200"
                          >
                            {country.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right side — Search + Mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Search (desktop) */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-48 pl-9 pr-4 py-2 text-sm bg-white/5 border border-white/10 rounded-full focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/40 text-foreground placeholder:text-muted-foreground/40 transition-all"
              />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6 p-8">
            {/* Mobile Search */}
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/50" />
              <input
                type="search"
                placeholder="Search countries, cultures..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-sm bg-white/5 border border-white/10 rounded-full focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/40 text-foreground placeholder:text-muted-foreground/40"
              />
            </div>

            {/* Mobile Nav Links */}
            {navLinks.map((link, i) => (
              <div
                key={link.id}
                style={{ animation: `fadeInUp 0.4s ease-out ${i * 0.08}s both` }}
              >
                {link.id === "map" ? (
                  <button
                    onClick={() => {
                      setIsMobileOpen(false)
                      goToMap()
                    }}
                    className="text-2xl font-semibold text-foreground hover:text-gold transition-colors"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-2xl font-semibold text-foreground hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile Countries Section */}
            <div
              className="w-full max-w-sm mt-4"
              style={{ animation: `fadeInUp 0.4s ease-out ${navLinks.length * 0.08}s both` }}
            >
              <p className="overline mb-3 text-center">Country Profiles</p>
              <div className="grid max-h-[40vh] grid-cols-2 gap-2 overflow-y-auto">
                {countryProfiles.map((country) => (
                  <Link
                    key={country.id}
                    href={`/country/${country.id}`}
                    onClick={() => setIsMobileOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm text-center text-muted-foreground hover:text-gold hover:bg-gold/10 border border-white/5 transition-all"
                  >
                    {country.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close countries dropdown */}
      {isCountriesOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsCountriesOpen(false)}
        />
      )}
    </>
  )
}
