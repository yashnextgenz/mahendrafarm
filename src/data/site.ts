// Centralized site data for Mahindra Integrated Farm.
// All images are locally generated agricultural photography in /public/images/.
// Replace `src` values with your own assets when ready — the structure is
// intentionally centralized so images/content can be swapped without touching
// individual components.

export const SITE = {
  name: "MAHINDRA INTEGRATED FARM",
  shortName: "Mahindra",
  tagline: "Natural Farming, Better Living",
  phone: "97895 40045",
  phoneRaw: "919789540045",
  email: "selvomehan@gmail.com",
  address: [
    "1, Mahindra Integrated Farm,",
    "Seminar Road, Kariyamanickam West,",
    "Sinnamur, Borivell, Tiruppallipatti,",
    "Tamil Nadu - 621213",
  ],
  social: {
    facebook: "#",
    instagram: "#",
    whatsapp: "#",
    youtube: "#",
  },
} as const;

export type NavItem = { label: string; href: string };

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Farming Activities", href: "/farming-activities" },
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Distributor", href: "/distributor" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/gallery#contact" },
];

export const FOOTER_ACTIVITIES = [
  "Dairy Farming",
  "Poultry Farming",
  "Goat Farming",
  "Fish Farming",
  "Mushroom Cultivation",
  "Flower Cultivation",
  "Vegetable Farming",
  "More...",
];

// Local image paths
const I = "/images";

export type Activity = {
  name: string;
  image: string;
  description: string;
};

export const ACTIVITIES: Activity[] = [
  {
    name: "Dairy Farming",
    image: `${I}/dairy.jpg`,
    description:
      "Pure breed cows raised on natural fodder producing fresh, wholesome milk every morning.",
  },
  {
    name: "Poultry Farming",
    image: `${I}/poultry.jpg`,
    description:
      "Free-range hens in open, clean shelters giving farm-fresh eggs and healthy poultry.",
  },
  {
    name: "Goat Farming",
    image: `${I}/goat.jpg`,
    description:
      "Hardy, well-nourished goat breeds reared with traditional and modern care.",
  },
  {
    name: "Fish Farming",
    image: `${I}/fish.jpg`,
    description:
      "Clean water ponds nurturing fresh water fish through sustainable aquaculture.",
  },
  {
    name: "Mushroom Cultivation",
    image: `${I}/mushroom.jpg`,
    description:
      "Hygienically grown mushrooms in climate-controlled, chemical-free environments.",
  },
  {
    name: "Vetiver Farming",
    image: `${I}/vetiver.jpg`,
    description:
      "Aromatic vetiver roots cultivated for natural essential oils and soil conservation.",
  },
  {
    name: "Flower Cultivation",
    image: `${I}/flowers.jpg`,
    description:
      "Seasonal blooms grown with organic practices for vibrant, long-lasting flowers.",
  },
  {
    name: "Vegetable Farming",
    image: `${I}/vegetables.jpg`,
    description:
      "Garden-fresh vegetables cultivated naturally for healthy everyday meals.",
  },
  {
    name: "Groundnut Farming",
    image: `${I}/groundnut.jpg`,
    description:
      "Nutrient-rich groundnuts grown in fertile red soils with minimal intervention.",
  },
  {
    name: "Coconut Plantation",
    image: `${I}/coconut.jpg`,
    description:
      "Tall coconut palms yielding tender and mature coconuts throughout the year.",
  },
  {
    name: "Banana Plantation",
    image: `${I}/banana.jpg`,
    description:
      "Sweet, naturally ripened bananas from organically maintained plantations.",
  },
  {
    name: "Teak Plantation",
    image: `${I}/teak.jpg`,
    description:
      "Long-term teak forestry for sustainable timber and ecological balance.",
  },
];

export type ProductCategory =
  | "Vegetables"
  | "Flowers"
  | "Dairy"
  | "Poultry"
  | "Pulses"
  | "Fruits"
  | "Plantation";

export type Product = {
  name: string;
  category: ProductCategory;
  image: string;
  description: string;
  badge: string;
};

