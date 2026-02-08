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
    url: "https://sledgebot.com",
    type: "website",
    images: [
      {
        url: "https://sledgebot.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Sledge Bot OG Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sledgebot",
    creator: "@sledgebot",
    title: "Sledge Bot | Sledgy",
    description: "Digital familiar, assistant, and hired gun.",
    images: ["https://sledgebot.com/opengraph-image.png"],
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
