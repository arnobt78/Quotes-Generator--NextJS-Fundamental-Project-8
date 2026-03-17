"use client";

import { Loader2 } from "lucide-react";
import { type ButtonHTMLAttributes } from "react";
import { RippleButton } from "./RippleButton";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  loading?: boolean;
}

/**
 * Reusable button with ripple; supports primary (purple) and secondary (teal) variants.
 * When loading, shows spinner and "Generating..." and is disabled.
 */
export function Button({
  variant = "primary",
  className = "",
  children,
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "w-full sm:w-72 h-14 rounded-full border-none font-body text-sm font-bold uppercase tracking-wider text-white cursor-pointer shadow-xl transition-transform active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  const variants = {
    primary:
      "bg-gradient-to-l from-indigo-500 to-indigo-400 hover:from-indigo-600 hover:to-indigo-500",
    secondary:
      "bg-gradient-to-l from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-600",
  };
  return (
    <RippleButton
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled ?? loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
          <span>Generating…</span>
        </>
      ) : (
        children
      )}
    </RippleButton>
  );
}
