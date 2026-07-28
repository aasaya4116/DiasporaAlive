import { NextResponse } from "next/server"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { traceJourney } from "@/lib/trace"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// 8 traces per minute per IP. Only active when Upstash is configured; a limiter
// error never blocks a real request (fail open) so an outage can't break the feature.
const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(8, "60 s"),
        prefix: "trace",
      })
    : null

export async function POST(req: Request) {
  if (ratelimit) {
    try {
      const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous"
      const { success } = await ratelimit.limit(ip)
      if (!success) {
        return NextResponse.json(
          { error: "You've made a lot of requests — give it a minute and try again." },
          { status: 429 },
        )
      }
    } catch (err) {
      console.error("[/api/trace] ratelimit error (allowing request):", err)
    }
  }

  let query = ""
  try {
    const body = await req.json()
    if (typeof body?.query === "string") query = body.query.trim()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  if (!query) {
    return NextResponse.json({ error: "Missing 'query'" }, { status: 400 })
  }

  try {
    const result = await traceJourney(query)
    return NextResponse.json(result)
  } catch (err) {
    console.error("[/api/trace] failed:", err)
    return NextResponse.json({ error: "Failed to trace the journey" }, { status: 500 })
  }
}
