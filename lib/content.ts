// Single source of truth for timeline / stories / news / resources content.
// Home previews render slices of these arrays; subpages render them in full.

export interface TimelineEvent {
  year: string
  title: string
  description: string
  region: string
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: "1500s",
    title: "Beginning of Transatlantic Slave Trade",
    description: "Portuguese traders establish first routes from West Africa to the Americas",
    region: "West Africa → Americas",
  },
  {
    year: "1619",
    title: "First Enslaved Africans in North America",
    description: "First documented arrival of enslaved Africans in English North America at Jamestown",
    region: "Angola → Virginia",
  },
  {
    year: "1791",
    title: "Haitian Revolution Begins",
    description: "Enslaved Africans in Saint-Domingue rise up, leading to first independent Black republic",
    region: "Haiti",
  },
  {
    year: "1834",
    title: "Abolition in British Empire",
    description: "Slavery abolished across British colonies, affecting Caribbean and other territories",
    region: "Caribbean & British Colonies",
  },
  {
    year: "1888",
    title: "Brazil Abolishes Slavery",
    description: "Last country in the Americas to abolish slavery, marking end of Atlantic slave trade era",
    region: "Brazil",
  },
  {
    year: "1960s",
    title: "African Independence Movements",
    description: "Wave of independence across African nations, strengthening diaspora connections",
    region: "Africa",
  },
]

export interface Story {
  id: string
  name: string
  location: string
  heritage: string
  excerpt: string
}

export const stories: Story[] = [
  {
    id: "1",
    name: "Maria Santos",
    location: "São Paulo, Brazil",
    heritage: "Angolan descent",
    excerpt:
      "Growing up in Salvador, I always felt the rhythm of Africa in our samba circles. It wasn't until I visited Luanda that I understood the depth of that connection...",
  },
  {
    id: "2",
    name: "Jean-Pierre Toussaint",
    location: "Port-au-Prince, Haiti",
    heritage: "Beninese & Congolese roots",
    excerpt:
      "The drums speak a language my ancestors taught us. Every Vodou ceremony is a conversation across centuries, a bridge between continents...",
  },
  {
    id: "3",
    name: "Keisha Williams",
    location: "New Orleans, USA",
    heritage: "West African heritage",
    excerpt:
      "When I tasted my grandmother's gumbo, I tasted centuries. The okra, the spices, the care—it all traced back to Nigeria. Food became my map home...",
  },
]

export interface NewsItem {
  id: string
  title: string
  excerpt: string
  category: string
  location: string
  date: string
  image: string
  link: string
}

export const newsCategories = ["All", "Cultural Events", "Festivals", "Exhibitions", "Research", "Community"]

export const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "Annual Afro-Brazilian Carnival Returns to Salvador",
    excerpt:
      "The largest street party celebrating African heritage kicks off with traditional Samba performances and cultural parades.",
    category: "Festivals",
    location: "Salvador, Brazil",
    date: "2024-02-10",
    image: "/carnival-dancers-colorful-costumes-brazil.jpg",
    link: "#",
  },
  {
    id: "2",
    title: "New Exhibition: Black British History at the V&A",
    excerpt:
      "Exploring 500 years of African and Caribbean contributions to British culture through art, fashion, and music.",
    category: "Exhibitions",
    location: "London, UK",
    date: "2024-01-15",
    image: "/museum-exhibition-african-art.jpg",
    link: "#",
  },
  {
    id: "3",
    title: "Bomba Workshop Series Launches in San Juan",
    excerpt:
      "Learn traditional Afro-Puerto Rican dance and drumming from master practitioners at the Don Rafael Cepeda School.",
    category: "Cultural Events",
    location: "San Juan, Puerto Rico",
    date: "2024-03-01",
    image: "/bomba-drums-puerto-rico-dance.jpg",
    link: "#",
  },
]

export interface Resource {
  title: string
  description: string
  type: "book" | "documentary" | "academic" | "website" | "video"
  url?: string
}

export const resources: Resource[] = [
  {
    title: "The African Diaspora: A History Through Culture",
    description: "Comprehensive academic text exploring cultural continuities across the Atlantic",
    type: "book",
  },
  {
    title: "Roots of Rhythm: African Music in the Americas",
    description: "Documentary series tracing musical traditions from West Africa to the Caribbean and Americas",
    type: "documentary",
  },
  {
    title: "Journal of African Diaspora Studies",
    description: "Peer-reviewed academic journal featuring latest research on diaspora communities",
    type: "academic",
  },
  {
    title: "African Heritage Sites Database",
    description: "Interactive database of museums, monuments, and cultural sites across diaspora regions",
    type: "website",
  },
]
