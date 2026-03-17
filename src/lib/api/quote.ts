import type { Quote, QuoteApiResponse } from "@/types/quote";

const QUOTE_API_URL = "https://thequoteapi.com/api/quotes/random/";

/**
 * Fetches a random quote from TheQuote API.
 * Requires NEXT_PUBLIC_QUOTE_API_KEY in env (used client-side).
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
