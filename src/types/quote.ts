/**
 * Shared type for a single quote from TheQuote API.
 * Used across components, hooks, and API layer so everyone agrees on shape.
 */
export interface Quote {
  text: string;
  author: string;
}

/**
 * Raw API response shape from TheQuote API random endpoint.
 * We map this to Quote (same fields here; allows future API changes).
 */
export interface QuoteApiResponse {
  text: string;
  author: string;
}
