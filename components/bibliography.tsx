import { sources } from "@/lib/sources"

export function Bibliography({ ids }: { ids: string[] }) {
  const items = ids.map((id) => sources[id]).filter(Boolean)
  if (items.length === 0) return null

  return (
    <section className="mb-12">
      <span className="overline mb-3 block">Sources</span>
      <h2 className="mb-6 text-2xl md:text-3xl font-bold tracking-tight text-foreground">Bibliography</h2>
      <ol className="space-y-3">
        {items.map((s) => (
          <li key={s.id} className="text-sm leading-relaxed text-muted-foreground">
            {s.authors}. <span className="text-foreground">{s.title}</span>. {s.publisher}, {s.year}.
            {s.url && (
              <>
                {" "}
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold underline underline-offset-2 hover:text-gold-strong"
                >
                  Link
                </a>
                {s.accessed && <span className="text-ink-3"> · accessed {s.accessed}</span>}
              </>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
