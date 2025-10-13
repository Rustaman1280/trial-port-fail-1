import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://crust.dev"),
  title: {
    default: "Rustaman Delvianova · Crust Dev",
    template: "%s · Rustaman Delvianova",
  },
  description:
    "Principal fullstack engineer and product designer crafting high-impact web, mobile, and experiential products with polish, performance, and empathy.",
  keywords: [
    "Rustaman Delvianova",
    "Crust Dev",
    "Next.js",
    "TypeScript",
    "Product Engineer",
    "UX Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Rustaman Delvianova", url: "https://crust.dev" }],
  creator: "Rustaman Delvianova",
  publisher: "Crust Dev",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://crust.dev",
    siteName: "Rustaman Delvianova · Crust Dev",
    title: "Build. Design. Ship.",
    description:
      "Engineering-forward portfolio showcasing fullstack products, generative AI, and immersive experiences by Rustaman Delvianova.",
    images: [
      {
        url: "https://crust.dev/api/og?title=Build.%20Design.%20Ship.&subtitle=Principal%20Engineer%20%26%20Product%20Designer",
        width: 1200,
        height: 630,
        alt: "Rustaman Delvianova portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@crustdev",
    creator: "@crustdev",
    title: "Rustaman Delvianova · Crust Dev",
    description:
      "Principal fullstack engineer and product designer building elegant, performant products across platforms.",
  },
  alternates: {
    canonical: "https://crust.dev",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0e14",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-surface text-foreground antialiased", inter.variable, jetbrains.variable)}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:rounded-full focus:bg-accent-mint/80 focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <Providers>
          <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-4 pb-16 pt-6 sm:px-6 lg:px-10">
            <Nav />
            <main id="main-content" className="flex-1 space-y-16">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
