import { Scene, CulturalTopic, QuizQuestion } from '../types/documentary';

export const TOTAL_DURATION = 110; // seconds

export const SCENES: Scene[] = [
  {
    id: 1,
    number: 1,
    title: 'Opening: A Bridge Between Two Worlds',
    subtitle: 'From North Africa to East Asia',
    startTime: 0,
    endTime: 10,
    narration: 'Although Algeria and Japan are far apart, both countries have rich traditions, beautiful landscapes, and cultures worth discovering.',
    subtitleCues: [
      { start: 0.5, end: 5.0, text: 'Although Algeria and Japan are far apart,' },
      { start: 5.0, end: 9.8, text: 'both countries have rich traditions, beautiful landscapes, and cultures worth discovering.' }
    ],
    onScreenTitle: 'A BRIDGE BETWEEN TWO WORLDS',
    onScreenSubtitle: 'Algeria & Japan — Different Cultures, A Shared Future',
    cameraMovement: 'zoom-in',
    countryFocus: 'both',
    imageSrc: '/src/assets/images/algeria_japan_bridge_backview_1793544501955.jpg',
    brochureReference: 'Central banner: Two cultures, one world. Many similarities, many differences, and a shared future!',
    keyPoints: [
      'Two continents: Africa and Asia',
      'Geographical distance connected by curiosity and shared human values',
      'A scientific cultural discovery project for 1st Year Secondary students'
    ],
    culturalDetails: {
      algeria: 'North African gateway on the Mediterranean sea with warm golden light and desert warmth.',
      japan: 'East Asian archipelago in the Pacific Ocean with morning mist and cherry blossoms.'
    }
  },
  {
    id: 2,
    number: 2,
    title: 'Algeria: History and Landmarks',
    subtitle: 'Ancient ruins, white terraces, and the Sahara',
    startTime: 10,
    endTime: 22,
    narration: 'Algeria, in North Africa, is known for its fascinating history, ancient ruins, Mediterranean coast, and the vast Sahara Desert.',
    subtitleCues: [
      { start: 10.5, end: 16.0, text: 'Algeria, in North Africa, is known for its fascinating history and ancient ruins,' },
      { start: 16.0, end: 21.8, text: 'its Mediterranean coast, and the vast Sahara Desert.' }
    ],
    onScreenTitle: 'ALGERIA: HISTORY & HERITAGE',
    onScreenSubtitle: 'From the Casbah of Algiers to Roman Timgad & Djamaa El Djazair',
    cameraMovement: 'pan-right',
    countryFocus: 'algeria',
    imageSrc: '/src/assets/images/algeria_cultural_landmarks_1792870012745.jpg',
    brochureReference: 'Left Panel: Famous Landmarks (Casbah of Algiers UNESCO, Timgad Roman Ruins, Djamaa El Djazair Mosque, Tassili n’Ajjer)',
    keyPoints: [
      'Casbah of Algiers (UNESCO World Heritage)',
      'Ancient Roman City of Timgad with monumental Trajan Arch',
      'Djamaa El Djazair — the Great Mosque of Algiers with the tallest minaret',
      'The vast golden dunes of the Sahara Desert and Mediterranean coastline'
    ],
    culturalDetails: {
      algeria: 'Capital: Algiers · Population: ~45M · Languages: Arabic & Tamazight · Continent: Africa'
    }
  },
  {
    id: 3,
    number: 3,
    title: 'Japan: Tradition and Landmarks',
    subtitle: 'Mount Fuji, sacred shrines, and cherry blossoms',
    startTime: 22,
    endTime: 34,
    narration: 'Japan, in East Asia, combines ancient traditions with modern life. Its temples, gardens, cherry blossoms, and impressive landscapes make it unique.',
    subtitleCues: [
      { start: 22.5, end: 28.0, text: 'Japan, in East Asia, combines ancient traditions with modern life.' },
      { start: 28.0, end: 33.8, text: 'Its temples, gardens, cherry blossoms, and impressive landscapes make it unique.' }
    ],
    onScreenTitle: 'JAPAN: LAND OF THE RISING SUN',
    onScreenSubtitle: 'Harmony of Ancient Serenity & Modern Innovation',
    cameraMovement: 'pan-left',
    countryFocus: 'japan',
    imageSrc: '/src/assets/images/japan_cultural_landmarks_1792870014660.jpg',
    brochureReference: 'Right Panel: Famous Landmarks (Mount Fuji, Senso-ji Temple Tokyo, Itsukushima Shrine Hiroshima, Cherry Blossoms)',
    keyPoints: [
      'Mount Fuji — sacred volcanic peak and national symbol',
      'Senso-ji Temple in Asakusa, Tokyo, Japan’s oldest Buddhist temple',
      'The floating red torii gate of Itsukushima Shrine in Hiroshima bay',
      'Zen gardens and the ephemeral beauty of Sakura (cherry blossoms)'
    ],
    culturalDetails: {
      japan: 'Capital: Tokyo · Population: ~125M · Language: Japanese · Continent: Asia'
    }
  },
  {
    id: 4,
    number: 4,
    title: 'Traditional Food',
    subtitle: 'Flavors of hospitality and connection',
    startTime: 34,
    endTime: 46,
    narration: 'Food is an important part of both cultures. Algerians enjoy dishes such as couscous and rechta, while Japanese cuisine is famous for sushi, ramen, and green tea. In both countries, meals can bring people together.',
    subtitleCues: [
      { start: 34.5, end: 38.0, text: 'Food is an important part of both cultures.' },
      { start: 38.0, end: 42.5, text: 'Algerians enjoy dishes such as couscous and rechta, while Japanese cuisine is famous for sushi, ramen, and green tea.' },
      { start: 42.5, end: 45.8, text: 'In both countries, meals can bring people together.' }
    ],
    onScreenTitle: 'CULINARY TRADITIONS & HOSPITALITY',
    onScreenSubtitle: 'Algerian Couscous & Chorba · Japanese Sushi & Ramen',
    cameraMovement: 'zoom-in',
    countryFocus: 'both',
    imageSrc: '/src/assets/images/culinary_cultural_feast_1792870014682.jpg',
    brochureReference: 'Brochure Food Sections: Couscous & Tajine vs Sushi & Ramen',
    keyPoints: [
      'Algeria: Couscous (UNESCO intangible heritage), savory Tajine, Rechta noodles, rich Chorba soup, dates, and mint tea poured with froth.',
      'Japan: Handcrafted Sushi, steaming rich Ramen, crispy Tempura, Miso soup, and whisked Matcha green tea.',
      'Shared Value: Food is never just sustenance; it is a sacred gathering where families share respect and generosity.'
    ],
    culturalDetails: {
      algeria: 'Meals are shared from communal platters representing unity and warmth.',
      japan: 'Meals begin with "Itadakimasu" (humble gratitude) reflecting mindfulness.'
    }
  },
  {
    id: 5,
    number: 5,
    title: 'School Life',
    subtitle: 'Daily routines, ambition, and learning',
    startTime: 46,
    endTime: 58,
    narration: 'School life has similarities and differences. Students in both countries study, make friends, and prepare for their future. School uniforms and some daily school customs may differ.',
    subtitleCues: [
      { start: 46.5, end: 50.0, text: 'School life has similarities and differences.' },
      { start: 50.0, end: 54.5, text: 'Students in both countries study, make friends, and prepare for their future.' },
      { start: 54.5, end: 57.8, text: 'School uniforms and some daily school customs may differ.' }
    ],
    onScreenTitle: 'SCHOOL LIFE & YOUTH',
    onScreenSubtitle: 'First-Year Secondary Students Learning Together',
    cameraMovement: 'split-screen',
    countryFocus: 'both',
    imageSrc: '/src/assets/images/algeria_japan_bridge_backview_1793544501955.jpg',
    brochureReference: 'Brochure School Life Sections: Morning start, Uniforms, Subjects, Clubs & Extracurriculars',
    keyPoints: [
      'Morning Schedule: Secondary schools in both countries begin early in the morning.',
      'Uniforms: Worn in most Algerian and Japanese secondary schools fostering equality.',
      'Curriculum: Core focus on Mathematics, Science, Native and Foreign Languages (Arabic, French, English in Algeria; Japanese, English in Japan).',
      'Extracurriculars: Sports tournaments and science clubs in Algeria; Bukatsu (dedicated school clubs) in Japan.'
    ],
    culturalDetails: {
      algeria: 'Respectful and realistic student environment; high value on scientific streams and collaboration.',
      japan: 'Students participate in classroom cleaning (o-soji) and after-school club activities.'
    }
  },
  {
    id: 6,
    number: 6,
    title: 'Traditional Arts and Culture',
    subtitle: 'Mastery of hands, music, and centuries of craft',
    startTime: 58,
    endTime: 70,
    narration: 'Algeria celebrates its heritage through crafts, traditional clothing, pottery, carpets, and music. Japan expresses its heritage through calligraphy, origami, tea ceremonies, and delicate artistic traditions.',
    subtitleCues: [
      { start: 58.5, end: 64.0, text: 'Algeria celebrates its heritage through crafts, traditional clothing, pottery, carpets, and music.' },
      { start: 64.0, end: 69.8, text: 'Japan expresses its heritage through calligraphy, origami, tea ceremonies, and delicate artistic traditions.' }
    ],
    onScreenTitle: 'HERITAGE, CRAFTS & ARTISTRY',
    onScreenSubtitle: 'Chaâbi Music & Kabyle Silver · Origami, Shodo & Chado',
    cameraMovement: 'zoom-out',
    countryFocus: 'both',
    imageSrc: '/src/assets/images/algeria_cultural_landmarks_1792870012745.jpg',
    brochureReference: 'Brochure Traditional Arts: Pottery, Carpets, Jewelry, Chaâbi vs Origami, Calligraphy (和), Kimono, Tea Ceremony',
    keyPoints: [
      'Algerian Arts: Hand-thrown Berber pottery, geometric woven carpets, intricate Kabyle silver jewelry with coral, and soulful Chaâbi mandol music.',
      'Japanese Arts: Paper-folding Origami, expressive Shodo (calligraphy of 和 / harmony), silk Kimono, and meditative Chado (tea ceremony).',
      'Craft Philosophy: In both civilizations, artisans pass skills down across generations with patience and pride.'
    ],
    culturalDetails: {
      algeria: 'Musical rhythm of Chaâbi conveys poetic storytelling of daily life.',
      japan: 'Ikebana and Tea ceremony cultivate mindfulness and reverence for nature.'
    }
  },
  {
    id: 7,
    number: 7,
    title: 'Similarities and Differences',
    subtitle: 'Understanding what unites and enriches us',
    startTime: 70,
    endTime: 83,
    narration: 'Algeria and Japan differ in geography, language, architecture, and customs. Yet both value their heritage, family, traditional food, and celebrations. Their differences make cultural exchange more interesting.',
    subtitleCues: [
      { start: 70.5, end: 75.0, text: 'Algeria and Japan differ in geography, language, architecture, and customs.' },
      { start: 75.0, end: 79.0, text: 'Yet both value their heritage, family, traditional food, and celebrations.' },
      { start: 79.0, end: 82.8, text: 'Their differences make cultural exchange more interesting.' }
    ],
    onScreenTitle: 'TWO CULTURES, ONE WORLD',
    onScreenSubtitle: 'Shared Values Across Diverse Landscapes',
    cameraMovement: 'split-screen',
    countryFocus: 'both',
    imageSrc: '/src/assets/images/algeria_japan_bridge_backview_1793544501955.jpg',
    brochureReference: 'Central Brochure Section: 6 Similarities vs 6 Differences Matrix',
    keyPoints: [
      'SIMILARITIES: Rich cultural heritage, deep family values, delicious traditional food, stunning natural wonders, cherished festivals, respect for elders and traditions.',
      'DIFFERENCES: Geographic location (North Africa vs East Asia), languages (Arabic & Tamazight vs Japanese), climate (Mediterranean & Sahara vs temperate island), traditional wear (Karakou/Burnous vs Kimono/Yukata), architectural styles.'
    ],
    culturalDetails: {
      algeria: 'Family hospitality: guests are treated like family and offered the finest food.',
      japan: 'Omotenashi: selfless hospitality and deep courtesy for guests.'
    }
  },
  {
    id: 8,
    number: 8,
    title: 'Free Time and Festivals',
    subtitle: 'Sports, celebrations, and community spirit',
    startTime: 83,
    endTime: 98,
    narration: 'In their free time, young people enjoy sports, music, hobbies, and friendships. Algeria and Japan also celebrate important national and cultural festivals that bring communities together.',
    subtitleCues: [
      { start: 83.5, end: 90.0, text: 'In their free time, young people enjoy sports, music, hobbies, and friendships.' },
      { start: 90.0, end: 97.8, text: 'Algeria and Japan also celebrate important national and cultural festivals that bring communities together.' }
    ],
    onScreenTitle: 'CELEBRATION, FREE TIME & FESTIVALS',
    onScreenSubtitle: 'Independence Day July 5 & Cultural Gatherings · Hanami & Matsuri',
    cameraMovement: 'zoom-in',
    countryFocus: 'both',
    imageSrc: '/src/assets/images/japan_cultural_landmarks_1792870014660.jpg',
    brochureReference: 'Brochure Free Time: Football, Hanami, Summer Festivals, Anime, Music',
    keyPoints: [
      'Algeria: Passion for football (soccer), gatherings with friends, reading, Chaâbi concerts, celebrating Independence Day on July 5 and Yennayer (Amazigh New Year).',
      'Japan: Manga and video games, baseball and martial arts, Hanami cherry blossom picnics in spring, and vibrant summer Matsuri with lantern parades.',
      'Community Bonds: Both societies find immense joy when generations gather to celebrate historic milestones.'
    ],
    culturalDetails: {
      algeria: 'Celebrations resonate with patriotic songs, festive sweets, and family reunions.',
      japan: 'Matsuri feature traditional taiko drums, vibrant yukata robes, and street food stalls.'
    }
  },
  {
    id: 9,
    number: 9,
    title: 'Final Message',
    subtitle: 'Different cultures, one shared future',
    startTime: 98,
    endTime: 110,
    narration: 'By learning about each other, we build friendship, understanding, and respect. Algeria and Japan: different cultures, one shared future.',
    subtitleCues: [
      { start: 98.5, end: 104.0, text: 'By learning about each other, we build friendship, understanding, and respect.' },
      { start: 104.0, end: 109.8, text: 'Algeria and Japan: different cultures, one shared future.' }
    ],
    onScreenTitle: 'DIFFERENT CULTURES. SHARED VALUES. ONE FUTURE.',
    onScreenSubtitle: 'Prepared by: Nadji, Boucharef, Aouicha, Kerrar & Gherfi — Scientific Project, 1st Year Secondary',
    cameraMovement: 'zoom-out',
    countryFocus: 'both',
    imageSrc: '/src/assets/images/algeria_japan_bridge_backview_1793544501955.jpg',
    brochureReference: 'Student Project Credits: Nadji, Boucharef, Aouicha, Kerrar & Gherfi',
    keyPoints: [
      'Mutual respect and curiosity bridge physical distances.',
      'First-year secondary students demonstrating the power of cultural exchange.',
      'A message of global friendship and peaceful cooperation.'
    ],
    culturalDetails: {
      algeria: 'Marhaban (مرحبا) — Peace and welcome to our world.',
      japan: 'Konnichiwa (こんにちは) — Harmony and respect from the rising sun.'
    }
  }
];

