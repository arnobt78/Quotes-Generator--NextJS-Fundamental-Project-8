/**
 * Shared type for a single quote from TheQuote API.
 * Used across components, hooks, and API layer.
 */
export interface Quote {
  text: string;
  author: string;
}

/**
 * API response shape from TheQuote API random endpoint.
 */
export interface QuoteApiResponse {
  text: string;
  author: string;
}
