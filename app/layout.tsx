import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MediaFlow — Download Videos & Audio Instantly",
  description:
    "Paste any YouTube or TikTok link and download in your preferred quality. 4K support, lightning fast, zero sign-up required.",
  keywords: ["video downloader", "youtube downloader", "tiktok downloader", "mp4 download", "mp3 converter"],
  openGraph: {
    title: "MediaFlow — Download Videos & Audio Instantly",
    description: "Paste any YouTube or TikTok link and download in your preferred quality.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
