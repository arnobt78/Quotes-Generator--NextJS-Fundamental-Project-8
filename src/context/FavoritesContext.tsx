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
 * Example of React Context API for shared state without prop drilling.
 */
export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Quote[]>([]);

  const addFavorite = useCallback((quote: Quote) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (f) => f.text === quote.text && f.author === quote.author
      );
      if (exists) return prev;
      return [...prev, quote];
    });
  }, []);

  const removeFavorite = useCallback((index: number) => {
    setFavorites((prev) => prev.filter((_, i) => i !== index));
  }, []);

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

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return ctx;
}
