"use client";

import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import type { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("serviceWorker" in navigator) {
      const register = async () => {
        try {
          await navigator.serviceWorker.register("/sw.js");
        } catch (error) {
          console.error("Service worker registration failed", error);
        }
      };
      register();
    }
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
};
