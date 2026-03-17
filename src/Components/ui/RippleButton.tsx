"use client";

import {
  useRef,
  useState,
  useCallback,
  type MouseEvent,
  type ReactNode,
  type ButtonHTMLAttributes,
} from "react";

interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

/**
 * Button that shows a ripple effect at click position. Uses Tailwind animate-ripple (see tailwind.config).
 * Used by Button component and by icon-only buttons (heart, close, trash).
 */
export function RippleButton({
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  ...rest
}: RippleButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const idRef = useRef(0);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const button = buttonRef.current;
      if (!button || disabled) return;

      /* Ripple at click position (relative to button) */
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = ++idRef.current;
      setRipples((prev) => [...prev, { x, y, id }]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);

      onClick?.(e);
    },
    [onClick, disabled]
  );

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
      {...rest}
    >
      {children}
      {/* Each ripple: expands from (x,y), then removed after 600ms */}
      {ripples.map(({ x, y, id }) => (
        <span
          key={id}
          className="absolute rounded-full bg-white/40 pointer-events-none animate-ripple"
          style={{
            left: x,
            top: y,
            width: 0,
            height: 0,
            transform: "translate(-50%, -50%)",
          }}
          aria-hidden
        />
      ))}
    </button>
  );
}
