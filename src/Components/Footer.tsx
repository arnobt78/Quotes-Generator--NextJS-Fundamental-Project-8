import { Copyright } from "lucide-react";

/** Site footer: copyright + current year, centered. Rendered in root layout. */
export function Footer() {
  return (
    <footer className="w-full py-6 flex items-center justify-center text-center">
      <p className="font-body text-sm text-gray-300 flex items-center justify-center gap-1.5">
        <Copyright className="w-4 h-4" aria-hidden />
        {new Date().getFullYear()}. All rights reserved.
      </p>
    </footer>
  );
}
