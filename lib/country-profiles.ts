export interface CountryProfile {
  id: string
  name: string
  flag?: string
  coordinates: { lat: number; lng: number }
  population: number
  percentage: number
  history: string
  culturalHighlights: Array<{
    title: string
    description: string
  }>
  africanOrigins?: string[]
}

export const countryProfiles: CountryProfile[] = [
  {
    id: "germany",
    name: "Germany",
    coordinates: { lat: 51.1657, lng: 10.4515 },
    population: 817150,
    percentage: 1.01,
    history:
      "Unlike many recipient countries in Central and South America, Germany's transactional relationship with African people, did not begin until the 17th century. Some africans were originally brought over from West Africa (Gold Coast) as household servants, entering a complicated 'tiered' citizen system with slaves. German slave traders played, at most, a minor part in the history of the transatlantic slave trade. German involvement in the Atlantic slave trade was always dependent on broader political and economic conjunctures, as the German states were unable to provide sufficient resources to promote trading companies on their own. Later the German government did not practice formal slavery, but did allow existing slaves (owned by the Africans) to continue to exist as slaves. Another method of African infiltration was through grants and scholarship assistance for young scholars. Today, Afro-Germans still struggle for acceptance and recognition representing a mere 1% of Germany's 80 million population. Without census recognition, Germans of African descent are still fighting for inclusion and recognition. Blacks have not attained the level of social prominence and influence in German society that their compatriots have achieved in France or the United Kingdom but are still rising.",
    culturalHighlights: [
      {
        title: "Carnival (Berlin)",
        description:
          "Much like many celebrations in Latin America and the Caribbean, the Carnival season (also known as Karneval or Fasching) contains colorful celebrations, street parades and costume balls during the summer, annually. Every summer, Berlin celebrates its own unique carnival, called the Carnival of Cultures - more than 1.5 million visitors flock to the district of Kreuzberg to celebrate the multicultural spirit of Germany's capital. Berlin is home to more than 450,000 people from around the world and proud to be the most international city in Germany. The Carnival of Cultures pays tribute to Berlin's ethnic diversity and the peaceful coexistence of its different cultures with this fun summer festival. Soak up the samba rhythms, enjoy Brazilian drummers, Congolese singers, Korean culture groups, artistic larger than life puppets.",
      },
      {
        title: "A-Trane",
        description:
          "Many say reminiscent of an NYC jazz joint, A-trane is a jazz club in the Charlottenburg area of Berlin. With a cozy environment, and fun atmosphere, many visitors gather at this spot to hear jazz acts from around the globe. They have big names and a wide selection of contemporary jazz, ranging from bebop to Latin, and the clubby atmosphere puts you right into the music.",
      },
      {
        title: "Egyptian Museum",
        description:
          "The Egyptian Museum and Papyrus collection of Berlin worldwide renown not only for the bust of Nefertiti, the portrait of Tiy and the 'Berlin Green Head' presents art and papyri from over 5000 years discovered in Egypt and the Sudan. Most objects were offerings found in graves, some few were found in temples. The paintings and reliefs, especially of the three unique offering chambers, convey an impression of the ancient environment and daily life.",
      },
      {
        title: "Initiative Schwarze Menschen in Deutschland (ISD)",
        description:
          "The ISD is the first and the most important group formed by the African diaspora in this country since 1945 for the promotion of its interests.",
      },
    ],
    africanOrigins: ["West Africa (Gold Coast)", "Egypt", "Sudan"],
  },
  {
    id: "brazil",
    name: "Brazil",
    coordinates: { lat: -14.235, lng: -51.9253 },
    population: 55900000,
    percentage: 26.67,
    history:
      "With the largest penetration of descendants from the diaspora, the history of Afro Brazilians commences with the massive importation of an estimated 4 million African slaves during the 16th through 19th centuries. Due to the growth of sugar, gold, and coffee industries, Brazil continued their slave trade, even past them obtaining their independence from Portugal, spawning a deep proliferation of African culture throughout Brazil. The Africans brought to Brazil belonged to two major groups: the West African (Yoruba, Igbo, Fon, Ashanti, and others) and the Bantu (Angola, Congo) people. Expectantly, signs of African influence is present and thriving in Brazilian society. Carnival, Samba, Culinary, Baianas: are all products of cultural influence that are viewed as normative pieces of Brazilian culture.",
    culturalHighlights: [
      {
        title: "Carnival",
        description:
          "Rio's carnival is the most known and famous carnival in the world, with over 1 million visitors on an annual basis. Brazilian carnival is an elaborate display of samba music, traditional dance, and colorful costumes dawned by revelers. Filled with samba music, a Brazilian-based music and dance genre originating from West African religious traditions, Carnival serves even more Brazilians and visitors in Bahia and Pernambuco. A product of Portuguese colonialist culture and their former African slaves, Carnival presents a fulfilling opportunity to experience the African diaspora in Brazil.",
      },
      {
        title: "Museu Afro-Brasileiro (Salvador, Bahia)",
        description:
          "Museu Afro Brasil is dedicated to the preservation and exhibition of items and pieces that have undoubtedly shaped Afro Brasilian culture. Based in Ibirapuera Park (Sao Paulo), the museum houses over 6,000 works that all share in contribution, at some level, to the Afro Brasilian experience. The facility not only serves as a permanent exhibition of these pieces, artifacts, and documents, it also hosts theater showings, and temporary exhibits. Explore the Candomble exhibit - Candomble is an Afro-Brazilian religion that blends the spiritual beliefs of the indigenous people of African nations with Catholicism.",
      },
      {
        title: "Roda de Samba da Pedro do Sal (Rio)",
        description:
          "For live samba and large crowds in a historically relevant location, head over to Roda de Samba da Pedro Sal. Every Monday, in The Saúde neighborhood of Rio de Janiero, is a live samba session filled with dancing, clapping, and revelling with jubilance in the air. Pedro de Sal, nicknamed 'Little Africa', has remained a destination for Afrobrasilians.",
      },
      {
        title: "Capoeira",
        description:
          "A direct product of African slaves, Capoeira was developed as a defense practice, or martial art form. African slaves used to practice and develop their martial art skills (without harming each other) when slave owners were absent, only to begin dancing when they returned, as a disguise. Capoeira now exists as a hybrid of martial arts, acrobatics, and dance through two major forms; Regional and Angolan. Since the 1940s when it became legal, Capoeira is easily Brazil's most notable movement form, next to Samba. Everyone agrees that Salvador de Bahia is the center of the Capoeira scene.",
      },
      {
        title: "Salvador (Bahia)",
        description:
          "Salvador, the capital of Bahia, is the heart of Afro-Brasilian culture. The city was the birthplace of well-known Afro-Brasilian musicians such as Gilberto Gil. Salvador is also a UNESCO World Heritage site, representing a historical haven for Afro-Brasilian heritage.",
      },
    ],
    africanOrigins: ["Angola", "Congo", "Nigeria (Yoruba)", "Nigeria (Igbo)", "Benin (Fon)", "Ghana (Ashanti)"],
  },
  {
    id: "mexico",
    name: "Mexico",
    coordinates: { lat: 23.6345, lng: -102.5528 },
    population: 1386556,
    percentage: 1.07,
    history:
      "Mainly populated in the communities (pueblos negros) of Costa Chica of Oaxaca, Veracruz, and Guerrero, the relatively small population of Afro-Mexicans originate from the slave trade (brought over to toil in sugar fields and mines) and intermarriage. This stretch of coastline starts just south of Acapulco and extends for approximately 200 miles. Fishing and agriculture are the mainstays of the economy in Costa Chica. Like many other latin nations, the concept of mestizaje (mixing culture), made it difficult to pinpoint those of African heritage, until 2015 when Census collection allowed Afro-descendant designation (In 2020, 'black' became an official category). According to that Census data, there are 1.3M Afro-Mexicans, who consider themselves of African descent, approximately 1.2% of the country's population. The first blacks to come to Mexico, as well as their descendants, have greatly influenced Mexican culture. Throughout the centuries, Afro-Mexicans have made enormous contributions to the country through rich heritage of politics, dance, music and song. Mexico's 2nd president (a mulatto), has a state named after him (Guerrero).",
    culturalHighlights: [
      {
        title: "Danza de los Diablos (Dance of the Devils) - Juxtlahuaca, Oaxaca",
        description:
          "A large, traditional celebration consisting of distinct African-influenced features. The dance occurs in the streets in costumes and masks accompanied by rhythmic music. The dance is strikingly similar to the egungun dances of West Africa; the performance is a form of ancestral reverence, occurring within a context that includes European and Native influences at the core. The egungun masquerades of West Africa are, like the Dance of the Devils, performed as part of a feast of the dead. Masks are worn which represent the dead, symbolically, but not as individual persons. The 'devils' of the dance are actually ancestral spirits whose presence is celebrated and encouraged.",
      },
      {
        title: "Carnival - Coyolillo, Veracruz",
        description:
          "Coyolillo is a small municipality in Actopan with its first inhabitants being liberated African slaves. The town celebrates its carnival annually every February. During this celebration, Afro-Mexicans dress in roundneck robes made with cotton fabric full of colorful prints and designed masks. The 150-year old carnival boasts large attendance with mask-wearing 'viejitas' (men dressed as women), dancing to 'Gule, Guamkulu', which has its origins in Africa.",
      },
      {
        title: "Museo de las Culturas Afromestizas",
        description:
          "Located in Cuajinicuilapa, on the coast of Costa Chica, this museum is dedicated to the history of African slaves in Mexico. It features slave ship exhibits and Afro-Mexican experiences. The museum has a display of casas redondas, the round houses typical of West Africa that were built around Cuaji until as late as the 1960s.",
      },
      {
        title: "Obatala Dancers",
        description:
          "Named after the Yoruba word meaning 'Child of God' and sculptor of mankind, these dancers epitomize the search for knowledge of origin. Driven by Mexico's historical refusal to legally recognize those of African descent as an official ethnic group, the Obatala dancers make conscious efforts to reconnect with their heritage through the arts. They travel in the state of Oaxaca performing to spread awareness of their North African ancestry.",
      },
      {
        title: "Lagunas de Chacahua National Park - Oaxaca",
        description:
          "Located in Villa de Tutupec in Oaxaca, this national park created in 1937 has swampland, broadleaf forests, mangroves, palm trees, and diverse wildlife. Many inhabitants in this region are Afro-Mestizo. This group of African descendants offer tours of the mangrove tunnels and birdwatching, immersing visitors with their culture and the ancestral history of how they arrived to Chacahua. Tours include local food sampling and visits to a crocodile nursery.",
      },
    ],
    africanOrigins: ["West Africa", "Angola", "Congo", "Nigeria (Yoruba)"],
  },
  {
    id: "venezuela",
    name: "Venezuela",
    coordinates: { lat: 6.4238, lng: -66.5897 },
    population: 2641481,
    percentage: 8.79,
    history:
      "Before people of Yoruba origin began to be traded to the Americas, many people of various African descent were brought to Venezuela prior to the 19th century. Primarily the Bantu and Manding people from the Congo, Angola, and the Gold Coast, respectively were brought to Venezuela to man the copper mines, support the cacao and sugar industries. Venezuela's slave population was much smaller than that of its neighboring countries (Cuba, Brazil, United States). Despite its relatively small number of slaves, the displaced Africans had a spirit of resistance, staging rebellions and establishing communities on their own. With the declaration of independence in 1810, all trafficking in slaves was outlawed. The decline in slavery continued throughout the War of Independence when, at its conclusion in 1821, the 'Ley de vientre' was passed, stating that all children born, whether of slave or free parents, were automatically free. By 24 March 1854, the date of slavery's official abolition in Venezuela, less than 24,000 slaves remained. With approximately 9% of its total population, being Afro-Venezuelans, Venezuela has adopted the ideology of mestizaje that contends all groups have blended together to form a new, indistinguishable type, called the mestizo. Whether this ideology has curbed racial discrimination or not, there is no obscurity in assessing the contribution of Afro-Venezuelans in Venezuelan culture.",
    culturalHighlights: [
      {
        title: "Barlovento Region",
        description:
          "A sub region in Miranda state, Barlovento is renowned as the commonplace for Afro-Venezuelans, as its history is rooted in runaway, resistance slave settlements, called a cimarrons. Primarily known for its cacao plantations, Barlovento represents the product of imported slaves who supported this industry, later going on to establish the only legally free town of free blacks (Curiepe). Of course, African culture still dominates this region in its influence of different facets of life.",
      },
      {
        title: "El Negro Primero",
        description:
          "Pedro Camejo, a Venezuelan soldier, known as 'El Negro Primero (The First Black)', due to his eagerness and aggressive approach to battle. A statue in his honor stands in the Plaza Carabobo in Caracas - the only statue commemorating a Black in all Venezuela. Afro Venezuelans played an integral role in the country's fight for independence, with active members in the army at the order of Simon Bolivar.",
      },
      {
        title: "Fiesta de San Juan",
        description:
          "The San Juan Bautista Festival in Curiepe, Brión has roots in Afro-Venezuelan tradition and resistance as the site of a former cumbe (maroon society). Venezuelans gather in Curiepe's Plaza Bolívar to usher in San Juan Bautista with Afro-Venezuelan drumming and dancing around the beginning of June, annually. Enslaved Africans during the colonial period in Venezuela would escape the plantations from June 23-25. These days were marked by festivities to celebrate the annual harvests and Juan Congo, whose image was transformed over time into the Catholic figure of San Juan Bautista. The community of Curiepe continues to pay homage to Juan Congo whose celebration takes place the weekend following San Juan Bautista.",
      },
      {
        title: "Musical Expression",
        description:
          "Afro-Venezuelan musical expression is characterized by a great diversity of drums. Most are of African origin and many bear direct resemblance to the drums of Bantu-speaking and West African groups. In Barlovento, the culo e'puya drums are important, as are the mina and curbata, which are played together. Quitiplas are also prominent in Barlovento. These are fashioned from hollow bamboo tubes and played by striking them on the ground. The cumaco is widespread along the central coastal region, used in San Juan celebrations as well as the secular bailes de tambor (dances). The tamunango is found in Afro-Venezuelan communities in the interior. To the west, in Zulia, the chimbángueles are used to accompany San Benito festivities, and a friction drum called furruco is commonly played during Nativity celebrations.",
      },
    ],
    africanOrigins: ["Congo", "Angola", "Gold Coast (Ghana)", "West Africa (Bantu)", "West Africa (Manding)"],
  },
  {
    id: "jamaica",
    name: "Jamaica",
    coordinates: { lat: 18.1096, lng: -77.2975 },
    population: 2731419,
    percentage: 97.43,
    history:
      "As one of the larger islands in the Caribbean, Jamaica remains the most deeply penetrated island with citizens of African descent. Labeled with the not-so-common term, Afro Jamaicans, Jamaicans of African descent constitutes approximately 97% of the island's total population. Before it's abolishment of slavery in 1834, the Jamaican slave economy was driven by British enslavement and imperialism which drove sugar plantation workers, cattle herders, and skilled artisans to prop up the island. Through language, religion, and a host of other customs, Jamaica currently has on display African influence that many scholars trace mainly to the western region of Africa. Nigeria, Angola, and the republic of Congo are countries that researchers have noted the origin of many slaves. Jamaica's rich culture is known the world over; and every aspect of this culture has been influenced by Jamaica's African heritage. From speech to dress, and spirituality to dance, from food to folklore and from music to art and religion, African retentions from the time of slavery have become more than preserved aspects of Jamaica's past; African traditions have become part and parcel of Jamaican culture.",
    culturalHighlights: [
      {
        title: "Blue Hole (Ocho Rios)",
        description:
          "This hidden gem is located 30 mins north of downtown Ocho Rios, between the St.Ann and St.Mary parishes. This attraction is a swimming pool and waterfall that offers an alternative to the nationally renowned, Dunn's river falls. Whether with a tour guide, or through personal exploration, the Blue Hole is an attraction that can offer a moment for relaxation as visitors relish in its natural beauty, or action-packed fun, as you may take the opportunity to leap of the many hills and waterfalls into the refreshing river stream.",
      },
      {
        title: "Patois",
        description:
          "Patois isn't an actual destination, yet it isn't a very important and relevant piece of culture, tightly woven into the fabric of Jamaican culture. Pronounced 'Patwa', Patois is Jamaica's unofficial language, and the second most spoken in the island behind English (Jamaica's first official language). 'Yardies', as Jamaicans are sometimes referred to, use Patois as a cultural signifier, displaying a sense of pride.",
      },
      {
        title: "Kumina",
        description:
          "Kumina is a religious and cultural practice that came to Jamaica after emancipation via Central African free laborers. Kumina is steeped in death and burial rituals. During a Kumina ceremony, the bailo (Kumina dancing grounds) will be filled with believers, performing their routines. The female wears long, full skirts fashioned from African prints. Through dancing, singing, and drumming, they contact ancestral spirits with rituals, and prepare a feast, cooking up goat (or hog), curried chicken and white rice all on one plate. Asafu ground in Spanish Town, just outside Kingston, is home to one of Jamaica's largest Kumina group. Other areas with active Kumina groups are St. Thomas, St. Catherine and Portland.",
      },
      {
        title: "Maroon Cultural Center (Accompong)",
        description:
          "Located in St. Elizabeth, Accompong Maroon village is the home of a culturally grounded community whose history starts with resistance; resisting enslavement and other oppressors. Named after the great maroon leader, Accompong offers its visitors a rare opportunity to visit a community of original 'runaway slaves', steeped in history. In the cultural center, there is a museum, an educational facility that contains artifacts which trace the history of the maroons and the growth of Accompong as a village.",
      },
      {
        title: "Jamaica African Dance Arts Festival (Kingston)",
        description:
          "The Jamaica Association of Dance in Education Arts (JADEA) created the African Dance Arts Festival (JADAF) in 2009 as a way to give young talented dancers the opportunity to appreciate their African roots. With workshops and performances from dance icons like L'Acadco and their artistic director & choreographer, the festival is designed to recount history, and highlight its current influence in Jamaica. The festival occurs annually in October.",
      },
    ],
    africanOrigins: ["Nigeria", "Angola", "Republic of Congo", "West Africa"],
  },
  {
    id: "colombia",
    name: "Colombia",
    coordinates: { lat: 4.5709, lng: -74.2973 },
    population: 4944400,
    percentage: 10.16,
    history:
      "With its origins in line with most Spanish American nations, 'Afro Colombianism' begins with the slave trade permeating the country in the 16th century. African slaves who were brought over by the Spaniards, and made to work in mining and sugar plantations, established a community for themselves in resistance, at Palenque de San Basillo (Northern Colombia, 50 kilometers from Cartagena). African slaves propped up many regions in Colombia, from the textile industry in the east, to the sugarcane and gold mining operations in the north and west. The resistance of many Afro Colombians was displayed after slavery was abolished in 1851, when they went into exile in the jungle areas to escape the threat of being 'whitened' by the government through the methods of 'mestizaje'. Today, studies estimate a 10% (5M pop.) penetration of people of African descent in Colombia, concentrated in the northwest Caribbean coast and the Pacific coast in such departments as Choco. Between racism, prejudice, conflict and internal strife, Afro Colombians have still managed to impact overall Colombian culture.",
    culturalHighlights: [
      {
        title: "Festival de San Pacho (Quibdo, Choco)",
        description:
          "Held every September 20th and lasting for 20 days, the Festival celebrating the patron of Quibdó locally known as San Pacho, offers an array of spirit filled celebration activities. Costumed citizens sport flags and float parades in honor of St. Francis. Since its inception in 1648, as an attempt by recently arrived Franciscan missionaries to convert the local natives to Christianity, the festival has always been a strange, harmonious mix of disparate cultures and traditions. Today, the formal Catholic element is preserved in its original form, with images of Saint Francis paraded through the streets, to much pomp and ceremony. Traditional African and indigenous garb and music are the focal point of a wild, pagan celebration of life, joy and cultural identity, that organizers say affirms the lasting influence of slave culture in Colombian society.",
      },
      {
        title: "Utria National Natural Park (Choco)",
        description:
          "Utría National Natural Park is a large protected area serving as home to whales, monkeys, frogs, and more than 400 species of birds. Explore one of Colombia's most stunning parks with a guided hike through protected rainforest, a swim at a hidden beach and lunch at a family-run restaurant on a small, sandy island. There is an all day tour offering bird/animal sightings, a boat ride up through the coast, a landscape experience of the mangrove & rain forests, and a restaurant stop at the small beach, Playa Blanca.",
      },
      {
        title: "Cumbia & José Gutiérrez Gómez Metropolitan Theatre (Medellin)",
        description:
          "As one of the most melodic representative expressions of Colombia, Cumbia brings together African, Indigenous and European cultures. The African influence gives the rhythm of the drums while the Indigenous based flute blends in the melody. Originating from slavery in the late 17th century, Cumbia music got very popular in the 1950's and 1960's. There has been a recent movement in Medellin by young artists and dancers to revive the original sounds. The Metropolitan Theater of Medellin is the premier venue for plays, concerts, symphonies, ballet, comedy, poetry and other artistic expressions of entertainment where these performances can be seen.",
      },
      {
        title: "Gaira Café (Bogota)",
        description:
          "Named after the small town Gaira, the restaurant offers good cuisine and live music. Thursday through Saturday presents an Afro Colombian theme revolving around Colombia's afro culture, with cumbia and el porro y el mapalé (typical folkloric afro dance and music). The restaurant's dishes are inspired by costeña criolla recipes.",
      },
      {
        title: "Barranquilla Carnival (Barranquilla)",
        description:
          "El Carnaval de Barranquilla is a spectacular display of Colombian customs and colors, with a Caribbean twist. The four-day celebration attracts 1.5 million revelers throughout the carnival's duration. Indigenous and African cultures are emphasized. What makes Barranquilla's carnival distinct are what organizers call its '13 different musical expressions' that, even if from African or other roots, are imbued with Colombian colors and flare. Carnaval de Barranquilla has a tone that's distinctly Caribbean, setting the Colombia of the coast apart from the Colombia of the mountains.",
      },
    ],
    africanOrigins: ["West Africa", "Bantu peoples", "Congo", "Angola"],
  },
  {
    id: "haiti",
    name: "Haiti",
    coordinates: { lat: 18.9712, lng: -72.2852 },
    population: 10305766,
    percentage: 95,
    history:
      "95% of Haiti's population is considered Afro-Haitian, with the remaining of mixed race with European ancestry. Haiti is unique in that historians believe slaves that arrived in Haiti came from several African countries instead of deep penetration from one. With the majority from West and Central Africa, Haitian slaves were from all over Africa, the most common being from Congo, Benin, Togo and Nigeria. Haiti has a long history of French colonialism, and its successful slave revolution in 1804 made it the first independent Black republic in the Western Hemisphere.",
    culturalHighlights: [
      {
        title: "Cap Haitien & Citadelle Laferriere",
        description:
          "Cap-Haitien is the former capital and second largest city of Haiti, affectionately called 'Cap'. The Citadelle Laferriere is a mountaintop fortress on the northern coast, built by one of the leaders of Haiti's slave revolution on top of mountain Bonnet a L'Eveque. The structure is a symbol of Haiti's power and independence. The downtown area features French-inspired architecture, the wide promenade Bouleved du Carenage along the bay, restaurants like Lakay offering Haitian, American and French cuisine, and a tourist market at Rue 24 & Blvd Carenage.",
      },
      {
        title: "Fort Jacques",
        description:
          "Located in Kenscoff, about an hour from Port-au-Prince, Fort Jacques stands tall as one of the many sites built by Alexandre Petion, named in honor of Jean Jacques Dessalines. Erected during the burst of fort-building following independence in 1804 to protect natives from French invasion, Fort Jacques overlooks the bay of Port-au-Prince. The Fortress contains displays of canons and their remnants, serving as a powerful reminder of Haiti's fight for freedom.",
      },
      {
        title: "Musée Colonial Ogier-Fombrun",
        description:
          "As a former sugar mill and plantation, the Musee Colonial Ogier-Fombrun is an ongoing collection of exhibits and displays of colonial and pre-independent Haiti. Segmented into a trilogy, it offers a permanent exhibit on Haiti's history, a space showcasing objects from the colonial period, and the historical site itself boasting both replica and original structures from the late 18th century. Tours are offered in English, French, and Haitian Creole, and it features a bar with freshly squeezed sugar-cane juice.",
      },
      {
        title: "Bassin Bleue",
        description:
          "Located in the reclusive town of Jacmel, Bassin Bleue waterfall provides a breathtaking off-the-beaten-path experience. It consists of a series of natural rock basins arranged in cascade, successively pouring water into one another. The cool and crystal clear water is great for swimming - visitors can jump from waterfalls, swim in cool basins, and enjoy the lush vegetation in a private grotto setting. This blue water escape showcases Haiti's natural beauty.",
      },
      {
        title: "Labadie Beach",
        description:
          "Connected to Cap-Haïtien by a mountainous road, Labadie is a beach resort compound that serves as a rest stop for some Royal Caribbean Cruise ships. From Labadie, visitors can catch a water taxi to Paradis, a secluded beach located in a nearby cove, offering pristine Caribbean waters and a peaceful escape along Haiti's northern coast.",
      },
    ],
    africanOrigins: ["Congo", "Benin", "Togo", "Nigeria"],
  },
  {
    id: "france",
    name: "France",
    coordinates: { lat: 48.8566, lng: 2.3522 }, // Paris
    population: 3800000,
    percentage: 5.88,
    history: `Unlike most Sub-Saharan immigration, immigrants from Africa to France after World War II were predominantly from the Northern African region. The French heavily depended on African troops from their colonies in the two World Wars. However, afterwards, most of the soldiers repatriated while only a small number stayed. In the post-war period, North African immigration to France regenerated due to the shortage of labor needed to rebuild war-torn infrastructure.

At this time, many people from the African Diaspora had set up their lives in France. For a long time, the North African immigrants remained faceless and invisible in French society. But by the 1980s, the invisibility of the single male migrant workers of the 1950s and 1960s was strongly challenged by their descendants or so-called "Beur" who marked public space with various artistic, literary, political and social interventions.`,
    culturalHighlights: [
      {
        title: "La Bague de Kenza",
        description:
          "Located in the 11th district of Paris, this Algerian-based pastry shop is fused in the fabric of Parisian life. The bakery offers Algerian pastries that incorporate French taste - balanced, sweet but not too sweet, with ingredients measured with precision to deliver incredible taste. The window display is elaborate and overwhelming.",
      },
      {
        title: "La Goutte d'Or Neighborhood",
        description:
          "Home to over 200,000 African immigrants in the 18th district, this working-class hub for Black Parisians is recognized as the 'gateway neighborhood' for immigrants from France's former colonies. 'The Gold Drop' presents a developed community containing mosques, African markets, North African pastry shops, and breweries.",
      },
      {
        title: "Le Louxor Cinema",
        description:
          "An Egyptian revival movie palace abandoned for decades and restored in 2013. The Louxor is one of the only cinemas left from pre-war entertainment and possibly the oldest movie palace of Paris. It specialized in 'exotic' cinema, showing Bollywood, North African films, and diverse international features.",
      },
      {
        title: "Marche Dejean",
        description:
          "This chaotic jumble of a market is stuffed with overflowing baskets of exotic foods, fish, and goods. Get everything you need for a Senegalese feast or Cameroon cuisine. Here bartering is encouraged and the overall ambiance of the market transports you to another part of the world.",
      },
      {
        title: "Le Mois Cultures d'Afrique (MOCA)",
        description:
          "The Month of African Cultures festival, similar in spirit to Black History Month in the USA, seeks to highlight the infusion of African culture into the French psyche. Through arts, film, literature, dance, theater, and fashion, the festival features more than 50 events held in and around Paris.",
      },
    ],
    africanOrigins: ["Senegal", "Cameroon", "Mali", "Ivory Coast", "Congo"],
  },
  {
    id: "cuba",
    name: "Cuba",
    coordinates: { lat: 21.5218, lng: -77.7812 },
    population: 1126894,
    percentage: 9.89,
    history:
      "Driven by the intense rise of the sugar economy, Cuba's importation of African slaves grew to amount to double the amount brought to the United States during the transatlantic slave trade. A prolonged slave trade, mixed with a thriving sugar and tobacco industry, led to the pervasiveness of evident elements of West African culture. Through social clubs known as 'cabildos', many enslaved Africans and Cuban-born descendants retained their identity. After labor disbandment, the independence wars, and the Cuban revolution, the influence of Africa and its people permeated through Cuban culture, creating a unique mix and blend that lives on today.",
    culturalHighlights: [
      {
        title: "Hamel Alley (Callejón de Hamel)",
        description:
          "Affectionately called Rumba Alley, Havana's Hamel Alley is a small backstreet located in the neighborhood of Cayo Hueso. This space takes visitors through a journey of 'AfroCubism' through its endless sculptures, murals, and symbolic stagings dedicated to Santeria. On Sundays, you can catch a live demonstration of Rumba dancing from celebrants of Santeria, and experience the presence of Cuban artists, providing an electrifying experience!",
      },
      {
        title: "Carnival",
        description:
          "The largest carnival celebration in Cuba originates from the Yoruba slaves, who celebrated their own religions in parallel with Spanish colonists. Using music and rhythmic vibes, 'the Mamarrachos' (The Mad Ones) created a traditional festival celebration, now taking place every July 25 and known as the Carnival of Santiago. Held annually in Santiago de Cuba, Carnival is an excellent display of modern Afro-Cubans shown in the richness of the music and dance, including the Conga, Rumba, and Son (which later developed into salsa).",
      },
      {
        title: "Fábrica de Arte Cubano",
        description:
          "A relatively new and fresh artspace, Fábrica de Arte Cubano offers a modern, creative vibe to the city of Havana. Serving as a hub for music, art, and fashion, creatives assemble at this artspace for social gathering. Created by Afro-Rock musician X Alfonso, it maintains Afro-Cuban themes throughout the facility through the sounds of reggaeton and the innovative utilization of secondhand materials for exhibits.",
      },
      {
        title: "Casa Museo de África",
        description:
          "Founded in 1986, this 17th-century mansion displays objects of a myriad of African cultures, including religious, musical, and fashion-related tools and objects. The ground floor depicts the Cuban slave era, while the third floor has a collection of Santeria icons belonging to famous Cuban ethnographer Fernando Ortiz. The Africa House Museum is an important study center where researchers, ethnologists, linguists and students of African and Afro-Cuban history can present their findings.",
      },
    ],
    africanOrigins: ["Nigeria (Yoruba)", "Congo", "Angola", "West Africa"],
  },
  {
    id: "usa",
    name: "USA",
    coordinates: { lat: 37.0902, lng: -95.7129 },
    population: 46282080,
    percentage: 14.40,
    history:
      "Between the 16th and 19th centuries, at least 388,000 enslaved Africans arrived in North America through the trans-Atlantic slave trade. African Americans have profoundly shaped American history through pivotal periods including the abolitionism movement, the Civil War, Reconstruction, the Jim Crow era, the Great Migration, and the Civil Rights Movement. Their cultural contributions span music (jazz, blues, hip-hop), cuisine, literature, and spiritual practices.",
    culturalHighlights: [
      {
        title: "Congo Square, New Orleans",
        description:
          "A historic site where enslaved and free Black people gathered in the 18th and 19th centuries for public musical performances and religious practices. This open area in what is now Louis Armstrong Park influenced the birth of jazz and the unique cultural fusion of New Orleans.",
      },
      {
        title: "National Museum of African American History and Culture",
        description:
          "Located on the National Mall in Washington, D.C., this Smithsonian museum chronicles the African American experience through powerful exhibits covering slavery, segregation, the Civil Rights Movement, and cultural contributions to American society.",
      },
      {
        title: "The French Quarter, New Orleans",
        description:
          "Built largely by enslaved Africans, this historic neighborhood showcases the architectural and cultural legacy of African Americans in the development of one of America's most distinctive cities, with influences visible in buildings, music venues, and culinary traditions.",
      },
      {
        title: "Historic Black Churches",
        description:
          "From the Mother Emanuel AME Church in Charleston to Ebenezer Baptist Church in Atlanta (Dr. Martin Luther King Jr.'s home church), historic Black churches served as centers of community organizing, spiritual refuge, and resistance during slavery and the Civil Rights era.",
      },
      {
        title: "Harlem, New York",
        description:
          "The heart of the Harlem Renaissance in the 1920s-1930s, this neighborhood became a global center for Black culture, art, literature, and music. Landmarks like the Apollo Theater and institutions like the Studio Museum continue this legacy.",
      },
    ],
    africanOrigins: ["Nigeria", "Ghana", "Senegal", "Congo", "Angola"],
  },
  {
    id: "uk",
    name: "United Kingdom",
    coordinates: { lat: 55.3781, lng: -3.436 },
    population: 2080000,
    percentage: 3.19,
    history:
      "African people have been present in Britain since Roman times, with evidence dating to the 3rd century AD. The modern Black British population was significantly shaped by post-WWII immigration, particularly following the British Nationality Act of 1948, when Commonwealth citizens from Africa and the Caribbean came to help rebuild Britain. They contributed extensively to the NHS, Post Office, and British Railways during the economic boom of the 1950s-1960s.",
    culturalHighlights: [
      {
        title: "Black Cultural Archives, Brixton",
        description:
          "The only national heritage institution dedicated to collecting, preserving, and celebrating the histories of people of African and Caribbean descent in the UK. Located in the heart of Brixton, it houses an extensive collection of documents, photographs, and artifacts.",
      },
      {
        title: "Notting Hill Carnival",
        description:
          "Europe's largest street festival, celebrating Caribbean culture every August Bank Holiday. Started in 1966, it features steel bands, calypso music, elaborate costumes, and represents the vibrant Afro-Caribbean community's contribution to British culture.",
      },
      {
        title: "Kensal Green Cemetery",
        description:
          "Final resting place of notable Black British figures including Mary Seacole, the Jamaican-British nurse who cared for soldiers during the Crimean War, and other pioneers of the Black British experience.",
      },
      {
        title: "Tate Britain Collection",
        description:
          "Features portraits and artworks depicting Black British figures from history, including Dido Elizabeth Belle and other individuals who shaped the Black presence in Georgian and Victorian Britain.",
      },
    ],
    africanOrigins: ["Nigeria", "Ghana", "Jamaica", "Barbados", "Trinidad"],
  },
  {
    id: "dominican-republic",
    name: "Dominican Republic",
    coordinates: { lat: 18.7357, lng: -70.1627 },
    population: 1985991,
    percentage: 18.55,
    history:
      "Enslaved Black Africans were brought to the Dominican Republic during Spanish colonial rule, introducing cultural elements that transformed into unique Creole societies. Despite the significant African influence on Dominican culture through food, music, and religious practices, there has been historical complexity around racial identity, with some tension stemming from the Trujillo regime (1930-1961) which promoted anti-Haitian and anti-Black sentiment. Today, a growing movement embraces Afro-Dominican consciousness and celebrates African ancestry.",
    culturalHighlights: [
      {
        title: "Colonial Zone, Santo Domingo",
        description:
          "While showcasing colonial architecture, the historic center also tells the story of enslaved Africans who built many of these structures and whose descendants shaped Dominican society, though their contributions are increasingly being recognized and documented.",
      },
      {
        title: "Afro-Dominican Cultural Centers",
        description:
          "Emerging cultural spaces that celebrate Afro-Dominican identity through music, art, and activism, fostering solidarity with the broader African diaspora and highlighting the African roots of Dominican merengue, bachata, and carnival traditions.",
      },
      {
        title: "Villa Mella",
        description:
          "A municipality north of Santo Domingo recognized for preserving Congo traditions, particularly the sacred drum music and dances known as 'palos' or 'atabales,' which are central to Afro-Dominican spiritual and cultural expression.",
      },
      {
        title: "Boca Chica and San Pedro de Macoris",
        description:
          "Regions with significant Afro-Dominican populations where African cultural influences are evident in local festivals, music traditions, and the practice of gaga (a form of processional music with Haitian-Dominican roots).",
      },
    ],
    africanOrigins: ["Congo", "Angola", "West Africa"],
  },
  {
    id: "italy",
    name: "Italy",
    coordinates: { lat: 41.8719, lng: 12.5674 },
    population: 1100000,
    percentage: 1.84,
    history:
      "People of African descent have been part of Italian history since the Renaissance, documented in art and archival records. A significant increase in Italy's Black population occurred in the last 20 years, particularly in 2014, with immigrants primarily from Sub-Saharan Africa. Today, the Black community in Italy demands recognition as integral members of society, influencing literature, politics, sports, cinema, and television.",
    culturalHighlights: [
      {
        title: "Black History Month Florence",
        description:
          "Co-founded by artist Justin Randolph Thompson, this annual celebration and cultural hub is dedicated to centering Blackness in Italian history, featuring exhibitions, performances, and discussions that excavate Black histories in Italy.",
      },
      {
        title: "The Recovery Plan",
        description:
          "A cultural initiative that serves as a hub for exploring African diaspora experiences in Italy, featuring contemporary art, film screenings, and community gatherings that highlight Afro-Italian voices and narratives.",
      },
      {
        title: "Renaissance Art Collections",
        description:
          "Major museums including the Uffizi Gallery in Florence feature Renaissance paintings depicting African figures, providing visual evidence of the long-standing African presence in Italian society and challenging perceptions of European homogeneity.",
      },
      {
        title: "Afro-Italian Literature and Arts",
        description:
          "Growing body of work by contemporary Afro-Italian writers, filmmakers, and artists who explore themes of identity, belonging, and the intersection of African and Italian cultures in modern Italy.",
      },
    ],
    africanOrigins: ["Nigeria", "Ghana", "Senegal", "Ivory Coast", "Somalia"],
  },
  {
    id: "puerto-rico",
    name: "Puerto Rico",
    coordinates: { lat: 18.2208, lng: -66.5901 },
    population: 979842,
    percentage: 26.62,
    history:
      "Africans arrived in Puerto Rico through forced migration during the 16th, 17th, and 18th centuries. The first person of African origin arrived in 1509 as a free functionary, followed by West Africans brought for forced labor in gold mining and plantations. In 1664, a Spanish edict offered freedom and land to free Africans from non-Spanish colonies, leading to settlements like Loiza Aldea, which now has Puerto Rico's largest Black population. Intermarriage with indigenous Taino people contributed to Puerto Rico's mixed heritage.",
    culturalHighlights: [
      {
        title: "Bomba Music and Dance",
        description:
          "One of Puerto Rico's oldest musical traditions, bomba traces its roots to enslaved West Africans on sugar plantations. It's a dialogue between dancer and drummer, featuring repurposed rum barrel drums, maracas, and wooden 'cua' sticks. Styles include Sica (slow, sensual), Yuba (aggressive, powerful), and Holandes (fast, upbeat).",
      },
      {
        title: "Loiza",
        description:
          "This coastal town holds Puerto Rico's largest Black population and serves as a center for Afro-Puerto Rican culture. Famous for its Fiestas Tradicionales de Santiago Apostol, featuring vejigante masks and bomba y plena performances that celebrate African heritage.",
      },
      {
        title: "Museo de las Americas",
        description:
          "Located in Old San Juan, this museum features extensive collections of African art and exhibits documenting the African diaspora's contributions to Puerto Rican culture, including historical artifacts and contemporary artistic expressions.",
      },
      {
        title: "Pinones",
        description:
          "A beachside community known for its Afro-Puerto Rican cuisine and culture. Home to Casa Afro and kiosks serving traditional African-influenced dishes like bacalaitos, alcapurrias, and mofongo along the beautiful coastal boardwalk.",
      },
      {
        title: "Don Rafael Cepeda School",
        description:
          "A cultural institution in Santurce dedicated to preserving and teaching bomba and plena, ensuring these African-rooted traditions continue to thrive and are passed down to new generations of Puerto Ricans.",
      },
    ],
    africanOrigins: ["Nigeria", "Ghana", "Congo"],
  },
  {
    id: "peru",
    name: "Peru",
    coordinates: { lat: -9.19, lng: -75.0152 },
    population: 875427,
    percentage: 2.76,
    history:
      "Africans were brought to Peru as slaves starting in 1521, primarily from Mozambique, Congo, and Guinea, to work on farms in the northern valleys during the 18th century. Today, more than three million Afro-Peruvians live mainly in cities such as Lima, Canete, Nazca, Callao, Ica, and the Morropon Province. Afro-Peruvian culture is recognized for its distinctive contributions to Peruvian music, dance, and cuisine.",
    culturalHighlights: [
      {
        title: "Zana Afro-Peruvian Museum",
        description:
          "Located in Chiclayo Province, this museum opened in 2005 to preserve and educate about Afro-descendant heritage. It houses extensive collections of musical instruments and documents Afro-Peruvian history. The town is formally recognized by Peru and UNESCO as a repository of Afro-Peruvian cultural memory.",
      },
      {
        title: "Monument to Freedom of Slaves",
        description:
          "Unveiled in 2013 at Cerrillo Gallows in Zana, this monument depicts a woman with a baby next to a rustic drum, transforming a former execution site into a symbol of freedom and representing a cultural bridge between America and Africa.",
      },
      {
        title: "Chincha",
        description:
          "Known as the capital of Afro-Peruvian music and culture, located 200km south of Lima. Celebrated for distinctive dances like 'festejo' and home to the Virgen del Carmen. The region preserves traditional Afro-Peruvian rhythms and celebrates its heritage through festivals.",
      },
      {
        title: "El Carmen, Chincha",
        description:
          "This district in Chincha is the heart of Afro-Peruvian cultural expression, hosting regular festejo and lando performances. It's where the famous Peruvian cajon (box drum) tradition thrives, an instrument central to Afro-Peruvian music.",
      },
    ],
    africanOrigins: ["Mozambique", "Congo", "Guinea"],
  },
  {
    id: "canada",
    name: "Canada",
    coordinates: { lat: 56.1304, lng: -106.3468 },
    population: 783795,
    percentage: 2.16,
    history:
      "Black history in Canada dates back to at least 1608 with the arrival of Mathieu Da Costa, a Black African interpreter. The first enslaved African child arrived in 1628. Black Canadians trace their origins to enslaved Africans, Black Loyalists who arrived after the American Revolution, refugees from the Underground Railroad, and more recent immigrants from the Caribbean and Africa. Major historical events include the Underground Railroad movement, the Great Migration, and ongoing contributions to Canadian society despite facing discrimination.",
    culturalHighlights: [
      {
        title: "Underground Railroad Sites",
        description:
          "Historic sites across Ontario and other provinces mark the routes taken by enslaved people seeking freedom in Canada. Places like the Buxton National Historic Site and Museum in Ontario commemorate this pivotal chapter in Black Canadian history.",
      },
      {
        title: "Africville Museum, Halifax",
        description:
          "Commemorates Africville, a historic Black community in Halifax, Nova Scotia, that was demolished in the 1960s. The museum preserves the history of this vibrant community and its unjust destruction, serving as a testament to Black resilience in Canada.",
      },
      {
        title: "Caribana Festival, Toronto",
        description:
          "One of North America's largest cultural festivals, celebrating Caribbean culture every summer since 1967. It features elaborate costumes, steel pan music, calypso, and soca, reflecting the significant Caribbean diaspora in Toronto.",
      },
      {
        title: "Black Cultural Centre, Nova Scotia",
        description:
          "Canada's oldest facility dedicated to the preservation and promotion of Black culture. Located in Cherry Brook, it houses archives, artifacts, and exhibits documenting the Black experience in Nova Scotia and Canada.",
      },
    ],
    africanOrigins: ["Nigeria", "Somalia", "Ethiopia", "Jamaica", "Trinidad"],
  },
  {
    id: "spain",
    name: "Spain",
    coordinates: { lat: 40.4637, lng: -3.7492 },
    population: 690291,
    percentage: 1.50,
    history:
      "African people were among the earliest inhabitants and rulers of the land now known as Spain. The most notable period began in 711 AD when Islamic North Africans controlled the Iberian Peninsula for over 700 years, leaving an indelible mark on Spanish culture, architecture, and identity. This Moorish period profoundly shaped Southern Spain, with many modern Spaniards having significant African ancestry. Today's Afro-Spanish population includes descendants of this historical presence as well as recent immigrants from Sub-Saharan Africa.",
    culturalHighlights: [
      {
        title: "Alhambra Palace, Granada",
        description:
          "This magnificent palace and fortress complex was built during the Moorish period (8th-15th centuries), showcasing the sophisticated Islamic North African architecture and culture that flourished in Spain. It stands as a testament to African influence on European civilization.",
      },
      {
        title: "Alcazar of Seville",
        description:
          "A royal palace originally developed by Moorish Muslim kings, featuring stunning Islamic architecture and gardens. The complex demonstrates the lasting African architectural legacy in Spain and continues to influence Spanish design aesthetics.",
      },
      {
        title: "Flamenco",
        description:
          "While often considered quintessentially Spanish, flamenco absorbed significant expressivity from the African diaspora during its development. Scholars trace its origins to an 'Afro-Andalusian Caribbean' tradition spanning the Gulf of Guinea, the Caribbean, and southern Iberia.",
      },
      {
        title: "Afro-Spanish Literature and Theater",
        description:
          "Historical Spanish literature and early modern theater contain 'habla de negros' (black speech) that reveals African voices of agency, presence, and resistance. Contemporary Afro-Spanish artists continue exploring these themes in modern works.",
      },
    ],
    africanOrigins: ["Senegal", "Nigeria", "Ghana", "Equatorial Guinea"],
  },
  {
    id: "ecuador",
    name: "Ecuador",
    coordinates: { lat: -1.8312, lng: -78.1834 },
    population: 680000,
    percentage: 4.15,
    history:
      "Afro-Ecuadorian communities trace their history to the colonial period, with the first Black individuals arriving between 1533 and 1536 when Jesuit priests imported enslaved Africans to work on sugar plantations. Another significant group arrived in 1533 when a slave ship wrecked along Ecuador's Northern Pacific coast, leading to an African diaspora settlement that merged with indigenous groups in Esmeraldas. Runaway slaves formed palenques (resistance communities), successfully resisting Spanish colonial powers for many years. Slavery was officially abolished on September 27, 1852.",
    culturalHighlights: [
      {
        title: "Esmeraldas Province",
        description:
          "With a 70% Afro-Ecuadorian population, this coastal region is the heart of African-descended culture in Ecuador. Its music features rhythmic drumming and the marimba (wooden xylophone), accompanied by traditional dance. The area hosts the Festival Internacional de Danza y Musica Afro, celebrating its rich cultural legacy.",
      },
      {
        title: "Valle del Chota",
        description:
          "Located in the provinces of Carchi and Imbabura, this valley is predominantly populated by Afro-Ecuadorians descended from slaves brought by Jesuit priests. Residents preserve their culture through 'bomba' music and dance, performed during celebrations, and traditional cuisine including beans, chicken, fish, and morocho dulce.",
      },
      {
        title: "Marimba Music Tradition",
        description:
          "The marimba, a wooden xylophone of African origin, is central to Afro-Ecuadorian musical expression. This tradition was inscribed on UNESCO's Representative List of the Intangible Cultural Heritage of Humanity, recognizing its cultural significance.",
      },
      {
        title: "Afro-Ecuadorian Cuisine",
        description:
          "Traditional dishes like encocado (coconut-based stew), tapao (steamed fish), and various plantain preparations reflect the fusion of African, indigenous, and Spanish culinary traditions that define Esmeraldas and Chota Valley food culture.",
      },
    ],
    africanOrigins: ["Nigeria", "Congo", "Angola"],
  },
  {
    id: "trinidad-tobago",
    name: "Trinidad & Tobago",
    coordinates: { lat: 10.6918, lng: -61.2225 },
    population: 607472,
    percentage: 44.50,
    history:
      "Trinidad and Tobago's Carnival has deep roots in the ingenuity of enslaved African people who created defiant rituals in the late 18th century after being banned from French plantation owners' masquerades and pre-Lenten celebrations. Afro-Trinidadians and Afro-Tobagonians constitute approximately 40% of the population and have profoundly shaped the nation's culture, music, and identity through traditions that celebrate African heritage while creating something uniquely Caribbean.",
    culturalHighlights: [
      {
        title: "J'ouvert",
        description:
          "This pre-dawn Carnival celebration reenacts the symbolic gesture of bodies covered in black mud and paint, celebrating the skin tone for which enslaved people were punished. Participants fill the streets with skin gleaming in black oil, hands holding broken chains, in revelry and remembrance of emancipation.",
      },
      {
        title: "Calypso and Soca Music",
        description:
          "Calypso was developed by Afro-Trinidadians in 17th-century Trinidad, using coded language and rhythms that gave voice to resistance and social commentary. Modern soca music continues this tradition, dominating Carnival celebrations and spreading throughout the Caribbean and diaspora communities worldwide.",
      },
      {
        title: "Steelpan",
        description:
          "The national instrument of Trinidad and Tobago, the steelpan was invented by Afro-Trinidadians in the 1930s-1940s from repurposed oil drums. Steelpan competitions are central to Carnival, and the instrument has become an iconic symbol of Caribbean musical innovation.",
      },
      {
        title: "Limbo and Stick-Fighting",
        description:
          "Traditional performance arts with African roots that became part of Carnival celebrations. Limbo dancing originated from African slaves expressing their flexibility and resilience, while stick-fighting (Kalinda) combines martial arts with rhythmic performance.",
      },
      {
        title: "International Carnival Influence",
        description:
          "Trinidad and Tobago Carnival traditions have spread worldwide, directly influencing celebrations like Toronto's Caribana, London's Notting Hill Carnival, and Brooklyn's Labor Day Parade, making it the template for Caribbean Carnival celebrations globally.",
      },
    ],
    africanOrigins: ["Nigeria (Yoruba)", "Nigeria (Igbo)", "Congo"],
  },
]
