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
  { label: "Distributor Network", href: "/gallery#distributor" },
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
