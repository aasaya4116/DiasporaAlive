export interface Location {
  id: string
  name: string
  country: string
  mapPosition: { x: number; y: number }
  imageUrl: string
  overview: string
  statistics: Array<{
    label: string
    value: string
    icon: "users" | "map" | "calendar"
  }>
  culturalAspects: Array<{
    category: "music" | "food" | "religion" | "language" | "festivals" | "sites"
    title: string
    description: string
    examples?: string[]
  }>
  africanOrigins: string[]
}

export const locations: Location[] = [
  {
    id: "brazil",
    name: "Brazil",
    country: "South America",
    mapPosition: { x: 550, y: 520 },
    imageUrl: "/brazilian-carnival-dancers-colorful-costumes.jpg",
    overview:
      "Brazil is home to the largest population of African descent outside of Africa, with profound cultural influences from nearly 5 million enslaved Africans brought during the colonial period. Afro-Brazilian culture has shaped the nation's identity through music, dance, religion, and cuisine.",
    statistics: [
      { label: "Afro-Brazilian Population", value: "~56% (120M people)", icon: "users" },
      { label: "Enslaved Africans Brought", value: "~5 million (1550-1888)", icon: "map" },
      { label: "Slavery Abolished", value: "May 13, 1888", icon: "calendar" },
    ],
    culturalAspects: [
      {
        category: "music",
        title: "Samba & Afro-Brazilian Rhythms",
        description:
          "Samba originated from Angolan semba dance and Yoruba rhythms, becoming Brazil's national music. The batucada drumming tradition maintains direct African connections.",
        examples: ["Samba", "Batucada", "Axé", "Forró"],
      },
      {
        category: "food",
        title: "Afro-Brazilian Cuisine",
        description:
          "Feijoada (black bean stew), acarajé (black-eyed pea fritters), and dendê palm oil are central to Brazilian food culture, all with African origins.",
        examples: ["Feijoada", "Acarajé", "Vatapá", "Moqueca"],
      },
      {
        category: "religion",
        title: "Candomblé & Umbanda",
        description:
          "Afro-Brazilian religions blending Yoruba, Fon, and Bantu spiritual traditions with elements of Catholicism, maintaining African deities (orixás) and practices.",
        examples: ["Candomblé", "Umbanda", "Batuque"],
      },
      {
        category: "festivals",
        title: "Carnival",
        description:
          "Rio Carnival is the world's largest festival, deeply influenced by African drumming, dance traditions, and spiritual celebrations brought by enslaved peoples.",
        examples: ["Rio Carnival", "Salvador Carnival", "Festa de Iemanjá"],
      },
    ],
    africanOrigins: ["Angola", "Nigeria (Yoruba)", "Benin", "Congo", "Mozambique"],
  },
  {
    id: "jamaica",
    name: "Jamaica",
    country: "Caribbean",
    mapPosition: { x: 380, y: 370 },
    imageUrl: "/jamaican-reggae-music-performance-rastafari-colors.jpg",
    overview:
      "Jamaica's culture is predominantly African in character, with over 90% of the population of African descent. The island became a major hub for Afro-Caribbean culture, influencing global music, spirituality, and language.",
    statistics: [
      { label: "Population of African Descent", value: "~92% (2.6M people)", icon: "users" },
      { label: "Enslaved Africans Brought", value: "~1 million (1655-1834)", icon: "map" },
      { label: "Independence", value: "August 6, 1962", icon: "calendar" },
    ],
    culturalAspects: [
      {
        category: "music",
        title: "Reggae & Afro-Jamaican Music",
        description:
          "Reggae music, pioneered by Bob Marley, evolved from Jamaican ska and rocksteady, which have roots in African drumming patterns and call-response traditions.",
        examples: ["Reggae", "Ska", "Dancehall", "Dub"],
      },
      {
        category: "religion",
        title: "Rastafari Movement",
        description:
          "Rastafari emerged in 1930s Jamaica, combining African spiritual concepts with Christianity and reverence for Ethiopian Emperor Haile Selassie I as divine.",
        examples: ["Rastafari", "Kumina", "Revival Zion"],
      },
      {
        category: "language",
        title: "Jamaican Patois",
        description:
          "Jamaican Patois (Creole) blends English with West African grammatical structures and vocabulary from Akan, Igbo, and Yoruba languages.",
        examples: ["Irie", "Nyam", "Duppy", "Obeah"],
      },
      {
        category: "food",
        title: "Jamaican Cuisine",
        description:
          "Jamaican cooking techniques and ingredients like ackee, callaloo, and okra have direct African origins, particularly from West Africa.",
        examples: ["Jerk Seasoning", "Ackee & Saltfish", "Callaloo", "Rice & Peas"],
      },
    ],
    africanOrigins: ["Ghana (Akan)", "Nigeria (Igbo, Yoruba)", "Ivory Coast", "Senegal"],
  },
  {
    id: "haiti",
    name: "Haiti",
    country: "Caribbean",
    mapPosition: { x: 410, y: 360 },
    imageUrl: "/haitian-vodou-ceremony-colorful-spiritual-celebrat.jpg",
    overview:
      "Haiti is the world's first Black republic and the site of the only successful slave-led revolution in history. With 95% of its population of African descent, Haiti maintains the strongest African cultural continuity in the Americas.",
    statistics: [
      { label: "Population of African Descent", value: "~95% (10.5M people)", icon: "users" },
      { label: "Revolution Success", value: "January 1, 1804", icon: "calendar" },
      { label: "Enslaved Africans Brought", value: "~800,000 (1625-1804)", icon: "map" },
    ],
    culturalAspects: [
      {
        category: "religion",
        title: "Haitian Vodou",
        description:
          "Vodou is a profound African spiritual system combining Fon, Yoruba, and Kongo traditions. It played a crucial role in the Haitian Revolution and remains central to Haitian identity.",
        examples: ["Vodou Ceremonies", "Lwa Worship", "Voodoo Drums"],
      },
      {
        category: "language",
        title: "Haitian Creole",
        description:
          "Haitian Creole blends French vocabulary with West African grammatical structures, creating a distinct language spoken by all Haitians.",
        examples: ["Kreyòl ayisyen"],
      },
      {
        category: "music",
        title: "Afro-Haitian Music",
        description:
          "Traditional Haitian music features African drum patterns and spiritual rhythms, including rara street music and konpa dance music.",
        examples: ["Rara", "Konpa", "Mizik rasin", "Vodou Drumming"],
      },
      {
        category: "sites",
        title: "Revolutionary Sites",
        description:
          "Haiti's independence monuments and historical sites commemorate the world's only successful slave revolution, a monumental achievement in African diaspora history.",
        examples: ["Citadelle Laferrière", "Bois Caïman", "Sans-Souci Palace"],
      },
    ],
    africanOrigins: ["Benin (Fon)", "Congo", "Nigeria (Yoruba)", "Senegal"],
  },
  {
    id: "new-orleans",
    name: "New Orleans",
    country: "United States",
    mapPosition: { x: 350, y: 340 },
    imageUrl: "/new-orleans-jazz-musicians-brass-band-french-quart.jpg",
    overview:
      "New Orleans is the birthplace of jazz and a unique melting pot of African, Caribbean, and European cultures. The city's African American community created revolutionary art forms that transformed global music.",
    statistics: [
      { label: "African American Population", value: "~59% (220,000 people)", icon: "users" },
      { label: "Jazz Originated", value: "Early 1900s", icon: "calendar" },
      { label: "Louisiana Purchase", value: "1803", icon: "map" },
    ],
    culturalAspects: [
      {
        category: "music",
        title: "Jazz & Blues",
        description:
          "Jazz emerged from African American communities blending West African rhythms, work songs, spirituals, and blues. New Orleans jazz became the foundation of American music.",
        examples: ["Jazz", "Blues", "Second Line", "Brass Bands"],
      },
      {
        category: "festivals",
        title: "Mardi Gras & Second Lines",
        description:
          "New Orleans' Mardi Gras traditions and second line parades incorporate African diaspora music, dance, and spiritual practices, creating a unique cultural expression.",
        examples: ["Mardi Gras Indians", "Second Line Parades", "Jazz Fest"],
      },
      {
        category: "religion",
        title: "Voodoo (Louisiana Voudou)",
        description:
          "Louisiana Voodoo blends West African, Haitian, and Catholic spiritual traditions, maintaining African spiritual practices in the American South.",
        examples: ["Voodoo Practices", "Marie Laveau Legacy"],
      },
      {
        category: "food",
        title: "Creole & Soul Food",
        description:
          "New Orleans cuisine combines African cooking techniques with local ingredients, creating dishes like gumbo (from West African okra stews) and jambalaya.",
        examples: ["Gumbo", "Jambalaya", "Red Beans & Rice", "Beignets"],
      },
    ],
    africanOrigins: ["Senegal", "Mali", "Benin", "Congo", "Angola"],
  },
  {
    id: "cuba",
    name: "Cuba",
    country: "Caribbean",
    mapPosition: { x: 390, y: 350 },
    imageUrl: "/cuban-salsa-dancers-colorful-traditional-costumes-.jpg",
    overview:
      "Cuba has one of the richest Afro-Caribbean cultures, with African influences permeating music, dance, religion, and daily life. Over one million enslaved Africans were brought to Cuba, creating a vibrant cultural synthesis.",
    statistics: [
      { label: "Population of African Descent", value: "~36% (4M people)", icon: "users" },
      { label: "Enslaved Africans Brought", value: "~1.3 million (1511-1886)", icon: "map" },
      { label: "Slavery Abolished", value: "October 7, 1886", icon: "calendar" },
    ],
    culturalAspects: [
      {
        category: "music",
        title: "Afro-Cuban Music",
        description:
          "Cuban music is fundamentally African, with rumba, son, and salsa all rooted in Yoruba and Kongo rhythms and percussion patterns.",
        examples: ["Rumba", "Son", "Salsa", "Afro-Cuban Jazz"],
      },
      {
        category: "religion",
        title: "Santería (Regla de Ocha)",
        description:
          "Santería is a syncretic religion merging Yoruba orishas (deities) with Catholic saints, maintaining African spiritual traditions under colonial oppression.",
        examples: ["Santería", "Palo Monte", "Abakuá"],
      },
      {
        category: "festivals",
        title: "Carnival & Cultural Celebrations",
        description:
          "Cuban carnival features comparsas (street dance groups) with African drumming, dance, and elaborate costumes reflecting African heritage.",
        examples: ["Havana Carnival", "Santiago Carnival"],
      },
      {
        category: "language",
        title: "Afro-Cuban Spanish",
        description:
          "Cuban Spanish incorporates many Yoruba and Bantu words, particularly in religious contexts and everyday expressions.",
        examples: ["Asere", "Bemba", "Changó"],
      },
    ],
    africanOrigins: ["Nigeria (Yoruba)", "Congo", "Benin", "Ivory Coast"],
  },
  {
    id: "colombia",
    name: "Colombia",
    country: "South America",
    mapPosition: { x: 460, y: 440 },
    imageUrl: "/colombian-pacific-coast-afro-colombian-dancers-mar.jpg",
    overview:
      "Colombia has the second-largest Black population in Latin America, with vibrant Afro-Colombian communities along the Pacific and Caribbean coasts maintaining distinct African cultural traditions.",
    statistics: [
      { label: "Afro-Colombian Population", value: "~21% (10.5M people)", icon: "users" },
      { label: "Enslaved Africans Brought", value: "~200,000 (1533-1851)", icon: "map" },
      { label: "Slavery Abolished", value: "May 21, 1851", icon: "calendar" },
    ],
    culturalAspects: [
      {
        category: "music",
        title: "Afro-Colombian Music",
        description:
          "Currulao, cumbia, and champeta are musical styles with strong African roots, featuring drums and call-response singing patterns from West and Central Africa.",
        examples: ["Currulao", "Cumbia", "Champeta", "Bullerengue"],
      },
      {
        category: "festivals",
        title: "San Pacho Festival",
        description:
          "The Festival de San Pacho in Quibdó is Colombia's most important Afro-Colombian celebration, featuring African-derived music, dance, and spiritual expressions.",
        examples: ["Festival de San Pacho", "Carnival de Barranquilla"],
      },
      {
        category: "food",
        title: "Pacific Coast Cuisine",
        description:
          "Afro-Colombian cuisine features seafood preparations, coconut rice, and plantain dishes influenced by West African cooking traditions.",
        examples: ["Arroz con coco", "Sancocho", "Pescado frito"],
      },
      {
        category: "sites",
        title: "Palenque de San Basilio",
        description:
          "Founded by escaped enslaved Africans in the 17th century, Palenque is the first free African town in the Americas and a UNESCO World Heritage site.",
        examples: ["Palenque de San Basilio"],
      },
    ],
    africanOrigins: ["Congo", "Angola", "Nigeria", "Senegal"],
  },
]
