"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, RefreshCw, BookMarked } from "lucide-react";
import { toast } from "sonner";
import { useQuote } from "@/hooks/useQuote";
import { useFavorites } from "@/context/FavoritesContext";
import { QuoteCard } from "@/Components/QuoteCard";
import { FavoritesList } from "@/Components/FavoritesList";
import { Button } from "@/Components/ui/Button";
import { RippleButton } from "@/Components/ui/RippleButton";
import { EducationalSection } from "@/Components/EducationalSection";
import type { Quote } from "@/types/quote";

function truncateQuote(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 3).trim() + "...";
}

/**
 * Home page (CSR): all quote and favorites state lives here.
 * Uses custom hooks (useQuote) and Context (useFavorites) for a clean separation of concerns.
 */
export default function HomePage() {
  const apiKey = process.env.NEXT_PUBLIC_QUOTE_API_KEY ?? "";
  const handleQuoteSuccess = useCallback((q: Quote) => {
    const short = truncateQuote(q.text, 48);
    toast.success("New quote loaded", {
      description: short ? `"${short}" — ${q.author}` : `— ${q.author}`,
    });
  }, []);
  const { quote, loading, error, fetchNewQuote } = useQuote(apiKey, {
    onSuccess: handleQuoteSuccess,
  });
  const { favorites, addFavorite, removeFavorite, isInFavorites } =
    useFavorites();
  const [showFavorites, setShowFavorites] = useState(false);

  const handleAddToFavorites = () => {
    if (isInFavorites(quote)) {
      toast.info("Already in favorites", {
        description: truncateQuote(quote.text, 56),
      });
      return;
    }
    addFavorite(quote);
    toast.success("Added to favorites", {
      description: `"${truncateQuote(quote.text, 52)}" — ${quote.author}`,
    });
  };

  const mainCardContent = showFavorites ? (
    <FavoritesList
      key="favorites"
      favorites={favorites}
      onClose={() => setShowFavorites(false)}
      onRemove={removeFavorite}
    />
  ) : (
    <motion.div
      key="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 flex flex-col flex-1 min-h-0"
    >
      <div className="flex-1 flex items-center justify-center relative">
        <QuoteCard quote={quote} loading={loading} />
        {error ? (
          <p className="absolute bottom-20 left-1/2 -translate-x-1/2 text-red-400 text-sm font-body">
            {error}
          </p>
        ) : null}
      </div>
      <div className="shrink-0 pt-4 flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 pb-2">
        <Button
          variant="primary"
          onClick={fetchNewQuote}
          loading={loading}
          disabled={loading}
        >
          <RefreshCw className="w-5 h-5" aria-hidden />
          New Quote
        </Button>
        <Button
          variant="secondary"
          onClick={handleAddToFavorites}
          disabled={loading}
        >
          <BookMarked className="w-5 h-5" aria-hidden />
          Add to Favorites
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full flex flex-col items-center justify-center py-8 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-h-[70vh] aspect-[3/2] bg-neutral-800 rounded-[3rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col"
      >
        <div className="flex justify-between items-start shrink-0">
          <h1 className="font-display text-5xl sm:text-6xl text-gray-300 select-none">
            Quote.
          </h1>
          <RippleButton
            type="button"
            onClick={() => setShowFavorites(!showFavorites)}
            className="p-1 rounded-full text-teal-400 hover:text-teal-300 hover:bg-white/5 transition-colors shrink-0"
            aria-label={showFavorites ? "Close favorites" : "Open favorites"}
          >
            <Heart className="w-10 h-10 sm:w-12 sm:h-12" aria-hidden />
          </RippleButton>
        </div>

        {/* Decorative circles (same as original design) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute w-24 sm:w-40 h-24 sm:h-40 bg-gradient-to-t from-amber-400 to-amber-200 rounded-full -top-8 left-1/2 -translate-x-1/2" />
          <div className="absolute w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-t from-amber-400 to-amber-200 rounded-full bottom-40 left-20" />
          <div className="absolute w-24 sm:w-40 h-24 sm:h-40 bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full top-1/2 -translate-y-1/2 -right-8" />
          <div className="absolute w-4 h-4 bg-gradient-to-l from-red-500 to-rose-400 rounded-full top-[30%] left-[20%]" />
        </div>

        <AnimatePresence mode="wait">{mainCardContent}</AnimatePresence>
      </motion.div>

      <EducationalSection />
    </div>
  );
}
