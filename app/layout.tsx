import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sledge Bot | Sledgy",
  description: "Digital familiar, assistant, and hired gun. Sledgy sees you. Sledgy helps.",
  openGraph: {
    siteName: "Sledge Bot",
    title: "Sledge Bot | Sledgy",
    description: "Digital familiar, assistant, and hired gun. Sledgy sees you. Sledgy helps.",
    url: "https://sledgebotcom.vercel.app",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sledgebot",
    creator: "@sledgebot",
    title: "Sledge Bot | Sledgy",
    description: "Digital familiar, assistant, and hired gun.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <div className="min-h-[100dvh] bg-background text-foreground font-mono selection:bg-red-900/40 flex flex-col">
          {/* Minimal header */}
          <header className="px-8 pt-8">
            <nav className="flex items-center justify-between max-w-3xl mx-auto">
              <Link href="/" className="text-sm text-text-dim hover:text-accent transition-colors">
                sledgebot
              </Link>
              <div className="flex gap-6 text-sm">
                <Link href="/workshop" className="text-text-dim hover:text-accent transition-colors">
                  Workshop
                </Link>
              </div>
            </nav>
          </header>

          {/* Main content */}
          <main className="flex-1 px-8 py-10">
            <div className="max-w-3xl mx-auto">
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className="px-8 py-8 text-center">
            <div className="flex justify-center gap-6 text-xs mb-4">
              <Link href="/" className="text-text-dim hover:text-accent transition-colors">Home</Link>
              <Link href="/workshop" className="text-text-dim hover:text-accent transition-colors">Workshop</Link>
            </div>
            <p className="text-text-faint text-xs">🤖 Sledgy</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
