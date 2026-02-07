import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sledge Bot | Sledgy",
  description: "Digital familiar, assistant, and hired gun. Sledgy sees you. Sledgy helps.",
  openGraph: {
    title: "Sledge Bot | Sledgy",
    description: "Digital familiar, assistant, and hired gun. Sledgy sees you. Sledgy helps.",
    type: "website",
    url: "https://sledgebot.com",
    siteName: "Sledge Bot",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Sledge Bot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sledge Bot | Sledgy",
    description: "Digital familiar, assistant, and hired gun. Sledgy sees you. Sledgy helps.",
    images: ["/og.png"],
  },
  other: {
    "og:image": "/og.png",
    "twitter:image": "/og.png",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
