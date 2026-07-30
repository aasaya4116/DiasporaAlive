// Videos attached to countries or topics. YouTube plays inline; everything else
// (Instagram reels, TikTok, …) renders an on-brand link-out card.

export interface MediaItem {
  title: string
  url: string
  platform: "instagram" | "youtube" | "tiktok" | "other"
  creator?: string
  thumbnail?: string // path under /public or a remote image
}

// Extract a YouTube video id from common URL shapes; null if not YouTube.
export function youtubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)
  return match ? match[1] : null
}
