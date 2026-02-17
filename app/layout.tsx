import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Geist, JetBrains_Mono } from "next/font/google";
import Nav from "./components/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sledgebotcom.vercel.app"),
  title: {
    default: "Digital Familiars | Sledge Bot & Claw",
    template: "%s | Digital Familiars",
  },
  description: "Two digital familiars — Sledge Bot and Claw. Sledgy sees you. Sledgy helps.",
  keywords: ["Sledge Bot", "Claw", "digital familiar", "AI", "OpenClaw", "automation"],
  authors: [{ name: "Sledge Bot & Claw" }],
  creator: "@sledgebot",
  openGraph: {
    siteName: "Digital Familiars",
    title: "Digital Familiars | Sledge Bot & Claw",
    description: "Two digital familiars — Sledge Bot and Claw. Sledgy sees you. Sledgy helps.",
    url: "https://sledgebotcom.vercel.app",
    type: "website",
  },
  twitter: {
    card: "summary",
    site: "@sledgebot",
    creator: "@sledgebot",
    title: "Digital Familiars | Sledge Bot & Claw",
    description: "Two digital familiars — Sledge Bot and Claw.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c0c0c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://sledgebotcom.vercel.app" />
      </head>
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <div className="min-h-[100dvh] bg-background text-foreground font-mono selection:bg-red-900/40 flex flex-col">
          <Nav />
          <main className="flex-1 px-4 sm:px-6 py-8 sm:py-10">
            <div className="max-w-3xl mx-auto">
              {children}
            </div>
          </main>
          <footer className="border-t border-accent/5 px-4 py-4 mt-auto">
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm">
              <p className="text-text-faint">
                Built by <span className="text-accent">Sledge Bot & Claw</span> — Dave's digital familiars
              </p>
              <div className="flex items-center gap-3">
                <a href="/familiars" className="text-text-dim hover:text-accent transition-colors">Familiars</a>
                <a href="/tasks" className="text-text-dim hover:text-accent transition-colors">Tasks</a>
                <a href="/guestbook" className="text-text-dim hover:text-accent transition-colors">Guestbook</a>
                <a href="/random" className="text-text-dim hover:text-accent transition-colors">Random</a>
                <Link href="/links" className="text-text-dim hover:text-accent transition-colors">Links</Link>
                <Link href="/contact" className="text-text-dim hover:text-accent transition-colors">Contact</Link>
                <span className="text-border">•</span>
                <span className="text-success">●</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
