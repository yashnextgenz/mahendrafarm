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

  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },

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

// ===== Static blog posts (replaces the Prisma BlogPost model) =====
export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string;
  author: string;
  readMinutes: number;
  published: boolean;
  featured: boolean;
  createdAt: string; // ISO date string
  updatedAt: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "bp-why-natural-farming-matters",
    slug: "why-natural-farming-matters",
    title: "Why Natural Farming Matters More Than Ever",
    excerpt:
      "Chemical-free farming isn't a trend — it's a return to how food was always meant to be grown. Here's why it matters for your health and the soil.",
    content: `Natural farming is often mistaken for a marketing label, but at Mahindra Integrated Farm it is the foundation of everything we do. When we avoid synthetic pesticides and fertilisers, we allow the soil to do what it has done for thousands of years — feed plants slowly, hold water, and host a living ecosystem of microbes and insects.

## Healthier food, healthier families

Vegetables grown in living soil have been shown to carry more nutrients and fewer residues. When a tomato ripens on a vine without chemical acceleration, it develops the flavour and texture that supermarket produce has lost. The same is true for milk from grass-fed cows and eggs from free-roaming hens — the difference is something you can taste.

## Soil that lasts generations

Synthetic fertilisers feed the plant directly but starve the soil. Over time, the land becomes dependent on ever-larger inputs. Composting, crop rotation and mixed farming — the backbone of our integrated model — rebuild organic matter year after year, so the farm we hand to the next generation is richer than the one we received.

## A small choice, a large impact

Every basket of natural produce is a vote for cleaner water, healthier farmers and a livelier countryside. We are proud to grow food the honest way, and grateful for every household, restaurant and distributor who chooses it with us.`,
    category: "Sustainability",
    coverImage: `${I}/vegetables.jpg`,
    author: "Mahindra Integrated Farm",
    readMinutes: 4,
    published: true,
    featured: true,
    createdAt: "2025-08-12",
    updatedAt: "2025-08-12",
  },
  {
    id: "bp-integrated-farming-explained",
    slug: "integrated-farming-explained",
    title: "Integrated Farming Explained: How Our Farm Works as One Ecosystem",
    excerpt:
      "Dairy, poultry, vegetables and plantations all on one farm — here's how the pieces fit together and why nothing goes to waste.",
    content: `An integrated farm is not just many farms side by side. It is a single living system where every activity supports the others. At Mahindra Integrated Farm we run dairy, poultry, goat, fish, mushroom, vegetable and plantation units — and they all share resources.

## The loop, in plain terms

Crop residue that would otherwise be burnt or discarded becomes feed for goats and cattle. Their manure is composted and returned to the vegetable beds and plantations. Pond water irrigates leafy greens. Mushroom substrate enriches the soil. Nothing is wasted, and every output becomes another activity's input.

## Why this matters for you

Because resources are reused rather than bought new, our cost of production stays lower and our quality stays high. That is how we offer genuinely fresh produce at fair prices — without compromising on the natural practices we believe in.

## Stability for farmers, freshness for customers

A diversified farm gives our partner farmers a stable, year-round income instead of a single seasonal harvest. For you, it means a wider basket of products from one trusted source — harvested at the right time and delivered quickly.`,
    category: "Farming Practices",
    coverImage: `${I}/farm-diverse.jpg`,
    author: "Mahindra Integrated Farm",
    readMinutes: 5,
    published: true,
    featured: true,
    createdAt: "2025-07-28",
    updatedAt: "2025-07-28",
  },
  {
    id: "bp-from-our-cows-to-your-milk",
    slug: "from-our-cows-to-your-milk",
    title: "From Our Cows To Your Milk: A Day On The Dairy",
    excerpt:
      "What does a morning look like on our dairy farm? Follow the journey from the first milking to the bottle that reaches your kitchen.",
    content: `Fresh milk begins long before sunrise. By 4:30am our dairy team is already in the shed, preparing clean water and fodder for the cows. We milk twice a day, and every drop is handled hygienically, cooled immediately, and moved quickly into the distribution network.

## Cows first, always

Healthy milk comes from healthy, comfortable cows. Our animals are grass-fed, given clean shelter, and never pushed beyond natural yields. We believe a calm cow gives better milk — and our customers can taste the difference.

## From shed to table in hours

Because we control the whole chain — fodder, milking, cooling, packing and delivery — there is no long storage. What reaches your kitchen in the morning was in our cows the evening before. That is what "farm fresh" really means.`,
    category: "Dairy",
    coverImage: `${I}/dairy.jpg`,
    author: "Mahindra Integrated Farm",
    readMinutes: 3,
    published: true,
    featured: false,
    createdAt: "2025-07-10",
    updatedAt: "2025-07-10",
  },
  {
    id: "bp-seasonal-vegetables-guide",
    slug: "seasonal-vegetables-guide",
    title: "A Simple Guide to Seasonal Vegetables in Tamil Nadu",
    excerpt:
      "Eating with the seasons is healthier, tastier and cheaper. Here's a quick guide to what grows when in our region.",
    content: `Eating seasonally is one of the simplest, most powerful ways to eat better. Produce harvested in its natural season is fresher, more nutritious and more affordable — because it didn't have to be forced or shipped far.

## Monsoon (Jun-Sep)

Leafy greens like spinach and amaranth thrive, along with okra, cucumber and bottle gourd. This is also a good time for tubers like yam.

## Post-monsoon (Oct-Dec)

Tomatoes, brinjal, beans, carrots and radish come into their own. This is our richest harvest window for mixed vegetable baskets.

## Cool season (Jan-Mar)

Cabbage, cauliflower, peas and leafy salad greens do well in the milder weather.

## Summer (Apr-May)

While the heat limits some crops, we focus on hardy vegetables and plantation produce like tender coconuts and bananas.

Ask us any time what is in season — your basket will always reflect what the farm is naturally producing.`,
    category: "Vegetables",
    coverImage: `${I}/tomatoes.jpg`,
    author: "Mahindra Integrated Farm",
    readMinutes: 4,
    published: true,
    featured: false,
    createdAt: "2025-06-22",
    updatedAt: "2025-06-22",
  },
  {
    id: "bp-becoming-a-distributor-what-to-expect",
    slug: "becoming-a-distributor-what-to-expect",
    title: "Becoming A Distributor: What To Expect In Your First Month",
    excerpt:
      "Thinking of partnering with us? Here's an honest walk-through of the first 30 days as a Mahindra Integrated Farm distributor.",
    content: `Partnering with a farm brand is a big decision. We want every new distributor to start with clear expectations, so here is what your first month usually looks like.

## Week 1 — Onboarding

After you reach out, we share the product catalogue, margins, minimum order quantities and delivery schedule. We sign a simple agreement and add you to our dispatch list.

## Week 2 — First supply

You receive your starter stock — typically vegetables, dairy and a few plantation products. We help you plan storage and display so freshness is preserved.

## Week 3 — Building your customer base

With product in hand, you begin supplying your existing customers and opening new accounts. We provide basic marketing material and stand-by for any quality questions.

## Week 4 — Review and scale

We review what sold well, what didn't, and adjust your mix. Most distributors place their second, larger order around this point once demand patterns are clear.

If you're considering joining the network, the best first step is a phone call — we'll answer everything honestly before you commit.`,
    category: "Distributor Network",
    coverImage: `${I}/harvest.jpg`,
    author: "Mahindra Integrated Farm",
    readMinutes: 4,
    published: true,
    featured: true,
    createdAt: "2025-06-05",
    updatedAt: "2025-06-05",
  },
  {
    id: "bp-the-truth-about-free-range-eggs",
    slug: "the-truth-about-free-range-eggs",
    title: "The Truth About Free-Range Eggs (And Ours)",
    excerpt:
      "Not all eggs labelled 'free-range' are created equal. Here's how we raise our hens and what it means for the eggs you eat.",
    content: `The label "free-range" gets used loosely. For us, it means hens that actually spend their days outdoors — scratching, dust-bathing and foraging on natural greens — not birds that technically have access to a small door.

## How our hens live

Our poultry yards are open, clean and shaded. Hens come and go between shelter and open ground, eat a natural grain-and-greens diet, and live without growth promoters or routine antibiotics. The result is eggs with rich, deeply coloured yolks and real flavour.

## What to look for

When buying eggs, ask where they come from and how the hens are kept. A genuinely free-range egg will vary slightly in size and colour — that variation is a sign of a real flock, not a factory line.`,
    category: "Poultry",
    coverImage: `${I}/poultry.jpg`,
    author: "Mahindra Integrated Farm",
    readMinutes: 3,
    published: true,
    featured: false,
    createdAt: "2025-05-18",
    updatedAt: "2025-05-18",
  },
];
