import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
