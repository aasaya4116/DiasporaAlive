"use client"

import { Globe, ChevronDown, Search, Menu, X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { countryProfiles, type CountryRegion } from "@/lib/country-profiles"
import { COUNTRY_FLAG as FLAG } from "@/lib/flags"

interface SidebarProps {
  activeSection: string
  onSectionChange?: (section: string) => void
  onCountryHover?: (countryId: string | null) => void
  onSearch?: (query: string) => void
}

const navLinks = [
  { id: "map", label: "Map", href: "#map-section" },
  { id: "timeline", label: "Timeline", href: "/timeline" },
  { id: "stories", label: "Stories", href: "/stories" },
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

  // Route-derived active state so every page (not just the map) lights up
  const isActive = (link: (typeof navLinks)[number]) =>
    link.id === "map" ? pathname === "/" && activeSection === "map" : pathname.startsWith(link.href)

  // Works from any page: smooth-scroll on home, navigate home otherwise
  const goToMap = () => {
    onSectionChange?.("map")
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

  // Escape closes the countries mega-menu
  useEffect(() => {
    if (!isCountriesOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCountriesOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isCountriesOpen])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    onSearch?.(value)
  }

  const renderLink = (link: (typeof navLinks)[number]) => {
    const active = isActive(link)
    const cls = cn(
      "px-3.5 py-2 rounded-full text-sm font-medium transition-colors duration-200",
      active ? "text-gold bg-gold/10" : "text-muted-foreground hover:text-foreground"
    )
    return link.id === "map" ? (
      <button key={link.id} onClick={goToMap} className={cls}>
        {link.label}
      </button>
    ) : (
      <Link key={link.id} href={link.href} className={cls}>
        {link.label}
      </Link>
    )
  }

  return (
    <>
      {/* Floating Glass Navigation */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
          isScrolled ? "glass-nav-scrolled" : "glass-nav"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gold flex items-center justify-center transition-shadow group-hover:shadow-[0_0_20px_rgba(200,169,110,0.35)]">
              <Globe className="w-4 h-4 text-background" />
            </div>
            <span className="text-[17px] font-semibold tracking-[-0.01em] text-foreground">Diaspora Alive</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1.5">
            {renderLink(navLinks[0])}

            {/* Countries mega-menu */}
            <div className="relative">
              <button
                onClick={() => setIsCountriesOpen((o) => !o)}
                aria-expanded={isCountriesOpen}
                aria-haspopup="true"
                className={cn(
                  "flex items-center gap-1 px-3.5 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                  isCountriesOpen ? "text-gold bg-gold/10" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Countries
                <ChevronDown
                  className={cn("w-3.5 h-3.5 transition-transform duration-200", isCountriesOpen ? "rotate-180" : "")}
                />
              </button>

              {isCountriesOpen && (
                <div className="absolute right-0 top-full mt-2 w-[680px] max-w-[calc(100vw-2rem)] glass-panel rounded-2xl p-5 shadow-2xl">
                  <div className="grid grid-cols-3 gap-x-5 gap-y-1">
                    {regionGroups.map(({ region, countries }) => (
                      <div key={region}>
                        <p className="overline mb-2 px-2.5">{region}</p>
                        <div className="space-y-0.5">
                          {countries.map((country) => (
                            <Link
                              key={country.id}
                              href={`/country/${country.id}`}
                              onMouseEnter={() => onCountryHover?.(country.id)}
                              onMouseLeave={() => onCountryHover?.(null)}
                              onClick={() => setIsCountriesOpen(false)}
                              className="flex min-h-11 items-center gap-2.5 rounded-lg px-2.5 text-sm text-muted-foreground transition-colors hover:bg-gold/10 hover:text-gold"
                            >
                              <span className="text-base leading-none">{FLAG[country.id]}</span>
                              <span className="flex-1 truncate">{country.name}</span>
                              <span className="text-[11px] tabular-nums text-muted-foreground/60">
                                {country.percentage.toFixed(1)}%
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setIsCountriesOpen(false)
                      goToMap()
                    }}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
                  >
                    View all on the map
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {navLinks.slice(1).map(renderLink)}
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
                className="w-56 rounded-full border border-line bg-surface-2 py-2 pl-9 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-gold"
              />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileOpen((o) => !o)}
              aria-expanded={isMobileOpen}
              aria-label="Toggle menu"
              className="flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground md:hidden"
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
          <div className="relative z-10 h-full overflow-y-auto px-6 pb-[calc(env(safe-area-inset-bottom)+40px)] pt-[calc(env(safe-area-inset-top)+88px)]">
            <div className="mx-auto flex w-full max-w-sm flex-col gap-7">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/50" />
                <input
                  type="search"
                  placeholder="Search countries, cultures..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full rounded-full border border-line bg-surface-2 py-3 pl-12 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-gold"
                />
              </div>

              {/* Mobile Nav Links */}
              <div className="flex flex-col items-center gap-4">
                {navLinks.map((link, i) => {
                  const active = isActive(link)
                  const cls = cn(
                    "text-2xl font-semibold transition-colors",
                    active ? "text-gold" : "text-foreground hover:text-gold"
                  )
                  return (
                    <div key={link.id} style={{ animation: `fadeInUp 0.4s ease-out ${i * 0.06}s both` }}>
                      {link.id === "map" ? (
                        <button
                          onClick={() => {
                            setIsMobileOpen(false)
                            goToMap()
                          }}
                          className={cls}
                        >
                          {link.label}
                        </button>
                      ) : (
                        <Link href={link.href} onClick={() => setIsMobileOpen(false)} className={cls}>
                          {link.label}
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Mobile Countries — grouped by region */}
              <div>
                {regionGroups.map(({ region, countries }) => (
                  <div key={region} className="mb-5 last:mb-0">
                    <p className="overline mb-2">{region}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {countries.map((country) => (
                        <Link
                          key={country.id}
                          href={`/country/${country.id}`}
                          onClick={() => setIsMobileOpen(false)}
                          className="flex min-h-11 items-center gap-2 rounded-lg border border-line px-3 text-sm text-muted-foreground transition-colors hover:bg-gold/10 hover:text-gold"
                        >
                          <span className="text-base leading-none">{FLAG[country.id]}</span>
                          <span className="truncate">{country.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close countries mega-menu */}
      {isCountriesOpen && <div className="fixed inset-0 z-40" onClick={() => setIsCountriesOpen(false)} />}
    </>
  )
}
