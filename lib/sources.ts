// Shared citation store. Country profiles and topics reference sources by id
// and a Bibliography is rendered from these. Keep entries factual and complete.

export interface Source {
  id: string
  authors: string
  title: string
  publisher: string
  year: number | string
  url?: string
  accessed?: string
}

export const sources: Record<string, Source> = {
  "heuman-2013": {
    id: "heuman-2013",
    authors: "Heuman, Gad",
    title: "The Caribbean: A Brief History",
    publisher: "Bloomsbury (2nd ed.)",
    year: 2013,
  },
  "palmie-scarano-2013": {
    id: "palmie-scarano-2013",
    authors: "Palmié, Stephan, and Francisco A. Scarano (eds.)",
    title: "The Caribbean: A History of the Region and Its Peoples",
    publisher: "University of Chicago Press",
    year: 2013,
  },
  "blackburn-2013": {
    id: "blackburn-2013",
    authors: "Blackburn, Robin",
    title: "The American Crucible: Slavery, Emancipation and Human Rights",
    publisher: "Verso",
    year: 2013,
  },
  "mpi-caribbean-2025": {
    id: "mpi-caribbean-2025",
    authors: "Rutland, Allison, and Jeanne Batalova",
    title: "Caribbean Immigrants in the United States",
    publisher: "Migration Policy Institute",
    year: 2025,
    url: "https://www.migrationpolicy.org/article/caribbean-immigrants-united-states",
    accessed: "2026-01-21",
  },
  "aic-black-immigrants-2024": {
    id: "aic-black-immigrants-2024",
    authors: "American Immigration Council",
    title: "Data Snapshot: The Number of Black Immigrants in the US Continues to Rise",
    publisher: "American Immigration Council",
    year: 2024,
    url: "https://www.americanimmigrationcouncil.org/blog/data-number-of-black-immigrants-in-the-us/",
    accessed: "2026-01-21",
  },
}
