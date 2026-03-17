"use client";

import { Toaster } from "sonner";

/** Global toast container (Sonner). Use toast.success(), toast.info(), etc. from any component. */
export function SonnerToaster() {
  return (
    <Toaster
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: "font-body",
        },
      }}
    />
  );
}
