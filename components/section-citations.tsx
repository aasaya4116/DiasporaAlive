import { sources } from "@/lib/sources"
import type { ContentSection } from "@/lib/topics"

export function SectionCitations({ citations }: { citations?: ContentSection["citations"] }) {
  if (!citations?.length) return null

  return (
    <div className="mt-4 border-l-2 border-gold/30 pl-3 text-xs leading-relaxed text-ink-3">
      <span className="font-semibold uppercase tracking-wider text-muted-foreground">Source: </span>
      {citations.map((citation, index) => {
        const source = sources[citation.sourceId]
        if (!source) return null
        return (
          <span key={`${citation.sourceId}-${citation.locator ?? index}`}>
            {index > 0 ? "; " : ""}
            {source.authors}, <cite>{source.title}</cite>
            {citation.locator ? `, ${citation.locator}` : ""}
          </span>
        )
      })}
    </div>
  )
}
