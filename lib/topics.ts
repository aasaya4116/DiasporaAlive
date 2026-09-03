// Cross-cutting research articles that span multiple countries or concepts.
// Bodies are Markdown. `countries` and `relatedTopics` create the research web;
// `sources` reference lib/sources.ts. This is a starter entry — expand/verify
// the prose with your own research.

import type { MediaItem } from "@/lib/media"

export interface ContentSection {
  heading: string
  body: string
  citations?: Array<{
    sourceId: string
    locator?: string
  }>
}

export interface TopicMetric {
  value: string
  label: string
  source: string
}

export interface TopicCostOfSugar {
  introduction: string
  wealth: TopicMetric[]
  humanCost: TopicMetric[]
  note: string
}

export interface TopicStoryCard {
  id: string
  eyebrow: string
  title: string
  body: string
}

export interface TopicChapter {
  id: string
  number: string
  title: string
  period: string
  eyebrow: string
  summary: string
  sectionIndexes: number[]
  storyCards?: TopicStoryCard[]
}

export interface TopicExhibit {
  duration: string
  primaryCountryId: string
  costOfSugar: TopicCostOfSugar
  chapters: TopicChapter[]
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
  exhibit?: TopicExhibit
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
    relatedTopics: ["haitian-revolution"],
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
  {
    id: "haitian-revolution",
    title: "The Haitian Revolution",
    summary:
      "How enslaved and free people in the French Caribbean turned the upheavals of the French Revolution into emancipation, defeated Napoleon's expedition, and founded Haiti—the first independent Black republic.",
    author: "Diaspora Alive",
    year: 2026,
    countries: ["haiti", "dominican-republic", "france", "usa", "cuba", "jamaica"],
    relatedTopics: ["afro-caribbeans"],
    sources: ["dubois-garrigus-2017"],
    exhibit: {
      duration: "7-minute overview",
      primaryCountryId: "haiti",
      costOfSugar: {
        introduction:
          "Saint-Domingue's wealth and its human destruction were not separate stories. They were the same system viewed from opposite sides.",
        wealth: [
          { value: "40%", label: "of Europe's sugar came from Saint-Domingue", source: "p. 2" },
          { value: "60%", label: "of Europe's coffee came from the colony", source: "p. 2" },
        ],
        humanCost: [
          { value: "~500K", label: "enslaved people lived in Saint-Domingue by 1790", source: "p. 7" },
          { value: "5–10%", label: "of enslaved plantation workers died each year", source: "p. 7" },
          { value: "⅓–½", label: "of survivors of the Atlantic crossing died within several years of arrival", source: "p. 2" },
          { value: "Up to ⅔", label: "of the enslaved population was African-born", source: "p. 7" },
        ],
        note:
          "These are historical estimates. They reveal the scale and operating logic of the plantation system, but no measurement can contain the individual lives, violence, and loss behind the totals.",
      },
      chapters: [
        {
          id: "before-the-revolution",
          number: "01",
          title: "Before the Revolution",
          period: "Before 1791",
          eyebrow: "The conditions",
          summary:
            "The wealth, violence, African knowledge, and political divisions that made Saint-Domingue both extraordinarily profitable and profoundly unstable.",
          sectionIndexes: [0, 1],
        },
        {
          id: "revolution-and-emancipation",
          number: "02",
          title: "Revolution & Emancipation",
          period: "1791–1801",
          eyebrow: "The transformation",
          summary:
            "A coordinated uprising forced revolutionary France to confront whether liberty and citizenship could coexist with colonial slavery.",
          sectionIndexes: [2, 3, 4],
        },
        {
          id: "independence-and-legacy",
          number: "03",
          title: "Independence & Legacy",
          period: "1802–present",
          eyebrow: "The victory and its reach",
          summary:
            "France's defeat created Haiti and reshaped migration, diplomacy, territorial expansion, and the politics of slavery across the Atlantic.",
          sectionIndexes: [5, 6, 7],
          storyCards: [
            {
              id: "ideas-and-fear",
              eyebrow: "Ideas cross the Atlantic",
              title: "Inspiration and fear",
              body: "News from Saint-Domingue moved through American ports and newspapers. The revolution offered enslaved people proof that plantation slavery could be defeated, while officials and slaveholders feared that its example would spread through the American South.",
            },
            {
              id: "refugee-movements",
              eyebrow: "1791–1810",
              title: "Refugees reshape American cities",
              body: "Successive migrations brought white planters, free people of color, and enslaved people from Saint-Domingue through Cuba and into Philadelphia, Charleston, New Orleans, and Louisiana. These arrivals altered local culture, labor, racial politics, and connections to the Caribbean.",
            },
            {
              id: "adams-and-jefferson",
              eyebrow: "Two American responses",
              title: "Adams, Jefferson, and Louverture",
              body: "John Adams supported commerce and cooperation with Toussaint Louverture, including American naval assistance during Louverture's conflict with André Rigaud. Thomas Jefferson viewed revolutionary Haiti as a danger to the plantation order and pursued diplomatic isolation after independence. The United States did not recognize Haiti until 1862.",
            },
            {
              id: "louisiana-purchase",
              eyebrow: "1803",
              title: "Haiti and the Louisiana Purchase",
              body: "Napoleon's military failure in Saint-Domingue helped convince him to abandon his wider American ambitions and sell Louisiana. The purchase expanded the United States dramatically—and opened new territory to the expansion of slavery.",
            },
          ],
        },
      ],
    },
    sections: [
      {
        heading: "The Plantation Colony Behind the Revolution",
        body: "Before it became Haiti, the French colony of Saint-Domingue was an engine of Atlantic wealth built on coerced labor. By the late eighteenth century it was the world's leading sugar producer and a major source of Europe's coffee, yet that prosperity depended on an extraordinarily violent plantation regime. Roughly half a million enslaved people lived in the colony by 1790, outnumbering white colonists by more than ten to one. Most had been born in Africa. People arriving from West and west-central Africa brought languages, spiritual practices, agricultural knowledge, political ideas, and military experience that shaped colonial life and later the revolution itself.",
        citations: [{ sourceId: "dubois-garrigus-2017", locator: "pp. 1–7" }],
      },
      {
        heading: "Resistance and a Fractured Colonial Order",
        body: "Saint-Domingue was divided long before the general uprising. Wealthy planters, poorer white colonists, royal officials, and free people of color pursued competing political and economic interests. Free people of color could own property and serve in colonial forces, but increasingly discriminatory laws denied them equal citizenship; their campaign for rights exposed the instability of the colony's racial order without always opposing slavery itself. Enslaved people also created connections across plantations through movement, spiritual gatherings, and resistance. Memories of the maroon leader Macandal and rumors that freedom had already been granted helped preserve the possibility of a different social order. By 1791, disputes over colonial autonomy, racial equality, and slavery had converged into a revolutionary crisis.",
        citations: [{ sourceId: "dubois-garrigus-2017", locator: "pp. 8–15" }],
      },
      {
        heading: "From Insurrection to Emancipation, 1791–1794",
        body: "The uprising that began in northern Saint-Domingue in August 1791 was not a spontaneous burst of disorder. Enslaved organizers coordinated attacks across plantations, challenged the colony's racial hierarchy, and forced revolutionary officials to confront a question France had tried to postpone: whether liberty and citizenship could exclude enslaved people and free people of color. The revolt also spread beyond Saint-Domingue, contributing to unrest in Martinique and Guadeloupe. By 1793, commissioners Léger-Félicité Sonthonax and Étienne Polverel proclaimed emancipation in Saint-Domingue; in February 1794, France's National Convention abolished slavery throughout the French colonies.",
        citations: [{ sourceId: "dubois-garrigus-2017", locator: "pp. 16–20" }],
      },
      {
        heading: "Armed Emancipation in the French Caribbean",
        body: "Emancipation became a military as well as a political project. In Guadeloupe, commissioner Victor Hugues armed formerly enslaved people and used their forces to recover the island from Britain. Yet revolutionary freedom remained uneven: slavery continued or was restored in several neighboring colonies, revealing the distance between universal declarations and colonial practice. The revolutions nevertheless created new political possibilities as formerly enslaved people claimed citizenship, military authority, and a stake in the societies they had built.",
        citations: [{ sourceId: "dubois-garrigus-2017", locator: "pp. 19–23" }],
      },
      {
        heading: "Toussaint Louverture and Revolutionary Government",
        body: "Toussaint Louverture rose from slavery to become Saint-Domingue's dominant political and military leader. His government defended emancipation and growing autonomy while attempting to restore export agriculture through regulated plantation labor. That contradiction—freedom secured through a disciplined plantation economy—produced conflict, including the struggle with André Rigaud in the south. Louverture's 1801 constitution asserted substantial self-government while stopping short of declaring independence from France.",
        citations: [{ sourceId: "dubois-garrigus-2017", locator: "pp. 22–27" }],
      },
      {
        heading: "Napoleon, War, and Haitian Independence",
        body: "Napoleon Bonaparte's government moved to reassert metropolitan control over the Caribbean and restore slavery where it could. A French expedition led by Charles-Victor-Emmanuel Leclerc reached Saint-Domingue in 1802. Louverture was arrested and deported to France, where he died in prison, but resistance continued—intensifying after France restored slavery in Guadeloupe. Jean-Jacques Dessalines and other leaders united forces against the expedition, defeated the French army, and declared the independence of Haiti on January 1, 1804.",
        citations: [{ sourceId: "dubois-garrigus-2017", locator: "pp. 27–30" }],
      },
      {
        heading: "The Haitian Revolution and the United States",
        body: "The United States was closely entangled with the revolution through commerce, migration, diplomacy, and slavery. News from Saint-Domingue inspired enslaved people and alarmed slaveholders. Refugees reached cities including Philadelphia, Charleston, and New Orleans, while American policy shifted from John Adams's cooperation with Toussaint Louverture to Thomas Jefferson's effort to isolate independent Haiti. France's defeat also helped produce the Louisiana Purchase, expanding the United States and creating new territory for the expansion of slavery.",
        citations: [{ sourceId: "dubois-garrigus-2017", locator: "pp. 25–26, 29" }],
      },
      {
        heading: "An Atlantic Revolution with an Unfinished Legacy",
        body: "The revolution transformed far more than one colony. Refugees carried people, capital, and knowledge to Cuba, Louisiana, and cities along the eastern United States. Fear of further slave revolts shaped American politics, while France's defeat helped clear the way for the Louisiana Purchase and the expansion of the United States—and, with it, the expansion of slavery. Haiti became a symbol of Black sovereignty and a source of inspiration for antislavery struggles, but foreign hostility and the indemnity imposed by France in 1825 burdened the new nation for generations. Its history remains both a national foundation and a universal claim: people once treated as property made freedom real for themselves.",
        citations: [{ sourceId: "dubois-garrigus-2017", locator: "pp. 25–31" }],
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