export const CULTURAL_TOPICS: CulturalTopic[] = [
  {
    id: 'overview',
    title: 'Country Overview & Geography',
    algeria: {
      title: 'People’s Democratic Republic of Algeria',
      description: 'The largest nation in Africa and the Arab world, bordered by the Mediterranean Sea to the north and the golden dunes of the Sahara to the south.',
      items: [
        'Capital: Algiers (The White City / El Bahdja)',
        'Population: ~45 million people',
        'Official Languages: Arabic and Tamazight (French widely spoken)',
        'Continent: North Africa'
      ],
      highlight: 'Known for its 1,200 km Mediterranean coastline and hospitable people.'
    },
    japan: {
      title: 'State of Japan (Nihon / Nippon)',
      description: 'An East Asian archipelago of 6,852 islands in the Pacific Ocean, famous for seamlessly weaving centuries-old tradition with cutting-edge technology.',
      items: [
        'Capital: Tokyo (one of the world’s most dynamic metropolises)',
        'Population: ~125 million people',
        'Official Language: Japanese',
        'Continent: East Asia'
      ],
      highlight: 'Known for volcanic peaks, disciplined society, and technological excellence.'
    },
    bridgeTakeaway: 'Both nations guard distinct historical identities on their respective continents while actively contributing to science, education, and world commerce.'
  },
  {
    id: 'food',
    title: 'Food & Meals',
    algeria: {
      title: 'Rich Maghrebi & Mediterranean Cuisine',
      description: 'Wholesome, flavorful meals slow-cooked with aromatic spices, olive oil, and fresh garden herbs.',
      items: [
        'Couscous: Steamed semolina with tender vegetables, chickpeas, and lamb or chicken.',
        'Tajine: Fragrant stew prepared with meat, prunes, almonds, or vegetables in clay vessels.',
        'Rechta: Delicate handmade ribbons of pasta served with a savory white turnip sauce.',
        'Chorba Frik: Green wheat soup simmered during Ramadan, served with bourek.'
      ],
      highlight: 'Meals end with sweet dates and fresh mint tea poured theatrically to create a rich crown of froth.'
    },
    japan: {
      title: 'Washoku: Harmonious & Balanced Cuisine',
      description: 'Recognized by UNESCO for its respect of seasonal ingredients, balance of flavors, and meticulous visual plating.',
      items: [
        'Sushi: Seasoned vinegared rice paired with impeccably fresh raw fish and nori.',
        'Ramen: Rich broth simmered with wheat noodles, soft-boiled egg, and nori seaweed.',
        'Tempura: Crisp, light, batter-fried seafood and mountain vegetables.',
        'Miso Soup: Fermented soybean soup with tofu cubes and sea greens.'
      ],
      highlight: 'Meals are served with roasted sencha or whisked matcha green tea to aid digestion.'
    },
    bridgeTakeaway: 'Both cultures view shared meals as expressions of respect, family warmth, and sacred hospitality.'
  },
  {
    id: 'school',
    title: 'Secondary School Life',
    algeria: {
      title: 'Lycée: Academic Dedication & Friendship',
      description: 'First-year secondary students (1ère Année Secondaire) select specialized academic tracks like Scientific or Literary streams.',
      items: [
        'Schedule: Classes start in the morning, typically from 8:00 AM to 4:30 PM with a midday break.',
        'Uniform: Standardized blouses/smocks or school dress worn to cultivate equality and focus.',
        'Languages: Students study Arabic, French, English, and Tamazight alongside Math and Natural Sciences.',
        'Activities: Interschool football, debate competitions, science fairs, and national celebration events.'
      ],
      highlight: 'Classrooms encourage spirited group discussion, mutual student tutoring, and lifelong camaraderie.'
    },
    japan: {
      title: 'Kōkō: Discipline, Clubs & Cleanliness',
      description: 'Japanese high schools focus on academic rigor, moral character development, and holistic school community contribution.',
      items: [
        'Schedule: Homeroom starts at 8:30 AM; academic lectures run until mid-afternoon.',
        'Uniform: Famous traditional sailor or blazer uniforms (seifuku) worn with pride.',
        'O-Soji: Students spend 15 minutes each day cleaning their own classrooms and hallways.',
        'Bukatsu: Mandatory after-school clubs (sports like kendo or arts like manga and calligraphy) until sunset.'
      ],
      highlight: 'School clubs build teamwork, resilience, and respect for older student mentors (senpai).'
    },
    bridgeTakeaway: 'In both nations, high school students wake early, wear uniforms with pride, study challenging curricula, and dream of building a brighter future.'
  },
  {
    id: 'landmarks',
    title: 'Landmarks & Natural Wonders',
    algeria: {
      title: 'From Mediterranean Clifftops to Desert Wonders',
      description: 'A country blessed with millennia of civilizational monuments and breathtaking natural diversity.',
      items: [
        'Casbah of Algiers: Ancient maze of white Ottoman palaces and labyrinthine streets above the sea.',
        'Timgad: Exceptionally preserved Roman city built by Emperor Trajan in 100 AD.',
        'Djamaa El Djazair: Grand modern mosque featuring the world’s tallest minaret at 265 meters.',
        'Sahara & Tassili n’Ajjer: Vast sand oceans, rock arches, and prehistoric rock art galleries.'
      ],
      highlight: 'The lush cedar-covered Mountains of Kabylie contrast stunningly with the golden desert.'
    },
    japan: {
      title: 'Sacred Mountains, Shrines & Gardens',
      description: 'A land where volcanic landscapes meet sacred architectural sanctuaries preserved across centuries.',
      items: [
        'Mount Fuji (Fuji-san): Symmetrical 3,776-meter volcanic cone worshipped for centuries.',
        'Senso-ji: Historic Buddhist sanctuary in Tokyo adorned with giant red paper lanterns.',
        'Itsukushima Shrine: Torii gate in Hiroshima that appears to float on the sea at high tide.',
        'Onsen & Zen Gardens: Natural geothermal hot springs and raked gravel contemplation grounds.'
      ],
      highlight: 'Spring cherry blossoms (sakura) transform the country into a delicate canopy of pink petals.'
    },
    bridgeTakeaway: 'Both nations honor their historic architecture and hold immense reverence for their unique, awe-inspiring geographic landscapes.'
  },
  {
    id: 'arts',
    title: 'Traditional Arts & Crafts',
    algeria: {
      title: 'Handmade Berber & Andalusian Heritage',
      description: 'Crafts passed from mothers to daughters and master artisans to apprentices across generations.',
      items: [
        'Kabyle Silver Jewelry: Enamelled silver bracelets and fibulas set with natural Mediterranean red coral.',
        'Berber Rugs: Hand-knotted wool carpets featuring symbolic geometric patterns of protection.',
        'Ceramics & Pottery: Terracotta jars decorated with mineral pigments and geometric totems.',
        'Chaâbi Music: Poetic Algerian urban folk music played on the mandol, oud, and derbouka.'
      ],
      highlight: 'Crafts are durable, functional, and deeply tied to regional cultural identity.'
    },
    japan: {
      title: 'Zen Aesthetics, Paper & Silk',
      description: 'Arts defined by simplicity, patience, seasonal sensitivity, and dedication to flawless technique.',
      items: [
        'Origami: The precise art of folding square paper into birds, flowers, and geometric forms.',
        'Shodo (Calligraphy): Expressive brushwork ink writing emphasizing balance and spirit (like 和 / Wa).',
        'Kimono: Traditional silk robes tied with an obi sash, decorated with seasonal botanical motifs.',
        'Chado (Tea Ceremony): Highly choreographed preparation of green tea reflecting harmony and purity.'
      ],
      highlight: 'Ikebana floral art emphasizes space, asymmetry, and life rather than sheer volume.'
    },
    bridgeTakeaway: 'Both traditions embody deep respect for natural materials—earth, wool, silver, wood, and paper—transformed by human hands.'
  }
];

