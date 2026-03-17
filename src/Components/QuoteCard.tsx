"use client";

import { motion } from "framer-motion";
import type { Quote } from "@/types/quote";

interface QuoteCardProps {
  quote: Quote;
  loading?: boolean;
}

/**
 * Displays a single quote with decorative quote icons.
 * When loading, shows skeleton lines (animate-pulse). Uses Framer Motion for entrance animation.
 */
export function QuoteCard({ quote, loading }: QuoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col gap-4 max-w-2xl min-w-[16rem] w-full text-center"
    >
      <span
        className="text-4xl text-gray-300 font-body"
        aria-hidden
      >
        &ldquo;
      </span>
      {loading ? (
        <div className="flex flex-col gap-3" aria-busy="true" aria-label="Loading quote">
          <div className="h-5 sm:h-6 bg-gray-600/50 rounded animate-pulse w-full max-w-xl mx-auto" />
          <div className="h-5 sm:h-6 bg-gray-600/50 rounded animate-pulse w-11/12 max-w-lg mx-auto" />
          <div className="h-5 sm:h-6 bg-gray-600/50 rounded animate-pulse w-3/4 max-w-md mx-auto" />
        </div>
      ) : (
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed text-center tracking-wide font-body">
          {quote.text}
        </p>
      )}
      {loading ? (
        <div className="h-4 bg-gray-600/50 rounded animate-pulse w-32 ml-auto" aria-hidden />
      ) : (
        <p className="font-accent text-gray-500 text-sm sm:text-base">
          — {quote.author}
        </p>
      )}
      <span className="text-4xl text-gray-300 font-body block" aria-hidden>
        &rdquo;
      </span>
    </motion.div>
  );
}