export const PRODUCT_FILTERS: ("All" | ProductCategory)[] = [
  "All",
  "Vegetables",
  "Flowers",
  "Dairy",
  "Poultry",
  "Pulses",
  "Fruits",
  "Plantation",
];

export const PRODUCTS: Product[] = [
  {
    name: "Fresh Vegetables",
    category: "Vegetables",
    image: `${I}/vegetables.jpg`,
    description:
      "Hand-picked seasonal vegetables — tomatoes, leafy greens, carrots, beans and more, harvested at peak freshness.",
    badge: "100% Natural",
  },
  {
    name: "Marigold & Roses",
    category: "Flowers",
    image: `${I}/flowers.jpg`,
    description:
      "Vibrant, aromatic flowers grown for festivals, worship and decoration, freshly cut to order.",
    badge: "Fresh Cut",
  },
  {
    name: "Pure Cow Milk",
    category: "Dairy",
    image: `${I}/dairy.jpg`,
    description:
      "Unadulterated, full-cream milk from grass-fed cows — delivered fresh every morning.",
    badge: "Farm Fresh",
  },
  {
    name: "Free-Range Eggs",
    category: "Poultry",
    image: `${I}/poultry.jpg`,
    description:
      "Naturally produced eggs from free-roaming hens fed on natural grain and greens.",
    badge: "Free-Range",
  },
  {
    name: "Groundnuts & Pulses",
    category: "Pulses",
    image: `${I}/groundnut.jpg`,
    description:
      "Sun-dried groundnuts, toor dal and pulses — protein-rich, naturally cleaned and packed.",
    badge: "Sun-Dried",
  },
  {
    name: "Seasonal Fruits",
    category: "Fruits",
    image: `${I}/fruits.jpg`,
    description:
      "Naturally ripened bananas, mangoes and papayas from our own plantation, harvested at the right time.",
    badge: "Tree-Ripened",
  },
  {
    name: "Coconut & Banana",
    category: "Plantation",
    image: `${I}/coconut.jpg`,
    description:
      "Tender and mature coconuts, bananas and plantation produce grown with eco-friendly practices.",
    badge: "Eco-Grown",
  },
  {
    name: "Fresh Milk Products",
    category: "Dairy",
    image: `${I}/milk-products.jpg`,
    description:
      "Paneer, ghee, curd and butter prepared in small batches from pure farm milk.",
    badge: "Small-Batch",
  },
];

export type GalleryCategory =
  | "All"
  | "Farms"
  | "Vegetables"
  | "Livestock"
  | "Harvest"
  | "Team"
  | "Activities";

export type GalleryItem = {
  src: string;
  alt: string;
  category: Exclude<GalleryCategory, "All">;
  span?: boolean;
};

export const GALLERY_FILTERS: GalleryCategory[] = [
  "All",
  "Farms",
  "Vegetables",
  "Livestock",
  "Harvest",
  "Team",
  "Activities",
];

export const GALLERY: GalleryItem[] = [
  {
    src: `${I}/farmland-wide.jpg`,
    alt: "Lush green farmland under a bright sky",
    category: "Farms",
    span: true,
  },
  {
    src: `${I}/vegetables.jpg`,
    alt: "Rows of fresh green vegetables growing in the farm",
    category: "Vegetables",
  },
  {
    src: `${I}/dairy.jpg`,
    alt: "Dairy cow grazing in a green pasture",
    category: "Livestock",
  },
  {
    src: `${I}/harvest.jpg`,
    alt: "Golden harvest at the farm with farmers working",
    category: "Harvest",
    span: true,
  },
  {
    src: `${I}/about-who.jpg`,
    alt: "Farm team working together in the fields",
    category: "Team",
  },
  {
    src: `${I}/flowers.jpg`,
    alt: "Blooming marigold flower beds at the farm",
    category: "Activities",
  },
  {
    src: `${I}/about-vision.jpg`,
    alt: "Open farmland with rolling green hills",
    category: "Farms",
  },
  {
    src: `${I}/tomatoes.jpg`,
    alt: "Ripe red tomatoes on the vine",
    category: "Vegetables",
    span: true,
  },
  {
    src: `${I}/poultry.jpg`,
    alt: "Free-range hens in the poultry yard",
    category: "Livestock",
  },
  {
    src: `${I}/groundnut.jpg`,
    alt: "Groundnut harvest pulled from the soil",
    category: "Harvest",
  },
  {
    src: `${I}/farm-diverse.jpg`,
    alt: "Diverse integrated farm with fields, pond and trees",
    category: "Activities",
  },
  {
    src: `${I}/banana.jpg`,
    alt: "Banana plantation with bunches of green bananas",
    category: "Activities",
  },
];

