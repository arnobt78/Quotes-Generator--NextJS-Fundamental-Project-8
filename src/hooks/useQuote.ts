"use client";

import { useCallback, useState } from "react";
import { fetchRandomQuote } from "@/lib/api/quote";
import type { Quote } from "@/types/quote";

const DEFAULT_QUOTE: Quote = {
  text: "Ask not what your country can do for you; ask what you can do for your country",
  author: "John Kennedy",
};

/**
 * Hook to manage current quote and loading/error state.
 * Demonstrates custom hook pattern for reusable state + API logic.
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