export const STUDENT_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the official currency or capital of Algeria and Japan as featured in the project?',
    options: [
      'Algiers is the capital of Algeria; Tokyo is the capital of Japan',
      'Oran is the capital of Algeria; Kyoto is the capital of Japan',
      'Constantine is the capital of Algeria; Osaka is the capital of Japan',
      'Annaba is the capital of Algeria; Sapporo is the capital of Japan'
    ],
    correctIndex: 0,
    explanation: 'Correct! Algiers (El Bahdja) is the historic capital of Algeria, and Tokyo is the bustling capital of Japan.'
  },
  {
    id: 2,
    question: 'Which UNESCO World Heritage landmark in Algeria features ancient Roman columns and a monumental arch?',
    options: [
      'The Casbah of Algiers',
      'Timgad Roman Ruins',
      'Djamaa El Djazair',
      'The Pyramids of Giza'
    ],
    correctIndex: 1,
    explanation: 'Correct! Timgad was founded by Emperor Trajan around 100 AD and is renowned for its remarkable Roman grid plan and triumphal arch.'
  },
  {
    id: 3,
    question: 'What are the iconic traditional staple dishes highlighted for Algeria and Japan respectively?',
    options: [
      'Pizza and Pasta',
      'Couscous & Rechta for Algeria; Sushi & Ramen for Japan',
      'Paella and Tortilla',
      'Biryani and Naan'
    ],
    correctIndex: 1,
    explanation: 'Correct! The documentary and brochure highlight couscous, rechta, and tajine for Algeria, and sushi, ramen, and tempura for Japan.'
  },
  {
    id: 4,
    question: 'Which of the following is a major SIMILARITY between secondary school students in Algeria and Japan?',
    options: [
      'Both have no morning classes and study only at night',
      'Both start school in the morning, wear uniforms, and value academic dedication',
      'Neither country teaches mathematics or sciences',
      'Students in both countries only play ice hockey'
    ],
    correctIndex: 1,
    explanation: 'Correct! As shown in Scene 5 and the brochure, secondary students in both countries start early, wear school uniforms, and focus on math, science, and languages.'
  },
  {
    id: 5,
    question: 'Who are the student authors who prepared this First-Year Secondary Scientific Project brochure?',
    options: [
      'Karim, Omar, Yasmine, Sofia & Rayan',
      'Nadji, Boucharef, Aouicha, Kerrar & Gherfi',
      'Takahashi, Sato, Tanaka, Watanabe & Ito',
      'Ahmed, Said, Leila, Fatima & Amine'
    ],
    correctIndex: 1,
    explanation: 'Correct! As credited on the student project brochure: Prepared by Nadji, Boucharef, Aouicha, Kerrar & Gherfi (Scientific Project — First Year Secondary).'
  }
];
