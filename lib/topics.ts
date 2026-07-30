// Cross-cutting research articles that span multiple countries or concepts.
// Bodies are Markdown. `countries` and `relatedTopics` create the research web;
// `sources` reference lib/sources.ts. This is a starter entry — expand/verify
// the prose with your own research.

import type { MediaItem } from "@/lib/media"

export interface ContentSection {
  heading: string
  body: string
}

export interface Topic {
  id: string
  title: string
  summary: string
  sections: ContentSection[]
  countries: string[]
  relatedTopics?: string[]
  sources?: string[]
  media?: MediaItem[]
  author?: string
  year?: number | string
}

export const topics: Topic[] = [
  {
    id: "afro-caribbeans",
    title: "Afro-Caribbeans",
    summary:
      "People of African descent across the Caribbean, whose Creole cultures fused African, European, and Indigenous traditions under the pressures of the plantation system — and who later reshaped the cities and politics of the wider Americas through migration.",
    author: "Diaspora Alive",
    year: 2026,
    countries: ["jamaica", "haiti", "cuba", "dominican-republic", "trinidad-tobago", "puerto-rico", "usa"],
    sources: ["heuman-2013", "palmie-scarano-2013", "blackburn-2013", "mpi-caribbean-2025", "aic-black-immigrants-2024"],
    sections: [
      {
        heading: "Origins in the Plantation System",
        body: "The Caribbean was the first and largest destination of the transatlantic slave trade in the Americas. Across roughly three centuries, the great majority of Africans carried across the Atlantic were sold to work the sugar estates of the islands — far more than were ever brought to the North American mainland. On most islands, enslaved Africans vastly outnumbered European colonists and the surviving Indigenous population, and out of that demographic reality they forged new **Creole cultures**: distinct on each island, but everywhere weaving African languages, religions, foodways, and musical forms together with European and Indigenous elements. The brutal death rate on the plantations meant a constant flow of new arrivals from Africa, which kept those African roots unusually strong.",
      },
      {
        heading: "Colorism and the \"Shading\" System",
        body: "Centuries of bondage left a social order that outlasted slavery itself. As emancipation spread across the nineteenth century, free Caribbean societies organized themselves along rigid lines of color and reputed ancestry — a hierarchy sometimes called *shading*, in which lighter skin and claimed European descent conferred status. Many people were pressed to downplay their African heritage. This internal racism shaped relations between islands as well as within them: the tense history between the Dominican Republic and Haiti on a single shared island is one of the starkest examples of how colonial value systems were absorbed and turned inward.",
      },
      {
        heading: "A New Black Consciousness",
        body: "By the twentieth century a countercurrent had taken hold. Ideas of racial pride and economic justice — carried in part by the Jamaican-born organizer **Marcus Garvey**, and later expressed in the **Rastafari** movement — challenged the old colonial order. After the Second World War, Afro-Caribbean workers and intellectuals built labor unions that, by the 1960s, matured into Black-led political parties and independence movements across the region, from Jamaica to Trinidad.",
      },
      {
        heading: "Migration to the United States",
        body: "Afro-Caribbean migration to North America predates the American Revolution, but its great wave came in the twentieth century, accelerating after 1945. Migrants included Cuban and Haitian asylum seekers as well as workers who settled into established Caribbean-American communities in eastern cities. Many light-skinned migrants who had been treated as white at home encountered US racial categories for the first time. By 2019, the Caribbean was the single largest origin region for Black immigrants to the United States — with Jamaica and Haiti the two largest sources — and communities such as Miami's Cuban enclaves and New York's Caribbean neighborhoods reshaped the cultural and political life of the country.",
      },
    ],
  },
]

export function getTopic(id: string) {
  return topics.find((t) => t.id === id)
}

export function topicsForCountry(countryId: string) {
  return topics.filter((t) => t.countries.includes(countryId))
}
