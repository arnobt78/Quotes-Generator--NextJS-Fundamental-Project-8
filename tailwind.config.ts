import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "9xl": "96rem",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-comfortaa)", "sans-serif"],
        accent: ["var(--font-briem)", "cursive"],
      },
      keyframes: {
        ripple: {
          "0%": { width: "0", height: "0", opacity: "0.5" },
          "100%": { width: "400px", height: "400px", opacity: "0" },
        },
      },
      animation: {
        ripple: "ripple 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
