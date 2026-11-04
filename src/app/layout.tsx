import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { CookieConsent } from "@/components/site/CookieConsent";
import { ThemeProvider } from "@/components/site/ThemeProvider";
import { SITE } from "@/data/site";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mahindraintegratedfarm.example"),
  title: {
    default: "Mahindra Integrated Farm | Natural Farming & Sustainable Agriculture",
    template: "%s | Mahindra Integrated Farm",
  },
  description:
    "Mahindra Integrated Farm provides naturally grown farm products through sustainable and integrated farming practices including vegetables, dairy, poultry, plantations and more.",
  keywords: [
    "Mahindra Integrated Farm",
    "natural farming",
    "sustainable agriculture",
    "organic farm",
    "dairy farming",
    "poultry farming",
    "vegetables",
    "plantation",
  ],
  authors: [{ name: "Mahindra Integrated Farm" }],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "64x64" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Mahindra Integrated Farm | Natural Farming, Better Living",
    description:
      "Naturally grown farm products through sustainable and integrated farming practices.",
    siteName: "Mahindra Integrated Farm",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahindra Integrated Farm",
    description:
      "Natural Farming, Better Living. Sustainable integrated agriculture.",
  },
};

// JSON-LD structured data for rich search results (AgriculturalBusiness)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AgriculturalBusiness",
  name: "Mahindra Integrated Farm",
  description:
    "Integrated sustainable farming company offering naturally grown vegetables, dairy, poultry and plantation products.",
  slogan: "Natural Farming, Better Living",
  telephone: `+${SITE.phoneRaw}`,
  email: SITE.email,
  url: "https://mahindraintegratedfarm.example",
  image: "https://mahindraintegratedfarm.example/images/hero.jpg",
  logo: "https://mahindraintegratedfarm.example/logo.jpeg",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "1, Mahindra Integrated Farm, Seminar Road, Kariyamanickam West, Sinnamur, Borivell, Tiruppallipatti",
    addressLocality: "Tiruppallipatti",
    addressRegion: "Tamil Nadu",
    postalCode: "621213",
    addressCountry: "IN",
  },
  areaServed: "Tamil Nadu, India",
  makesOffer: [
    "Fresh Vegetables",
    "Flowers",
    "Dairy Products",
    "Poultry Products",
    "Groundnuts & Pulses",
    "Fruits",
    "Plantation Products",
  ],
  knowsAbout: [
    "Dairy Farming",
    "Poultry Farming",
    "Goat Farming",
    "Fish Farming",
    "Mushroom Cultivation",
    "Vegetable Farming",
    "Coconut Plantation",
    "Banana Plantation",
    "Teak Plantation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${poppins.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <BackToTop />
          <CookieConsent />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
