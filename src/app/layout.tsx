import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { portfolioData } from './lib/portfolio-data';

const { identity, hero } = portfolioData;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${identity.name} | ${identity.title}`,
  description: hero.shortBio,
  keywords: [
    identity.name,
    "Full-Stack Developer",
    "AI Specialist",
    "React",
    "Next.js",
    "Django",
    "Python",
    "AI Automation",
  ],
  openGraph: {
    title: `${identity.name} | ${identity.title}`,
    description: hero.shortBio,
    type: "website",
  },
};

import AnalyticsTracker from "./components/AnalyticsTracker";
import AIAssistant from "./components/AIAssistant";
import CookieBanner from "./components/CookieBanner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <AnalyticsTracker />
        {children}
        <CookieBanner />
        <AIAssistant />
      </body>
    </html>
  );
}

