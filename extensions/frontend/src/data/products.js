export const products = [
  {
    id: "royal-luxe-tote",
    name: "Royal Luxe Tote",
    category: "Signature Collection",
    price: 18999,
    originalPrice: 25000,
    rating: 5,
    tag: "Bestseller",
    image: "/images/hero-bag.png",
    thumbnails: [
      "/images/hero-bag.png",
      "/images/designer-handbag.png",
      "/images/craftsmanship-bag.png",
      "/images/evening-clutch.png"
    ],
    tagline: "Uncompromising luxury for the modern connoisseur.",
    description: "Handcrafted from full-grain Italian calfskin with solid brass 24K gold-plated hardware. Features a suede-lined main compartment, dedicated laptop sleeve, and hand-stitched rolled leather handles.",
    features: [
      "100% Genuine Italian Calfskin",
      "24K Gold-plated hardware & zipper pulls",
      "Dual interior slip pockets & zipped compartment",
      "Reinforced base with protective metal studs",
      "Detachable & adjustable leather shoulder strap",
      "Individual serial number engraved plaque"
    ],
    dimensions: {
      height: "28 cm",
      width: "35 cm",
      depth: "14 cm",
      handleDrop: "20 cm"
    },
    colors: [
      { name: "Burgundy", hex: "#581825" },
      { name: "Obsidian Black", hex: "#111115" },
      { name: "Dark Emerald", hex: "#0b3824" },
      { name: "Rose Gold", hex: "#b76e79" }
    ]
  },
  {
    id: "elysian-evening-clutch",
    name: "Elysian Evening Clutch",
    category: "Evening & Gala",
    price: 12499,
    originalPrice: 16500,
    rating: 5,
    tag: "Exclusive",
    image: "/images/evening-clutch.png",
    thumbnails: [
      "/images/evening-clutch.png",
      "/images/hero-bag.png",
      "/images/designer-handbag.png"
    ],
    tagline: "A scintillating statement of evening glamour.",
    description: "Swarovski crystal-embellished minaudière with a magnetic frame closure and drop-in delicate chain strap. Designed to turn heads under the ballroom chandeliers.",
    features: [
      "Hand-set faceted Austrian crystals",
      "Satin lining with vanity mirror",
      "Concealable gold-tone chain strap",
      "Custom magnetic lock mechanism"
    ],
    dimensions: {
      height: "12 cm",
      width: "20 cm",
      depth: "5 cm",
      handleDrop: "55 cm (Chain)"
    },
    colors: [
      { name: "Champagne Gold", hex: "#d4af37" },
      { name: "Midnight Onyx", hex: "#0c0c10" },
      { name: "Silver Ice", hex: "#d8d8d8" }
    ]
  },
  {
    id: "artisan-monogram-satchel",
    name: "Artisan Monogram Satchel",
    category: "Heritage Edition",
    price: 21999,
    originalPrice: 28000,
    rating: 5,
    tag: "Limited",
    image: "/images/designer-handbag.png",
    thumbnails: [
      "/images/designer-handbag.png",
      "/images/craftsmanship.png",
      "/images/hero-bag.png"
    ],
    tagline: "Generational craftsmanship meets contemporary silhouettes.",
    description: "Embossed heritage monogram leather with hand-burnished edge paint and signature turn-lock closure. A timeless companion for everyday sophistication.",
    features: [
      "Hand-buffed vegetable-tanned leather",
      "Antiqued brass signature turn-lock",
      "Accordion interior with 3 compartments",
      "Signature dust bag & box included"
    ],
    dimensions: {
      height: "22 cm",
      width: "30 cm",
      depth: "11 cm",
      handleDrop: "15 cm"
    },
    colors: [
      { name: "Cognac Brown", hex: "#6c3b1e" },
      { name: "Midnight Black", hex: "#0f0f14" },
      { name: "Forest Green", hex: "#163321" }
    ]
  },
  {
    id: "executive-formal-brief",
    name: "Executive Formal Brief",
    category: "Executive Line",
    price: 24999,
    originalPrice: 32000,
    rating: 5,
    tag: "New",
    image: "/images/executive-formal.png",
    thumbnails: [
      "/images/executive-formal.png",
      "/images/hero-bag.png",
      "/images/craftsmanship-bag.png"
    ],
    tagline: "Power dressing amplified through refined leather goods.",
    description: "Structured briefcase tote engineered with padded 15-inch laptop compartment, passport organizer, and magnetic document quick-access pocket.",
    features: [
      "Scratch-resistant Saffiano leather",
      "Waterproof velvet interior lining",
      "Trolley pass-through sleeve",
      "Padded ergonomic shoulder strap"
    ],
    dimensions: {
      height: "30 cm",
      width: "40 cm",
      depth: "9 cm",
      handleDrop: "18 cm"
    },
    colors: [
      { name: "Obsidian", hex: "#0f0f13" },
      { name: "Navy Blue", hex: "#141c2b" },
      { name: "Espresso", hex: "#38231a" }
    ]
  }
];

export const testimonials = [
  {
    quote: "The quality rivals Parisian fashion houses at a fraction of the cost. The leather feels supple yet remarkably durable.",
    author: "Elena Rostova",
    role: "Senior Fashion Editor, Haute Magazine"
  },
  {
    quote: "Holding a Luvia piece is a tactile delight. The gold hardware weight, the stitch precision—it is true luxury.",
    author: "Ananya Reddy",
    role: "Creative Director, Vogue India"
  },
  {
    quote: "From the magnetic packaging to the final stitch, every single detail speaks volumes of passion and dedication.",
    author: "Meera Kapoor",
    role: "Bride & Luxury Lifestyle Curator"
  }
];

export const pricingTiers = [
  {
    name: "Evening Clutches",
    priceRange: "₹12,000 – ₹18,000",
    desc: "Crystal-embellished evening clutches for galas, weddings, and high-profile occasions.",
    featured: false
  },
  {
    name: "Designer Handbags",
    priceRange: "₹18,000 – ₹28,000",
    desc: "Premium Italian leather handbags with gold-plated hardware and timeless architecture.",
    featured: true
  },
  {
    name: "Limited Collector",
    priceRange: "₹35,000+",
    desc: "Hand-numbered collector's pieces, exotic leather accents, and Swarovski crystals.",
    featured: false
  },
  {
    name: "Luxury Care Suite",
    priceRange: "₹1,999",
    desc: "Leather conditioner, organic microfiber cloth, care guide, and satin storage bag.",
    featured: false
  }
];
