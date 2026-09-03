// Seeds the database with initial blog posts + FAQ data.
// Run with: bun run scripts/seed-blog.ts
import { db } from "../src/lib/db";

type SeedPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string;
  author: string;
  readMinutes: number;
  featured?: boolean;
  createdAt: Date;
};

const I = "/images";

const posts: SeedPost[] = [
  {
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
    featured: true,
    createdAt: new Date("2025-08-12"),
  },
  {
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
    featured: true,
    createdAt: new Date("2025-07-28"),
  },
  {
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
    createdAt: new Date("2025-07-10"),
  },
  {
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
    createdAt: new Date("2025-06-22"),
  },
  {
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
    featured: true,
    createdAt: new Date("2025-06-05"),
  },
  {
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
    createdAt: new Date("2025-05-18"),
  },
];

async function main() {
  console.log("Seeding blog posts...");
  for (const p of posts) {
    const existing = await db.blogPost.findUnique({ where: { slug: p.slug } });
    if (existing) {
      await db.blogPost.update({ where: { slug: p.slug }, data: p });
      console.log("  updated:", p.slug);
    } else {
      await db.blogPost.create({ data: p });
      console.log("  created:", p.slug);
    }
  }
  console.log("Done. Total posts:", await db.blogPost.count());
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
