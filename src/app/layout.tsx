import type { Metadata } from "next";
import { Bebas_Neue, Comfortaa, Pacifico } from "next/font/google";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { Footer } from "@/Components/Footer";
import { SonnerToaster } from "@/Components/ui/SonnerToaster";
import "./globals.css";

/* ─── Root layout: fonts, metadata (SEO), global structure ─── */
/* Google Fonts via next/font: optimized loading, no layout shift */
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
});

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-briem",
});

const siteUrl = "https://quotes-builder.vercel.app";

/** SEO: title, description, OpenGraph, Twitter cards, robots */
export const metadata: Metadata = {
  title: {
    default:
      "Quotes Generator – Next.js, React, TypeScript, TheQuote API, Tailwind & Framer Motion Learning Project",
    template: "%s | Quotes Generator",
  },
  description:
    "A modern, interactive quotes app built with Next.js, React, TypeScript, and Tailwind. Fetch random quotes from TheQuote API, save favorites, and learn React fundamentals: state, hooks, Context API, and API integration. Beginner-friendly tutorial project.",
  authors: [
    {
      name: "Arnob Mahmud",
      url: "https://www.arnobmahmud.com",
    },
  ],
  referrer: "origin-when-cross-origin",
  creator: "Arnob Mahmud",
  publisher: "Arnob Mahmud",
  keywords: [
    "quotes generator",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "TheQuote API",
    "framer motion",
    "API integration",
    "favorite quotes",
    "React hooks",
    "Context API",
    "learning project",
    "beginner tutorial",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Quotes Generator",
    title:
      "Quotes Generator – Next.js, React, TypeScript & Tailwind Learning Project",
    description:
      "Fetch random quotes, save favorites, and learn React fundamentals. Built with Next.js, TypeScript, Tailwind, and TheQuote API.",
    images: ["/favicon.ico"],
  },
  twitter: {
    card: "summary",
    title: "Quotes Generator – React & Next.js Learning Project",
    description:
      "Learn React fundamentals with this interactive quotes app. TheQuote API, TypeScript, Tailwind.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/** Root layout: wraps all pages; provides fonts, providers, and main shell */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${comfortaa.variable} ${pacifico.variable}`}
      suppressHydrationWarning
    >
      <body
        className="font-body antialiased min-h-screen relative"
        suppressHydrationWarning
      >
        {/* Screen overlay: darker top/bottom for background; pointer-events-none so clicks pass through */}
        <div
          className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-b from-black/25 via-transparent to-black/25"
          aria-hidden
        />
        {/* Toast notifications (Sonner) – e.g. "Added to favorites" */}
        <SonnerToaster />
        <div className="relative z-10 w-full max-w-9xl mx-auto px-4 sm:px-6 min-h-screen flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* FavoritesProvider: any child can use useFavorites() to read/add/remove favorites */}
            <FavoritesProvider>{children}</FavoritesProvider>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