// Hero & section images
export const HERO_IMAGE = `${I}/hero.jpg`;
export const WHY_CHOOSE_IMAGE = `${I}/why-choose.jpg`;
export const ABOUT_HERO_IMAGE = `${I}/farmland-wide.jpg`;
export const ABOUT_WHO_IMAGE = `${I}/about-who.jpg`;
export const ABOUT_VISION_IMAGE = `${I}/about-vision.jpg`;
export const ABOUT_MISSION_IMAGE = `${I}/about-mission.jpg`;
export const FARMING_HERO_IMAGE = `${I}/farm-diverse.jpg`;
export const PRODUCTS_HERO_IMAGE = `${I}/harvest.jpg`;
export const GALLERY_HERO_IMAGE = `${I}/farmland-wide.jpg`;
export const BLOG_HERO_IMAGE = `${I}/farm-diverse.jpg`;

export const STATS = [
  { value: "10+", label: "Farming Activities" },
  { value: "100%", label: "Natural Practices" },
  { value: "500+", label: "Farm Partners" },
  { value: "1000+", label: "Happy Customers" },
];

export const WHY_CHOOSE_POINTS = [
  "Natural & Chemical Free Farming",
  "High Quality & Fresh Products",
  "Sustainable & Eco-friendly Practices",
  "Timely Delivery Through Trusted Network",
  "Supporting Local Farmers & Community",
];

export const DISTRIBUTOR_BENEFITS = [
  "Quality farm products",
  "Trusted brand",
  "Consistent supply",
  "Growing market opportunity",
  "Marketing support",
];

export const DISTRIBUTOR_STEPS = [
  {
    title: "Reach Out",
    description:
      "Share your details through the contact form or call us. We'll discuss your region and interest.",
  },
  {
    title: "Connect & Verify",
    description:
      "Our team connects with you, shares product catalog, margins and terms transparently.",
  },
  {
    title: "Start Distributing",
    description:
      "Sign the agreement, receive your starter kit and begin supplying natural farm products.",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  location: string;
  rating: number;
  quote: string;
  initials: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Lakshmi Narayanan",
    role: "Household Customer",
    location: "Chennai, TN",
    rating: 5,
    initials: "LN",
    quote:
      "The vegetables from Mahindra Integrated Farm taste just like the ones from my grandmother's garden. You can tell they're grown without chemicals. Delivery is always on time.",
  },
  {
    name: "Suresh Kumar",
    role: "Restaurant Owner",
    location: "Trichy, TN",
    rating: 5,
    initials: "SK",
    quote:
      "We switched to their dairy and poultry six months ago. Our customers notice the difference in freshness. Reliable supply and honest pricing — exactly what a restaurant needs.",
  },
  {
    name: "Priya Subramanian",
    role: "Distributor Partner",
    location: "Salem, TN",
    rating: 5,
    initials: "PS",
    quote:
      "Becoming a distributor was the best business decision I made last year. Quality products, consistent supply, and a brand people already trust. My margins keep growing.",
  },
  {
    name: "Dr. Ramesh Vetrivel",
    role: "Wellness Consultant",
    location: "Coimbatore, TN",
    rating: 5,
    initials: "RV",
    quote:
      "I recommend natural farm produce to my clients regularly. The transparency and farming practices here are exactly what sustainable agriculture should look like.",
  },
  {
    name: "Anand Krishnan",
    role: "Retail Store Owner",
    location: "Madurai, TN",
    rating: 5,
    initials: "AK",
    quote:
      "From groundnuts to bananas, every product is clean, fresh and well-packed. My customers ask for Mahindra Farm products by name now. Great partnership.",
  },
  {
    name: "Meena Rajasekar",
    role: "Home Chef",
    location: "Pudukkottai, TN",
    rating: 5,
    initials: "MR",
    quote:
      "The marigold flowers and fresh milk I get from them are genuinely farm-fresh. You can smell the difference. I wouldn't buy from anywhere else now.",
  },
];

