"use client";

import { useCallback, useState } from "react";
import { fetchRandomQuote } from "@/lib/api/quote";
import type { Quote } from "@/types/quote";

/** Shown before first API call; keeps UI from being empty */
const DEFAULT_QUOTE: Quote = {
  text: "Ask not what your country can do for you; ask what you can do for your country",
  author: "John Kennedy",
};

/**
 * Custom hook: current quote, loading, error, and fetchNewQuote.
 * onSuccess callback (e.g. toast) runs after a successful fetch.
 */
export function useQuote(
  apiKey: string,
  options?: { onSuccess?: (quote: Quote) => void }
) {
  const [quote, setQuote] = useState<Quote>(DEFAULT_QUOTE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const onSuccess = options?.onSuccess;

  const fetchNewQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const next = await fetchRandomQuote(apiKey);
      setQuote(next);
      onSuccess?.(next);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load quote");
    } finally {
      setLoading(false);
    }
  }, [apiKey, onSuccess]);

  return { quote, loading, error, fetchNewQuote };
}
