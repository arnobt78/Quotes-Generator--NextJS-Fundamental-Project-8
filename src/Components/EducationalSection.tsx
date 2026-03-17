"use client";

import { BookOpen, Zap, Code, Server, Share2, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

/**
 * Short educational block for beginners: explains React concepts used in this app.
 */
export function EducationalSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="w-full max-w-2xl mx-auto mt-8 sm:mt-12 p-6 rounded-2xl bg-white/60 backdrop-blur border border-white/80 shadow-lg"
    >
      <h3 className="font-display text-2xl sm:text-3xl text-gray-800 mb-4 flex items-center gap-2">
        <BookOpen className="w-7 h-7 text-indigo-600" aria-hidden />
        How this app works
      </h3>
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className="font-body text-gray-700 text-sm sm:text-base space-y-2 list-none pl-0"
      >
        <motion.li variants={item} className="flex items-start gap-2">
          <Zap className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" aria-hidden />
          <span>
            <strong>State</strong>: The current quote and favorites list are held in React state (useState).
          </span>
        </motion.li>
        <motion.li variants={item} className="flex items-start gap-2">
          <Code className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" aria-hidden />
          <span>
            <strong>Hooks</strong>: useQuote fetches from the API; useFavorites (Context) shares the favorites list.
          </span>
        </motion.li>
        <motion.li variants={item} className="flex items-start gap-2">
          <Server className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" aria-hidden />
          <span>
            <strong>API</strong>: Quotes come from TheQuote API; the key is stored in .env and read via NEXT_PUBLIC_QUOTE_API_KEY.
          </span>
        </motion.li>
        <motion.li variants={item} className="flex items-start gap-2">
          <Share2 className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" aria-hidden />
          <span>
            <strong>Context</strong>: FavoritesProvider lets any component add or remove favorites without passing props down.
          </span>
        </motion.li>
      </motion.ul>
      <div className="mt-6 pt-4 border-t border-gray-200/80">
        <h4 className="font-display text-lg text-gray-700 mb-2 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" aria-hidden />
          Quick tips
        </h4>
        <ul className="font-body text-gray-600 text-sm space-y-1 list-disc list-inside">
          <li>Click &quot;New Quote&quot; to fetch a random quote from the API.</li>
          <li>Use the heart icon to open your saved favorites and remove any with the trash icon.</li>
          <li>All buttons use a ripple effect for clear visual feedback.</li>
        </ul>
      </div>
    </motion.section>
  );
}
