import { Play } from "lucide-react"
import { type MediaItem, youtubeId } from "@/lib/media"

const PLATFORM_LABEL: Record<MediaItem["platform"], string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
  other: "Video",
}

export function MediaSection({ items }: { items?: MediaItem[] }) {
  if (!items || items.length === 0) return null

  return (
    <section className="mb-12">
      <span className="overline mb-3 block">Watch</span>
      <h2 className="mb-6 text-2xl md:text-3xl font-bold tracking-tight text-foreground">Media</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((item, i) => {
          const ytId = youtubeId(item.url)
          return (
            <div key={i} className="overflow-hidden rounded-lg border border-border bg-card">
              <div className="relative aspect-video w-full bg-surface-2">
                {ytId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${ytId}`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 h-full w-full"
                  />
                ) : (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch: ${item.title}`}
                    className="group absolute inset-0 flex items-center justify-center overflow-hidden"
                  >
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(200,169,110,0.16),transparent_62%)]" />
                    )}
                    <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gold text-background shadow-lg transition group-hover:scale-105">
                      <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
                    </span>
                  </a>
                )}
              </div>
              <div className="p-4">
                <span className="mb-1.5 inline-block rounded-full border border-line px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {PLATFORM_LABEL[item.platform]}
                </span>
                <h3 className="font-semibold text-foreground">
                  {ytId ? (
                    item.title
                  ) : (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-gold"
                    >
                      {item.title}
                    </a>
                  )}
                </h3>
                {item.creator && <p className="text-xs text-muted-foreground">{item.creator}</p>}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
