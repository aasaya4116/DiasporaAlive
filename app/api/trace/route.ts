import { NextResponse } from "next/server"
import { traceJourney } from "@/lib/trace"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
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
