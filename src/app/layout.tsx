import type { Metadata } from "next";
import { Bebas_Neue, Comfortaa, Pacifico } from "next/font/google";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { Footer } from "@/Components/Footer";
import { SonnerToaster } from "@/Components/ui/SonnerToaster";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Quotes Generator – React & Next.js Learning Project",
  description:
    "Learn React fundamentals: state, hooks, Context API, and API integration with this interactive quotes app.",
  icons: { icon: "/favicon.ico", apple: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${comfortaa.variable} ${pacifico.variable}`}
    >
      <body className="font-body antialiased min-h-screen bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200">
        <SonnerToaster />
        <div className="w-full max-w-9xl mx-auto px-4 sm:px-6 min-h-screen flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center">
            <FavoritesProvider>{children}</FavoritesProvider>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
