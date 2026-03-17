# Quotes Generator – Next.js, React, TypeScript, TheQuote API, TailwindCSS, Framer Motion Fundamental Project 8

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff69b4)](https://www.framer.com/motion/)

A modern, interactive quotes application built with Next.js, React, TypeScript, and Tailwind CSS. The app fetches random quotes from the [TheQuote API](https://thequoteapi.com/), displays them with author details, and lets you save favorites. Designed as a learning project for React fundamentals, API integration, Context API, custom hooks, and modern UI patterns—including floating balloon animations, ripple buttons, and toast notifications.

- **Live Demo:** [https://quotes-builder.vercel.app/](https://quotes-builder.vercel.app/)

![Screenshot 1](https://github.com/user-attachments/assets/a9c51c54-dfcf-4d50-b0d7-d57fbdabd043)
![Screenshot 2](https://github.com/user-attachments/assets/2211e321-f485-408f-9186-7ff8bd9768ad)

## Table of Contents

1. [Project Summary](#project-summary)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Setup & Installation](#setup--installation)
6. [Environment Variables](#environment-variables)
7. [API & Backend](#api--backend)
8. [Routes & Pages](#routes--pages)
9. [Components & Functionality](#components--functionality)
10. [Reusing Components](#reusing-components)
11. [Libraries & Dependencies](#libraries--dependencies)
12. [Keywords](#keywords)
13. [Learning & Teaching](#learning--teaching)
14. [Conclusion](#conclusion)
15. [License](#license)

---

## Project Summary

This Quotes Generator is a **full-stack learning project** that demonstrates:

- **SSR/CSR separation**: Next.js App Router pages handle server-side rendering; client-side logic lives in components.
- **API integration**: Fetches random quotes from TheQuote API with proper error handling.
- **State management**: React Context API for favorites; custom hooks for quote fetching.
- **Modern UI**: Tailwind CSS, Framer Motion animations, GSAP floating balloons, ripple buttons, Sonner toasts.
- **TypeScript**: Strict typing across the codebase with no `any`.

---

## Features

- **Random Quote Fetching**: Click "New Quote" to load a new quote from TheQuote API.
- **Favorites**: Add quotes to a favorites list; view and remove them via the heart icon.
- **Floating Balloons**: Decorative circles that wander across the card, react to mouse (repel + wind), and avoid overlapping.
- **Ripple Buttons**: All buttons use a ripple effect for clear click feedback.
- **Loading States**: Skeleton loading for quotes; spinner and "Generating…" on the New Quote button.
- **Toast Notifications**: Sonner toasts for "New quote loaded", "Added to favorites", and "Already in favorites".
- **Educational Section**: "How this app works" explains State, Hooks, API, and Context.
- **Responsive Design**: Mobile-first layout with `max-w-9xl` and responsive breakpoints.
- **SEO**: Metadata, OpenGraph, Twitter cards, and favicon configured.

---

## Technology Stack

| Technology           | Purpose                                                      |
| -------------------- | ------------------------------------------------------------ |
| **Next.js 16**       | React framework with App Router, SSR, and file-based routing |
| **React 19**         | UI library with hooks and Context API                        |
| **TypeScript 5.6**   | Type safety and better DX                                    |
| **Tailwind CSS 3.4** | Utility-first styling                                        |
| **Framer Motion 11** | Animations and transitions                                   |
| **GSAP 3.14**        | Floating balloon animations                                  |
| **Lucide React**     | Icon library                                                 |
| **Sonner**           | Toast notifications                                          |
| **TheQuote API**     | External API for random quotes                               |

---

## Project Structure

```bash
quotes-generator/
├── .env.example          # Example env vars (copy to .env)
├── .gitignore
├── eslint.config.mjs    # ESLint flat config
├── next.config.ts       # Next.js config
├── package.json
├── postcss.config.mjs   # PostCSS for Tailwind
├── tailwind.config.ts   # Tailwind theme, fonts, keyframes
├── tsconfig.json
├── vercel.json          # Vercel deployment (framework: nextjs)
├── public/
│   ├── favicon.ico
│   └── hero2.avif       # Background image
└── src/
    ├── app/
    │   ├── globals.css  # Tailwind + custom scrollbar
    │   ├── layout.tsx   # Root layout, fonts, metadata, providers
    │   └── page.tsx     # SSR page (renders HomePage)
    ├── Components/
    │   ├── pages/
    │   │   └── HomePage.tsx    # Main client page
    │   ├── QuoteCard.tsx       # Quote display + skeleton
    │   ├── FavoritesList.tsx  # Favorites panel
    │   ├── FloatingBalloons.tsx # GSAP balloons
    │   ├── EducationalSection.tsx
    │   ├── Footer.tsx
    │   └── ui/
    │       ├── Button.tsx      # Primary/secondary + loading
    │       ├── RippleButton.tsx
    │       └── SonnerToaster.tsx
    ├── context/
    │   └── FavoritesContext.tsx # Favorites state + actions
    ├── hooks/
    │   └── useQuote.ts         # Quote fetch hook
    ├── lib/
    │   └── api/
    │       └── quote.ts        # TheQuote API client
    └── types/
        └── quote.ts            # Quote, QuoteApiResponse
```

---

## Setup & Installation

### Prerequisites

- **Node.js** 18+ ([nodejs.org](https://nodejs.org/))
- **npm** (included with Node.js)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/arnobt78/Quotes-Generator--React.git
cd Quotes-Generator--React

# 2. Install dependencies
npm install

# 3. (Optional) Set up environment variables (see Environment Variables)
cp .env.example .env
# Edit .env and add your API key

# 4. Start development server
npm run dev
```

Visit **<http://localhost:3000>** in your browser.

### Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start dev server (Turbopack) |
| `npm run build` | Production build             |
| `npm run start` | Start production server      |
| `npm run lint`  | Run ESLint (0 warnings)      |

---

## Environment Variables

**You can run this project without any environment variables.** The app will load, but quote fetching will fail until you add an API key.

### Optional: TheQuote API Key

To fetch random quotes, create a `.env` file in the project root:

```bash
# .env
NEXT_PUBLIC_QUOTE_API_KEY=your-api-key-here
```

- **Get your key**: [TheQuote API](https://thequoteapi.com/) – sign up with your email.
- **Why `NEXT_PUBLIC_`?** Next.js only exposes env vars with this prefix to the browser. The quote API is called client-side.
- **Copy from example**: `cp .env.example .env` and replace `your-api-key-here`.

### If Migrating from Vite

The old variable was `VITE_QUOTE_API_KEY`. In Next.js, use `NEXT_PUBLIC_QUOTE_API_KEY`.

---

## API & Backend

### TheQuote API

- **Endpoint**: `GET https://thequoteapi.com/api/quotes/random/`
- **Auth**: Header `api_key: <your-key>`
- **Response**: `{ text: string, author: string }`

### Implementation

The API is called from `src/lib/api/quote.ts`:

```typescript
export async function fetchRandomQuote(apiKey: string): Promise<Quote> {
  const response = await fetch(QUOTE_API_URL, {
    headers: { api_key: apiKey },
  });
  if (!response.ok) throw new Error(`Quote API error: ${response.status}`);
  const data = await response.json();
  return { text: data.text, author: data.author };
}
```

There is **no custom backend**. All logic runs in the browser; the only external service is TheQuote API.

---

## Routes & Pages

| Route         | File               | Description               |
| ------------- | ------------------ | ------------------------- |
| `/`           | `src/app/page.tsx` | Home – renders `HomePage` |
| `/_not-found` | Next.js default    | 404 page                  |

The app uses **Next.js App Router**. `page.tsx` is a server component that renders the client `HomePage` component. All interactive state (quotes, favorites, UI) lives in `HomePage`.

---

## Components & Functionality

### HomePage (`src/Components/pages/HomePage.tsx`)

- **Role**: Main client page; holds quote state, favorites toggle, and card layout.
- **Uses**: `useQuote`, `useFavorites`, `QuoteCard`, `FavoritesList`, `FloatingBalloons`, `Button`, `EducationalSection`.
- **Flow**: Click "New Quote" → `fetchNewQuote()` → toast; click heart → toggle favorites panel; click "Add to Favorites" → `addFavorite()` → toast.

### QuoteCard (`src/Components/QuoteCard.tsx`)

- **Role**: Displays quote text and author; shows skeleton when loading.
- **Props**: `quote`, `loading`.
- **Features**: Framer Motion entrance; decorative `"` marks; centered text, right-aligned author.

### FavoritesList (`src/Components/FavoritesList.tsx`)

- **Role**: Slide-over panel listing saved quotes; each has a remove button.
- **Props**: `favorites`, `onClose`, `onRemove`.
- **Features**: AnimatePresence for add/remove; custom scrollbar; teal gradient background.

### FloatingBalloons (`src/Components/FloatingBalloons.tsx`)

- **Role**: Decorative circles that wander across the card and react to mouse.
- **Props**: `cardRef` (for mouse events).
- **Features**: GSAP random wander; mouse repel; wind gust on fast movement; collision avoidance.

### Button (`src/Components/ui/Button.tsx`)

- **Role**: Reusable button with ripple, loading state, and variants.
- **Props**: `variant` ("primary" | "secondary"), `loading`, `disabled`, `children`.
- **Features**: Ripple on click; spinner + "Generating…" when loading.

### RippleButton (`src/Components/ui/RippleButton.tsx`)

- **Role**: Base button with ripple effect; used by `Button` and heart/close/trash icons.
- **How it works**: On click, creates a span at click position, animates with `animate-ripple`, removes after 600ms.

### EducationalSection (`src/Components/EducationalSection.tsx`)

- **Role**: Explains State, Hooks, API, Context, and quick tips for learners.

### Footer (`src/Components/Footer.tsx`)

- **Role**: Copyright notice with current year and Lucide icon.

---

## Reusing Components

### Button

```tsx
import { Button } from "@/Components/ui/Button";

<Button variant="primary" onClick={handleClick} loading={isLoading}>
  Submit
</Button>;
```

### RippleButton (for icons or custom styles)

```tsx
import { RippleButton } from "@/Components/ui/RippleButton";

<RippleButton onClick={onClose} className="p-2 rounded-full hover:bg-white/10">
  <X className="w-6 h-6" />
</RippleButton>;
```

### useQuote Hook

```tsx
import { useQuote } from "@/hooks/useQuote";

const { quote, loading, error, fetchNewQuote } = useQuote(apiKey, {
  onSuccess: (q) => console.log("Loaded:", q),
});
```

### useFavorites (requires FavoritesProvider)

```tsx
import { useFavorites } from "@/context/FavoritesContext";

const { favorites, addFavorite, removeFavorite, isInFavorites } =
  useFavorites();
```

### FloatingBalloons

```tsx
const cardRef = useRef<HTMLDivElement>(null);

<div ref={cardRef}>
  <FloatingBalloons cardRef={cardRef} />
</div>;
```

---

## Libraries & Dependencies

| Package                             | Version   | Purpose                                    |
| ----------------------------------- | --------- | ------------------------------------------ |
| **next**                            | ^16.1.7   | React framework, App Router, SSR           |
| **react** / **react-dom**           | ^19.2.4   | UI library                                 |
| **framer-motion**                   | ^11.11.17 | Animations (AnimatePresence, motion.div)   |
| **gsap**                            | ^3.14.2   | Floating balloon animations                |
| **lucide-react**                    | ^0.460.0  | Icons (Heart, RefreshCw, BookMarked, etc.) |
| **sonner**                          | ^1.7.0    | Toast notifications                        |
| **tailwindcss**                     | ^3.4.14   | Utility CSS                                |
| **typescript**                      | ^5.6.3    | Type checking                              |
| **eslint** / **eslint-config-next** | ^9 / ^16  | Linting                                    |

### Example: Framer Motion

```tsx
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
  {content}
</motion.div>
```

### Example: Sonner Toast

```tsx
import { toast } from "sonner";

toast.success("Added to favorites", {
  description: `"${quote.text}" — ${quote.author}`,
});
```

---

## Keywords

- React, Next.js, TypeScript, Tailwind CSS
- TheQuote API, API integration
- Quotes Generator, Favorite quotes
- Context API, Custom hooks, useState
- Framer Motion, GSAP, Animations
- Ripple button, Toast notifications
- .env, NEXT*PUBLIC*
- Learning project, Beginner tutorial

---

## Learning & Teaching

### For Beginners

- **State**: `useState` for quote, loading, error, favorites, `showFavorites`.
- **Hooks**: `useQuote` (custom) and `useFavorites` (Context).
- **API**: `fetch()` with headers; error handling with try/catch.
- **Components**: Props, children, conditional rendering.

### For Intermediate

- **SSR vs CSR**: `page.tsx` (SSR) vs `HomePage.tsx` (CSR).
- **Context**: `FavoritesProvider` wraps the app; `useFavorites` consumes it.
- **TypeScript**: Interfaces for `Quote`, `QuoteApiResponse`, component props.
- **Tailwind**: Custom theme (`max-w-9xl`, fonts, `animate-ripple`).

### Extension Ideas

- Add search or filter for quotes.
- Persist favorites to `localStorage`.
- Add theme toggle (light/dark).
- Add share-to-Twitter or copy-to-clipboard.

---

## Conclusion

The Quotes Generator is a practical Next.js + React project that covers API integration, state management, animations, and modern UI patterns. Use it to learn, teach, or extend with new features.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

## Happy Coding! 🎉

This is an **open-source project** - feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊
