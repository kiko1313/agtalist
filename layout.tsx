import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agtalist - Discover & Download AI Prompts",
  description: "The ultimate marketplace for AI prompts. Find, download, and share high-quality prompts for Text, Image, and Video generation.",
  keywords: ["AI prompts", "prompt marketplace", "text to image", "text to video", "AI art", "prompt engineering", "Agtalist"],
  authors: [{ name: "Agtalist" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Agtalist - Discover & Download AI Prompts",
    description: "The ultimate marketplace for AI prompts. Find, download, and share high-quality prompts for Text, Image, and Video generation.",
    url: "https://agtalist.net",
    siteName: "Agtalist",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agtalist - Discover & Download AI Prompts",
    description: "The ultimate marketplace for AI prompts.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}