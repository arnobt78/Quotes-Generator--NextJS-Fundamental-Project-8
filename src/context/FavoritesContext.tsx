"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Quote } from "@/types/quote";

/** Shape of the context value consumed by useFavorites() */
interface FavoritesContextValue {
  favorites: Quote[];
  addFavorite: (quote: Quote) => void;
  removeFavorite: (index: number) => void;
  isInFavorites: (quote: Quote) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

interface FavoritesProviderProps {
  children: ReactNode;
}

/**
 * Provides favorites list and add/remove actions to the tree.
 * Wrap the app (or a subtree) so any component can call useFavorites() without prop drilling.
 */
export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Quote[]>([]);

  /** Add quote if not already in list (match by text + author) */
  const addFavorite = useCallback((quote: Quote) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (f) => f.text === quote.text && f.author === quote.author
      );
      if (exists) return prev;
      return [...prev, quote];
    });
  }, []);

  /** Remove by array index */
  const removeFavorite = useCallback((index: number) => {
    setFavorites((prev) => prev.filter((_, i) => i !== index));
  }, []);

  /** Check if a quote is already in favorites (for "Already in favorites" toast) */
  const isInFavorites = useCallback(
    (quote: Quote) =>
      favorites.some(
        (f) => f.text === quote.text && f.author === quote.author
      ),
    [favorites]
  );

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      isInFavorites,
    }),
    [favorites, addFavorite, removeFavorite, isInFavorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

/** Hook: use only inside a tree wrapped by FavoritesProvider */
export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return ctx;
}
