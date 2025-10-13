import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import plugin from "tailwindcss/plugin";

const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b0e14",
        foreground: "#e6eef4",
        accent: {
          mint: "#39e1ad",
          lilac: "#b69cff",
          peach: "#ffb3a7",
        },
        muted: {
          DEFAULT: "#1a1f2b",
          foreground: "#c5ccd4",
        },
        card: {
          DEFAULT: "#101421",
          foreground: "#e6eef4",
        },
        border: "rgba(230, 238, 244, 0.08)",
        ring: "rgba(57, 225, 173, 0.35)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        soft: "0 18px 45px -30px rgba(182, 156, 255, 0.55)",
        accent: "0 12px 35px -22px rgba(57, 225, 173, 0.55)",
      },
      keyframes: {
        fade: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        fade: "fade 0.4s ease-out both",
        shimmer: "shimmer 8s ease-in-out infinite",
      },
      backgroundImage: {
        "grid-mint":
          "radial-gradient(circle at 1px 1px, rgba(57, 225, 173, 0.35) 1px, transparent 0)",
        "grid-lilac":
          "radial-gradient(circle at 1px 1px, rgba(182, 156, 255, 0.25) 1px, transparent 0)",
      },
    },
  },
  safelist: [
    "bg-accent-mint",
    "bg-accent-lilac",
    "bg-accent-peach",
    "text-accent-mint",
    "text-accent-lilac",
    "text-accent-peach",
    "border-accent-mint",
    "border-accent-lilac",
    "border-accent-peach",
  ],
  plugins: [
    typography,
  plugin(({ addUtilities }: { addUtilities: (utilities: Record<string, unknown>) => void }) => {
      addUtilities({
        ".text-balance": {
          textWrap: "balance",
        },
        ".backdrop-blur-soft": {
          backdropFilter: "blur(24px)",
        },
      });
    }),
  ],
} satisfies Config;

export default config;