export const BLOG_CATEGORIES = [
  "All",
  "Sustainability",
  "Farming Practices",
  "Dairy",
  "Vegetables",
  "Poultry",
  "Distributor Network",
] as const;

export type FAQ = { q: string; a: string };

export const DISTRIBUTOR_FAQS: FAQ[] = [
  {
    q: "What is the minimum order quantity to start as a distributor?",
    a: "There is no heavy upfront commitment. Most new distributors begin with a mixed starter stock of vegetables, dairy and a few plantation products. We agree a sensible minimum based on your region during onboarding — typically tuned so first-time partners can move stock within a week.",
  },
  {
    q: "Which regions do you currently supply?",
    a: "Our distributor network is strongest across Tamil Nadu — including Trichy, Salem, Madurai, Coimbatore, Pudukkottai and Chennai. If you are outside these areas but can manage your own logistics, we are happy to discuss a partnership.",
  },
  {
    q: "How fresh are the products when they reach me?",
    a: "Very. Vegetables are harvested to order, milk is cooled and dispatched the same day, and eggs are collected daily. Depending on your location, stock typically reaches you within 24–48 hours of leaving the farm.",
  },
  {
    q: "Do you provide marketing support?",
    a: "Yes. We share product photography, shelf-ready signage, a short brand story and seasonal highlights. We also feature active distributors in our own channels from time to time.",
  },
  {
    q: "What margins can a distributor expect?",
    a: "Margins vary by product category, but they are transparent and agreed up front before you sign. Dairy and plantation products carry steady, predictable margins; seasonal vegetables can carry higher margins during peak demand. We never change terms mid-agreement.",
  },
  {
    q: "Can I start small and scale up later?",
    a: "Absolutely. Many of our current partners began with a single product line and expanded over a few months. We grow with you — your order size and product mix can evolve as your customer base grows.",
  },
];

export const DISTRIBUTOR_KIT = [
  {
    title: "Product Catalog",
    description: "Full range of fresh produce, dairy, poultry, pulses and plantation products with seasonal availability.",
    icon: "Package",
  },
  {
    title: "Pricing & Margins",
    description: "Transparent, agreed-upfront margins per product category — locked for the term of your agreement.",
    icon: "TrendingUp",
  },
  {
    title: "Branding Kit",
    description: "Shelf-ready signage, product photography, brand story sheet and seasonal marketing highlights.",
    icon: "Palette",
  },
  {
    title: "Logistics Support",
    description: "Scheduled dispatch from the farm, cold-chain guidance for dairy, and packing standards.",
    icon: "Truck",
  },
];

export const DISTRIBUTOR_REGIONS = [
  "Trichy",
  "Salem",
  "Madurai",
  "Coimbatore",
  "Chennai",
  "Pudukkottai",
  "Tiruchirappalli District",
  "Perambalur",
];

export const DISTRIBUTOR_TESTIMONIALS = [
  {
    quote:
      "I started with just vegetables six months ago. Now I supply dairy and plantation products too — my margins have doubled and my customers trust the brand.",
    name: "Priya Subramanian",
    role: "Distributor, Salem",
    initials: "PS",
  },
  {
    quote:
      "The supply is consistent, the quality is honest, and the team responds within a day. That's rare in this trade.",
    name: "Anand Krishnan",
    role: "Retail Partner, Madurai",
    initials: "AK",
  },
  {
    quote:
      "What I appreciate most is the transparency. No surprise price changes, no last-minute stock issues. A genuine partnership.",
    name: "Suresh Kumar",
    role: "Restaurant Supplier, Trichy",
    initials: "SK",
  },
];

