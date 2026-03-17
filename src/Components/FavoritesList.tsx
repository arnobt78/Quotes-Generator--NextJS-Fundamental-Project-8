"use client";

import { X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Quote } from "@/types/quote";
import { RippleButton } from "@/Components/ui/RippleButton";

interface FavoritesListProps {
  favorites: Quote[];
  onClose: () => void;
  onRemove: (index: number) => void;
}

/**
 * Slide-over panel listing saved quotes; each item has a remove button.
 * Uses scrollbar-favorites (globals.css) for transparent track + green thumb.
 */
export function FavoritesList({
  favorites,
  onClose,
  onRemove,
}: FavoritesListProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 bg-gradient-to-l from-teal-900/80 via-teal-800/80 to-teal-900/80 backdrop-blur-sm p-8 sm:p-12 overflow-y-auto rounded-3xl scrollbar-favorites"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-display text-4xl sm:text-5xl text-white">
          Favorites
        </h2>
        <RippleButton
          type="button"
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors shrink-0"
          aria-label="Close favorites"
        >
          <X className="w-6 h-6" aria-hidden />
        </RippleButton>
      </div>
      <div className="flex flex-col gap-6">
        {/* popLayout: smooth layout when items are removed */}
        <AnimatePresence mode="popLayout">
          {favorites.map((fav, index) => (
            <motion.div
              key={`${fav.text}-${fav.author}-${index}`}
              layout
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.2 }}
              className="flex gap-4 items-center"
            >
              <RippleButton
                type="button"
                onClick={() => onRemove(index)}
                className="flex-shrink-0 p-1 rounded text-red-400 hover:text-red-300 hover:bg-white/10 transition-colors self-center"
                aria-label={`Remove quote by ${fav.author}`}
              >
                <Trash2 className="w-5 h-5" aria-hidden />
              </RippleButton>
              <div className="flex-1 min-w-0">
                <p className="text-white text-base sm:text-lg font-body">
                  {fav.text}
                </p>
                <p className="font-accent text-right text-gray-200 text-sm mt-1">
                  — {fav.author}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {/* Empty state when user has not saved any quote yet */}
      {favorites.length === 0 && (
        <p className="text-white/80 font-body text-center py-8">
          No favorites yet. Add quotes from the main screen!
        </p>
      )}
    </motion.div>
  );
}
