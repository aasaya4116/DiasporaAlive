import { countryProfiles } from "@/lib/country-profiles"
import { COUNTRY_FLAG } from "@/lib/flags"

const items = countryProfiles.map((c) => ({ id: c.id, name: c.name, flag: COUNTRY_FLAG[c.id] }))

export function CountryMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-line-subtle bg-surface-1 py-4">
      {/* Track is duplicated so translateX(-50%) loops seamlessly */}
      <div className="flex w-max items-center gap-8 whitespace-nowrap animate-marquee motion-reduce:animate-none">
        {[...items, ...items].map((c, i) => (
          <span key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground" aria-hidden={i >= items.length}>
            <span className="text-base leading-none">{c.flag}</span>
            <span>{c.name}</span>
            <span className="text-gold/70">✦</span>
          </span>
        ))}
      </div>
      {/* Soft edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface-1 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface-1 to-transparent" />
    </div>
  )
}