export const GENERAL_FAQS: FAQ[] = [
  {
    q: "Are your products genuinely chemical-free?",
    a: "Yes. We follow natural farming practices across all our activities — no synthetic pesticides or chemical fertilisers. Our vegetables are harvested at the right time, our milk comes from grass-fed cows, and our eggs come from free-roaming hens. You can taste and see the difference.",
  },
  {
    q: "How fresh are the products when they reach me?",
    a: "Very. Vegetables are harvested to order, milk is cooled and dispatched the same day, and eggs are collected daily. Depending on your location, stock typically reaches you within 24–48 hours of leaving the farm.",
  },
  {
    q: "Can I visit the farm before ordering?",
    a: "We welcome genuine enquiries. If you're a prospective distributor, a restaurant buyer, or a regular household customer who wants to see our practices first-hand, reach out and we'll arrange a visit by appointment.",
  },
  {
    q: "Do you deliver outside Tamil Nadu?",
    a: "Our direct delivery network is strongest across Tamil Nadu. For orders further afield, we work through our distributor partners and trusted logistics — please contact us with your location and we'll let you know what's possible.",
  },
  {
    q: "What is the minimum order for home delivery?",
    a: "There is no strict minimum for local household orders, though a small basket helps us keep delivery sustainable. For specific products like dairy or flowers, ask us and we'll confirm the practical minimum for your area.",
  },
  {
    q: "How do I pay for my order?",
    a: "We accept UPI, bank transfer and cash on delivery (for established customers in served regions). Your distributor or our team will share the exact payment details when you place an order.",
  },
];

export type JobOpening = {
  id: string;
  title: string;
  type: "Full-time" | "Part-time" | "Contract" | "Seasonal";
  location: string;
  category: string;
  description: string;
  responsibilities: string[];
};

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: "field-supervisor",
    title: "Farm Field Supervisor",
    type: "Full-time",
    location: "Tiruppallipatti, Tamil Nadu",
    category: "Operations",
    description:
      "Lead day-to-day field operations across our vegetable and plantation units. You'll coordinate a small team, monitor crop health, and ensure our natural farming practices are followed consistently.",
    responsibilities: [
      "Supervise daily planting, weeding and harvesting activities",
      "Train and guide farm workers on natural farming methods",
      "Monitor crop health and report issues to the farm manager",
      "Maintain accurate records of yields and inputs",
    ],
  },
  {
    id: "dairy-attendant",
    title: "Dairy Farm Attendant",
    type: "Full-time",
    location: "Tiruppallipatti, Tamil Nadu",
    category: "Livestock",
    description:
      "Care for our dairy herd through morning and evening milking cycles. Ensure animal welfare, cleanliness, and the hygienic handling of milk from cow to cooling tank.",
    responsibilities: [
      "Perform twice-daily milking following hygiene protocols",
      "Feed, water and monitor the health of dairy cows",
      "Clean and maintain the dairy shelter and equipment",
      "Assist with cooling and initial quality checks of milk",
    ],
  },
  {
    id: "delivery-coordinator",
    title: "Delivery & Logistics Coordinator",
    type: "Full-time",
    location: "Trichy / Tiruppallipatti, Tamil Nadu",
    category: "Logistics",
    description:
      "Coordinate the dispatch of fresh produce, dairy and poultry to our customers and distributors. Ensure timely, cold-chain-compliant delivery across Tamil Nadu.",
    responsibilities: [
      "Plan and schedule daily delivery routes",
      "Coordinate with drivers, distributors and the farm team",
      "Track orders and resolve delivery issues promptly",
      "Maintain delivery records and customer feedback",
    ],
  },
  {
    id: "seasonal-harvest-helper",
    title: "Seasonal Harvest Helper",
    type: "Seasonal",
    location: "Tiruppallipatti, Tamil Nadu",
    category: "Operations",
    description:
      "Support our team during peak harvest seasons. A great way to experience farm life and learn natural farming practices first-hand.",
    responsibilities: [
      "Assist with harvesting, sorting and packing of produce",
      "Help with general farm upkeep during busy periods",
      "Follow safety and hygiene guidelines",
    ],
  },
];
