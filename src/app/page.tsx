import HomePage from "@/Components/pages/HomePage";

/**
 * App Router home page (SSR).
 * Renders only the client HomePage component; all quote/favorites state and
 * API calls live in HomePage so this route stays server-rendered and fast.
 */
export default function Page() {
  return <HomePage />;
}
