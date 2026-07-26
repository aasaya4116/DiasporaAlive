import "server-only"
import Anthropic from "@anthropic-ai/sdk"
import { countryProfiles } from "@/lib/country-profiles"

// Constrained selection over our curated dataset — Haiku 4.5 is plenty capable
// and cheap; no thinking needed. Model choice confirmed against claude-api ref.
const MODEL = "claude-haiku-4-5"

const COUNTRY_IDS = countryProfiles.map((c) => c.id)

// A compact, token-lean description of the collection — the AI's entire world.
function groundingContext() {
  return countryProfiles
    .map((c) => {
      const origins = c.africanOrigins?.join(", ") || "various African regions"
      const themes = c.culturalAspects?.length
        ? c.culturalAspects.map((a) => a.category).join(", ")
        : c.culturalHighlights
            .slice(0, 3)
            .map((h) => h.title)
            .join("; ")
      return `- ${c.name} (id: ${c.id}) — ${c.region}. African origins: ${origins}. Themes: ${themes}.`
    })
    .join("\n")
}

const SYSTEM_PROMPT = `You are a scholarly guide to the African diaspora for DiasporaAlive, an educational research resource. A visitor describes a theme, era, or cultural interest, and you curate a short guided journey through the places in our collection where that thread runs deepest.

You are NOT a travel planner. Never mention logistics, timing, cost, transport, itineraries, or bookings. These are real living cultures, but your purpose is to help people understand history and cultural connections — not to plan a trip.

Our collection covers ONLY these ${countryProfiles.length} countries:
${groundingContext()}

Rules:
- Choose 3 to 6 countries from the collection that best fit the visitor's interest, ordered as a coherent journey (by region or historical sequence).
- Each stop's "connection" is one sentence on WHY this place matters to their interest — the historical or cultural thread that links it. Never activities or things to do.
- The "intro" is 2-3 sentences establishing the throughline of the journey.
- If the interest centers on a place or theme the collection does not cover well (a country we don't include, or the African origin regions themselves), acknowledge that honestly in the intro and offer the closest matches we do have. Never invent places outside the collection.`

export interface TraceStop {
  id: string
  connection: string
}

export interface TraceResult {
  intro: string
  stops: TraceStop[]
}

const client = new Anthropic()

export async function traceJourney(query: string): Promise<TraceResult> {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: query }],
    output_config: {
      format: {
        type: "json_schema",
        schema: {
          type: "object",
          properties: {
            intro: { type: "string" },
            stops: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  // enum makes it structurally impossible to return an off-collection id
                  id: { type: "string", enum: COUNTRY_IDS },
                  connection: { type: "string" },
                },
                required: ["id", "connection"],
                additionalProperties: false,
              },
            },
          },
          required: ["intro", "stops"],
          additionalProperties: false,
        },
      },
    },
  })

  const textBlock = response.content.find((b): b is Anthropic.TextBlock => b.type === "text")
  const parsed = JSON.parse(textBlock?.text ?? "{}") as TraceResult

  // Defense in depth: drop anything not in the collection, in case the schema ever loosens.
  const valid = new Set(COUNTRY_IDS)
  return {
    intro: parsed.intro ?? "",
    stops: (parsed.stops ?? []).filter((s) => valid.has(s.id)),
  }
}
