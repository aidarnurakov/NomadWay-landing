import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nomadway - Походы и туры по Кыргызстану",
  description: "Nomadway - первое приложение, которое объединяет все туристические возможности Кыргызстана в одном месте. Запишитесь на бета-тест!",
  keywords: ["Кыргызстан", "туризм", "походы", "туры", "путешествия", "горы", "номады"],
  authors: [{ name: "Nomadway Team" }],
  creator: "Nomadway",
  publisher: "Nomadway",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nomadway.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nomadway - Походы и туры по Кыргызстану",
    description: "Первое приложение, которое объединяет все туристические возможности Кыргызстана в одном месте. Запишитесь на бета-тест!",
    url: "https://nomadway.app",
    siteName: "Nomadway",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nomadway - Походы и туры по Кыргызстану",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nomadway - Походы и туры по Кыргызстану",
    description: "Первое приложение, которое объединяет все туристические возможности Кыргызстана в одном месте.",
    images: ["/og-image.jpg"],
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
