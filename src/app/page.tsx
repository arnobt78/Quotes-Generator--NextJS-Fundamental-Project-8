import HomePage from "@/Components/pages/HomePage";

/**
 * SSR page: only renders the client page component.
 * All state and data fetching live in HomePage (CSR) for clear separation.
 */
export default function Page() {
  return <HomePage />;
}
