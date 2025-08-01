import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Latif Voice Companion",
  description:
    "AI-powered Sindhi poetry companion for Shah Jo Risalo - Real-time speech recognition and context-aware verse recommendations",
  keywords: ["Sindhi poetry", "Shah Jo Risalo", "Shah Abdul Latif Bhittai", "voice recognition", "AI companion"],
  authors: [{ name: "Latif Voice Companion Team" }],
  creator: "Latif Voice Companion",
  publisher: "Latif Voice Companion",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://latif-voice-companion.vercel.app"),
  openGraph: {
    title: "Latif Voice Companion",
    description: "AI-powered Sindhi poetry companion for Shah Jo Risalo",
    url: "https://latif-voice-companion.vercel.app",
    siteName: "Latif Voice Companion",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Latif Voice Companion",
    description: "AI-powered Sindhi poetry companion for Shah Jo Risalo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Latif Companion" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        {/* Load Sindhi/Urdu fonts from CDN with proper fallbacks */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
