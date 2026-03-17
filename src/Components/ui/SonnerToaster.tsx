"use client";

import { Toaster } from "sonner";

export function SonnerToaster() {
  return (
    <Toaster
      position="bottom-center"
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
