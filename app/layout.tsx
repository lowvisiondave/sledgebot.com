import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
