import type { Quote, QuoteApiResponse } from "@/types/quote";

const QUOTE_API_URL = "https://thequoteapi.com/api/quotes/random/";

/**
 * Fetches a random quote from TheQuote API.
 * Auth: api_key header (from NEXT_PUBLIC_QUOTE_API_KEY; used client-side).
 * Throws on non-ok response so callers can show error state.
 */
export async function fetchRandomQuote(apiKey: string): Promise<Quote> {
  const response = await fetch(QUOTE_API_URL, {
    headers: { api_key: apiKey },
  });

  if (!response.ok) {
    throw new Error(`Quote API error: ${response.status}`);
  }

  const data: QuoteApiResponse = await response.json();
  return { text: data.text, author: data.author };
}
