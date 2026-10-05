export const PRODUCTS = [
  {
    id: 'venus-flytrap-king',
    slug: 'venus-flytrap-king-henry',
    name: 'Venus Flytrap "King Henry"',
    scientificName: 'Dionaea muscipula',
    category: 'carnivorous',
    price: 34.00,
    rating: 4.9,
    reviewCount: 128,
    stock: 'in_stock',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1620127252536-03bdfcf6d5c3?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1620127252536-03bdfcf6d5c3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'A dramatic carnivorous icon featuring oversized traps that snap shut in a fraction of a second.',
    description: 'The Venus Flytrap "King Henry" is renowned among plant collectors for its remarkably large traps and vibrant crimson interior highlights. Native to coastal boglands, this carnivorous specimen catches small insects with ultra-sensitive trigger hairs inside its leaf lobes.',
    difficulty: 'Beginner',
    light: 'Full Direct Sun (6+ hours daily)',
    water: 'Distilled, Reverse Osmosis, or Rainwater ONLY. Keep soil constantly damp.',
    humidity: '50% - 70%',
    temperature: '65°F - 85°F (Dormancy below 50°F in winter)',
    substrate: '50/50 Unfertilized Peat Moss & Perlite',
    beginnerFriendly: true,
    careInstructions: [
      'Always use distilled water or rainwater. Tap water minerals will damage root systems.',
      'Provide maximum direct sunlight indoors on a sunny sill or under full-spectrum LED grow lights.',
      'Do not manually trigger traps repeatedly as each trap can only trigger a few times before dying back.',
      'Expect a natural winter dormancy period where traps shrink and growth slows down.'
    ],
    faqs: [
      { q: 'What do I feed my Venus Flytrap?', a: 'If grown outdoors, it catches its own food. Indoors, feed live mealworms or small rehydrated bloodworms once every 2-3 weeks.' },
      { q: 'Why are some lower traps turning black?', a: 'Individual traps naturally die off after catching 3-4 meals or completing their lifecycle. Trim black traps near the base.' }
    ]
  },
  {
    id: 'nepenthes-st-gaya',
    slug: 'tropical-pitcher-plant-nepenthes-st-gaya',
    name: 'Nepenthes "St. Gaya"',
    scientificName: 'Nepenthes x "St. Gaya"',
    category: 'carnivorous',
    price: 48.00,
    rating: 4.8,
    reviewCount: 94,
    stock: 'in_stock',
    badge: 'New Arrival',
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Spectacular tropical pitcher plant producing stout, cherry-red specked cups filled with digestive fluid.',
    description: 'Nepenthes "St. Gaya" is an exceptionally vigorous hybrid carnivorous pitcher plant. It features broad pale green leaves terminating in tendrils that swell into magnificent red-splotched pitchers with ribbed peristomes.',
    difficulty: 'Beginner',
    light: 'Bright Indirect Light',
    water: 'Distilled water; keep substrate moist, never waterlogged.',
    humidity: '60% - 85%',
    temperature: '68°F - 82°F',
    substrate: '100% Long-Fiber Sphagnum Moss + Perlite',
    beginnerFriendly: true,
    careInstructions: [
      'Hang near a bright window or place in a warm humid terrarium.',
      'Ensure fluid remains inside pitchers; if spilled during transport, add 1-2 tsp of distilled water.',
      'Water thoroughly when top layer of sphagnum moss starts to feel barely damp.'
    ],
    faqs: [
      { q: 'Is this pitcher plant safe around pets?', a: 'Yes! Nepenthes are non-toxic to cats and dogs.' }
    ]
  },
  {
    id: 'sarracenia-purpurea',
    slug: 'purple-pitcher-plant-sarracenia-purpurea',
    name: 'Purple Pitcher Plant',
    scientificName: 'Sarracenia purpurea subsp. venosa',
    category: 'carnivorous',
    price: 38.00,
    rating: 4.9,
    reviewCount: 76,
    stock: 'in_stock',
    badge: 'Rare',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Squat, cup-shaped pitchers with intricate deep burgundy venation and rainwater harvesting hoods.',
    description: 'Sarracenia purpurea is a cold-hardy carnivorous species native to northern peat bogs. Unlike tall trumpet pitchers, it forms low rosettes of fat pitcher urns that capture natural rainwater to lure and digest insects.',
    difficulty: 'Intermediate',
    light: 'Full Direct Sun',
    water: 'Distilled or rainwater; tray method with standing water.',
    humidity: '50% - 80%',
    temperature: '55°F - 90°F (Requires winter cold dormancy)',
    substrate: '50/50 Peat Moss and Coarse Silica Sand',
    beginnerFriendly: false,
    careInstructions: [
      'Thrives outdoors in full direct sunlight.',
      'Keep pot sitting in 0.5 inches of distilled water during growing season.'
    ],
    faqs: [
      { q: 'Can I grow Sarracenia indoors?', a: 'They do best outdoors or under high-powered grow lights due to intense light requirements.' }
    ]
  },
  {
    id: 'jewel-orchid-macodes',
    slug: 'jewel-orchid-macodes-petola',
    name: 'Lightning Jewel Orchid',
    scientificName: 'Macodes petola',
    category: 'terrarium',
    price: 42.00,
    rating: 5.0,
    reviewCount: 112,
    stock: 'limited',
    badge: 'Rare',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Grown for its breathtaking velvety dark leaves adorned with shimmering golden electrical vein patterns.',
    description: 'Macodes petola is the undisputed crown jewel of terrarium plants. Unlike traditional orchids grown for flowers, this terrestrial rain-forest understory species is celebrated for foliage that literally sparkles under ambient lighting.',
    difficulty: 'Intermediate',
    light: 'Medium to Low Light (Avoid direct sun)',
    water: 'Keep consistently damp with purified water',
    humidity: '75% - 95% (Perfect for closed terrariums)',
    temperature: '65°F - 80°F',
    substrate: 'Sphagnum Moss, Tree Fern Fiber & Bark Mix',
    beginnerFriendly: false,
    careInstructions: [
      'Ideal for closed glass terrariums or high-humidity cloches.',
      'Protect from direct sunlight which burns fragile leaf tissue.'
    ],
    faqs: [
      { q: 'Does it flower?', a: 'It produces small spike flowers, but growers often clip them so energy stays in leaf growth.' }
    ]
  },
  {
    id: 'moss-cushion-pillow',
    slug: 'live-cushion-moss-clump',
    name: 'Living Cushion Moss Clump',
    scientificName: 'Leucobryum glaucum',
    category: 'terrarium',
    price: 18.00,
    rating: 4.7,
    reviewCount: 204,
    stock: 'in_stock',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Emerald green velvety moss mounds designed to create rolling hill landscapes inside terrariums.',
    description: 'Pillow Cushion Moss forms plush, vibrant green dome-like cushions that give terrariums an ancient fairy-forest aesthetic. Naturally pest-free and sustainably harvested.',
    difficulty: 'Beginner',
    light: 'Low to Medium Indirect Light',
    water: 'Mist lightly with distilled water',
    humidity: '70% - 100%',
    temperature: '50°F - 78°F',
    substrate: 'Terrarium Substrate / Akadama Layer',
    beginnerFriendly: true,
    careInstructions: [
      'Place over moist terrarium soil and press down gently.',
      'Keep closed in glass container or mist every few days.'
    ],
    faqs: []
  },
  {
    id: 'fittonia-red-anne',
    slug: 'fittonia-nerve-plant-red-anne',
    name: 'Ruby Nerve Plant',
    scientificName: 'Fittonia albivenis "Red Anne"',
    category: 'terrarium',
    price: 16.00,
    rating: 4.8,
    reviewCount: 88,
    stock: 'in_stock',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Vibrant compact foliage with intricate magenta-pink veins, loved by terrarium crafters.',
    description: 'Fittonia "Red Anne" adds intense color pops into miniature greenery landscapes. It thrives in high humidity environments and clearly indicates when water is needed by dramatically fainting and reviving within hours of watering.',
    difficulty: 'Beginner',
    light: 'Medium Indirect Light',
    water: 'Keep damp at all times',
    humidity: '60% - 90%',
    temperature: '65°F - 80°F',
    substrate: 'Rich organic peat & perlite soil mix',
    beginnerFriendly: true,
    careInstructions: [
      'Pinch growing tips to encourage bushy growth inside glass jars.',
      'Water promptly when leaves feel slightly soft.'
    ],
    faqs: []
  },
  {
    id: 'ready-terrarium-moss-haven',
    slug: 'moss-haven-ready-made-terrarium',
    name: 'The "Moss Haven" Apothecary Glass Terrarium',
    scientificName: 'Handcrafted Ecosystem',
    category: 'terrariums',
    price: 125.00,
    rating: 4.9,
    reviewCount: 62,
    stock: 'limited',
    badge: 'Limited Stock',
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Fully established self-sustaining glass biosphere featuring cushion moss, miniature ferns & dragon stone.',
    description: 'A complete, fully planted ecosystem enclosed in a heavy cork-topped vintage apothecary jar. Includes drainage charcoal, live springtails, cushion moss, and miniature tropical foliage requiring watering only 2-3 times per year.',
    difficulty: 'Beginner',
    light: 'Bright Indirect Natural Light',
    water: 'Mist 2-3 times per YEAR',
    humidity: 'Closed Glass Microclimate',
    temperature: '65°F - 78°F',
    substrate: 'Multi-layer Drainage & Charcoal Bio-Substrate',
    beginnerFriendly: true,
    careInstructions: [
      'Keep away from hot direct sunlight to prevent glass overheating.',
      'Rotate container quarterly for balanced foliage growth.'
    ],
    faqs: [
      { q: 'How does a closed terrarium stay alive?', a: 'Water recycles continuously through condensation on glass walls, while plants produce oxygen through photosynthesis.' }
    ]
  },
  {
    id: 'monstera-thai-constellation',
    slug: 'monstera-thai-constellation-rare',
    name: 'Monstera "Thai Constellation"',
    scientificName: 'Monstera deliciosa "Thai Constellation"',
    category: 'exotic',
    price: 160.00,
    rating: 5.0,
    reviewCount: 45,
    stock: 'limited',
    badge: 'Rare',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Sought-after collector plant showcasing creamy constellation-like splashes and deep leaf fenestrations.',
    description: 'Engineered through tissue culture, the Thai Constellation is famous for its stable, non-reverting cream and pale yellow variegation across split tropical leaves.',
    difficulty: 'Intermediate',
    light: 'Bright Indirect Light',
    water: 'Allow top 2 inches of soil to dry out between waterings',
    humidity: '55% - 75%',
    temperature: '65°F - 85°F',
    substrate: 'Chunky Aroid Mix (Orchid bark, perlite, coco coir)',
    beginnerFriendly: false,
    careInstructions: [
      'Provide a moss pole or trellis support for large leaf growth.',
      'Wipe glossy leaves periodically with a damp microfiber cloth.'
    ],
    faqs: []
  },
  {
    id: 'philodendron-verrucosum',
    slug: 'philodendron-verrucosum-exotic',
    name: 'Philodendron Verrucosum',
    scientificName: 'Philodendron verrucosum',
    category: 'exotic',
    price: 75.00,
    rating: 4.8,
    reviewCount: 31,
    stock: 'in_stock',
    badge: 'New Arrival',
    image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Velvety dark emerald heart leaves with crimson undersides and fuzzy hairy petioles.',
    description: 'An extraordinary high-elevation Ecuadorian cloud-forest species. Known for dramatic velvet leaf textures, vivid gold veins, and burgundy leaf backs.',
    difficulty: 'Collector',
    light: 'Medium to Bright Indirect Light',
    water: 'Keep moist; avoid wet feet',
    humidity: '70% - 90%',
    temperature: '62°F - 76°F',
    substrate: 'Aroid Bark & Sphagnum Substrate',
    beginnerFriendly: false,
    careInstructions: [
      'Requires elevated ambient humidity to unfurl pristine new leaves.',
      'Best kept in plant cabinets or humified botanical spaces.'
    ],
    faqs: []
  },
  {
    id: 'drosera-capensis-sundew',
    slug: 'cape-sundew-drosera-capensis',
    name: 'Cape Sundew "Octopus Carnivore"',
    scientificName: 'Drosera capensis',
    category: 'carnivorous',
    price: 26.00,
    rating: 4.9,
    reviewCount: 142,
    stock: 'in_stock',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Glistening tentacles covered in sticky dew droplets that curl dramatically around prey.',
    description: 'The Cape Sundew is one of the most rewarding carnivorous plants to grow. Each strap-like leaf is tipped with glistening red glandular hairs that secrete sweet nectar droplets that trap fungus gnats and fruit flies.',
    difficulty: 'Beginner',
    light: 'Bright Sunny Window / Grow Lights',
    water: 'Distilled water standing in saucer continuously',
    humidity: '50% - 75%',
    temperature: '60°F - 85°F',
    substrate: 'Pure Sphagnum Moss or Peat/Sand',
    beginnerFriendly: true,
    careInstructions: [
      'Keep pot sitting in 0.5 inches of distilled water.',
      'Dew drops shine brightest under high intensity lighting.'
    ],
    faqs: [
      { q: 'Is Cape Sundew good for fungus gnats?', a: 'Yes! It is one of nature\'s best natural pest management controls for houseplant gnats.' }
    ]
  },
  {
    id: 'terrarium-diy-kit',
    slug: 'complete-terrarium-builder-kit',
    name: 'Botanist Glass Terrarium Craft Kit',
    scientificName: 'Complete DIY Set',
    category: 'supplies',
    price: 65.00,
    rating: 4.9,
    reviewCount: 54,
    stock: 'in_stock',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Includes geometric glass vessel, expanded clay, activated carbon, terrarium soil, moss, & long tweezers.',
    description: 'Everything required to design, build, and maintain your own lush enclosed glass ecosystem at home.',
    difficulty: 'Beginner',
    light: 'Varies by plant chosen',
    water: 'Distilled water spray bottle included',
    humidity: 'High',
    temperature: 'Room Temp',
    substrate: 'Full 4-Layer Substrate Kit',
    beginnerFriendly: true,
    careInstructions: [
      'Follow step-by-step illustrated manual included in box.'
    ],
    faqs: []
  },
  {
    id: 'anectochilus-formosanus',
    slug: 'taiwan-jewel-orchid-gold',
    name: 'Taiwan Gold Jewel Orchid',
    scientificName: 'Anoectochilus formosanus',
    category: 'exotic',
    price: 52.00,
    rating: 4.7,
    reviewCount: 22,
    stock: 'in_stock',
    badge: 'Rare',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Velvety dark chocolate leaves with intricate metallic golden grid pinstripes.',
    description: 'A prized terrarium treasure native to humid mountain forests in East Asia. Deep dark leaves shimmer under soft room light with glowing gold pinstripes.',
    difficulty: 'Intermediate',
    light: 'Low to Medium Light',
    water: 'Keep damp with distilled water',
    humidity: '75% - 95%',
    temperature: '65°F - 78°F',
    substrate: 'Sphagnum Moss Layer',
    beginnerFriendly: false,
    careInstructions: [
      'Thrives inside cloches and terrarium environments.'
    ],
    faqs: []
  }
];

export const CATEGORIES = [
  {
    id: 'carnivorous',
    title: 'Carnivorous Plants',
    subtitle: 'Nature’s most fascinating hunters.',
    description: 'From snapping Venus Flytraps to sweet nectar pitchers and glistening sundews, explore plants that rewrite the rules of botany.',
    image: 'https://images.unsplash.com/photo-1620127252536-03bdfcf6d5c3?auto=format&fit=crop&w=800&q=80',
    itemCount: 14
  },
  {
    id: 'terrarium',
    title: 'Terrarium Plants',
    subtitle: 'Miniature worlds, crafted by nature.',
    description: 'Compact foliage, delicate ferns, velvet jewel orchids, and cushion mosses engineered to thrive in high-humidity microclimates.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    itemCount: 22
  },
  {
    id: 'exotic',
    title: 'Exotic Plants',
    subtitle: 'Rare foliage for extraordinary spaces.',
    description: 'Hand-picked rare Monsteras, dark velvet Philodendrons, variegated aroids, and unusual botanical curiosities for collectors.',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    itemCount: 18
  }
];
