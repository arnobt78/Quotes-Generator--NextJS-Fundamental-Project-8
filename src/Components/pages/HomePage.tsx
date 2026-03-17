"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, RefreshCw, BookMarked } from "lucide-react";
import { toast } from "sonner";
import { useQuote } from "@/hooks/useQuote";
import { useFavorites } from "@/context/FavoritesContext";
import { QuoteCard } from "@/Components/QuoteCard";
import { FavoritesList } from "@/Components/FavoritesList";
import { FloatingBalloons } from "@/Components/FloatingBalloons";
import { Button } from "@/Components/ui/Button";
import { RippleButton } from "@/Components/ui/RippleButton";
import { EducationalSection } from "@/Components/EducationalSection";
import type { Quote } from "@/types/quote";

/** Shorten quote text for toast descriptions; adds "..." when over maxLen */
function truncateQuote(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 3).trim() + "...";
}

/**
 * Home page (CSR): all quote and favorites state lives here.
 * Uses useQuote (custom hook) and useFavorites (Context) for separation of concerns.
 */
export default function HomePage() {
  const apiKey = process.env.NEXT_PUBLIC_QUOTE_API_KEY ?? "";
  /** Toast when a new quote is successfully loaded */
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
  /** Passed to FloatingBalloons for mouse position (repel + wind) */
  const cardRef = useRef<HTMLDivElement>(null);

  /** Add current quote to favorites and show toast; or "Already in favorites" if duplicate */
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

  /** Either the favorites panel or the main quote + buttons; AnimatePresence switches between them */
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
      {/* Main card: gradient background, title, heart, balloons, and mainCardContent */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-h-[70vh] aspect-[3/2] rounded-[3rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col bg-gradient-to-br from-neutral-950/90 via-neutral-800/90 to-neutral-950/90 backdrop-blur-xs"
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

        {/* Decorative balloons: wander + mouse repel/wind; need cardRef for mousemove */}
        <FloatingBalloons cardRef={cardRef} />

        <AnimatePresence mode="wait">{mainCardContent}</AnimatePresence>
      </motion.div>

      <EducationalSection />
    </div>
  );
}
