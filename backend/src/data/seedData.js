export const seedProducts = [
  {
    id: "royal-luxe-tote",
    name: "Royal Luxe Tote",
    category: "Signature Collection",
    price: 18999,
    originalPrice: 25000,
    rating: 5,
    tag: "Bestseller",
    stock: 15,
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
    stock: 8,
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
    stock: 12,
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
    stock: 10,
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
  },
  {
    id: "care-kit-suite",
    name: "Luxury Leather Care Suite",
    category: "Accessories & Care",
    price: 1999,
    originalPrice: 2999,
    rating: 5,
    tag: "Essential Addon",
    stock: 50,
    image: "/images/craftsmanship-bag.png",
    thumbnails: [
      "/images/craftsmanship-bag.png"
    ],
    tagline: "Preserve the luster and life of your heirloom leather goods.",
    description: "Formulated with organic beeswax, jojoba oil, and natural botanical essences. Includes microfiber buffing mitt and embossed velvet storage pouch.",
    features: [
      "Organic botanical leather elixir (150ml)",
      "High-density plush microfiber buffing cloth",
      "Gold-embossed velvet storage pouch",
      "Atelier leather maintenance guide"
    ],
    dimensions: {
      height: "15 cm",
      width: "10 cm",
      depth: "8 cm",
      handleDrop: "N/A"
    },
    colors: [
      { name: "Standard Suite", hex: "#d4af37" }
    ]
  }
];

export const seedTestimonials = [
  {
    id: "test-1",
    quote: "The quality rivals Parisian fashion houses at a fraction of the cost. The leather feels supple yet remarkably durable.",
    author: "Elena Rostova",
    role: "Senior Fashion Editor, Haute Magazine"
  },
  {
    id: "test-2",
    quote: "Holding a Luvia piece is a tactile delight. The gold hardware weight, the stitch precision—it is true luxury.",
    author: "Ananya Reddy",
    role: "Creative Director, Vogue India"
  },
  {
    id: "test-3",
    quote: "From the magnetic packaging to the final stitch, every single detail speaks volumes of passion and dedication.",
    author: "Meera Kapoor",
    role: "Bride & Luxury Lifestyle Curator"
  }
];

export const seedPricingTiers = [
  {
    id: "tier-1",
    name: "Evening Clutches",
    priceRange: "₹12,000 – ₹18,000",
    desc: "Crystal-embellished evening clutches for galas, weddings, and high-profile occasions.",
    featured: false
  },
  {
    id: "tier-2",
    name: "Designer Handbags",
    priceRange: "₹18,000 – ₹28,000",
    desc: "Premium Italian leather handbags with gold-plated hardware and timeless architecture.",
    featured: true
  },
  {
    id: "tier-3",
    name: "Limited Collector",
    priceRange: "₹35,000+",
    desc: "Hand-numbered collector's pieces, exotic leather accents, and Swarovski crystals.",
    featured: false
  },
  {
    id: "tier-4",
    name: "Luxury Care Suite",
    priceRange: "₹1,999",
    desc: "Leather conditioner, organic microfiber cloth, care guide, and satin storage bag.",
    featured: false
  }
];

export const seedReviews = [
  {
    id: "rev-1",
    productId: "royal-luxe-tote",
    author: "Siddharth Malhotra",
    rating: 5,
    title: "Exceeded all expectations",
    comment: "The Burgundy hue has an extraordinary depth under natural lighting. Perfect craftsmanship.",
    createdAt: "2026-08-15T10:30:00.000Z"
  },
  {
    id: "rev-2",
    productId: "royal-luxe-tote",
    author: "Dr. Natasha Mehta",
    rating: 5,
    title: "Absolute masterpiece",
    comment: "The gold hardware has substantial weight. Received numerous compliments at the annual charity gala.",
    createdAt: "2026-08-20T14:45:00.000Z"
  },
  {
    id: "rev-3",
    productId: "elysian-evening-clutch",
    author: "Kavita Singhania",
    rating: 5,
    title: "Shimmers like starlight",
    comment: "The Swarovski crystals are impeccably set. It held my essentials perfectly for my sister's wedding.",
    createdAt: "2026-08-28T19:20:00.000Z"
  }
];

export const seedSubscribers = [
  {
    id: "sub-1",
    email: "vip.collector@luvia.com",
    joinedAt: "2026-08-01T08:00:00.000Z",
    status: "Active",
    tier: "Platinum"
  }
];

export const seedOrders = [
  {
    id: "LUV-2026-9812",
    createdAt: "2026-09-01T12:00:00.000Z",
    customer: {
      fullName: "Ananya Roy",
      email: "ananya.roy@example.com",
      phone: "+91 98765 43210",
      address: {
        line1: "42 Altamount Road, Penthouse B",
        city: "Mumbai",
        state: "Maharashtra",
        postalCode: "400026",
        country: "India"
      }
    },
    items: [
      {
        id: "royal-luxe-tote",
        name: "Royal Luxe Tote",
        color: "Burgundy",
        price: 18999,
        quantity: 1
      },
      {
        id: "care-kit-suite",
        name: "Luxury Leather Care Suite",
        color: "Standard Kit",
        price: 1999,
        quantity: 1
      }
    ],
    subtotal: 20998,
    shippingFee: 0,
    total: 20998,
    paymentMethod: "VIP Encrypted Card",
    paymentStatus: "Paid",
    orderStatus: "Dispatched",
    estimatedDelivery: "2026-09-12"
  }
];
