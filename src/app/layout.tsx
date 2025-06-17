// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // <-- Убедись, что этот импорт есть
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { I18nProvider } from "@/context/I18nProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "United Converter",
  description: "Convert between various units of measurement easily and quickly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // <-- ВОТ ИСПРАВЛЕНИЕ: React.Node заменен на React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        
        {/* === GOOGLE ADSENSE SCRIPT === */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5212150327692150`} // Пример ID
          crossOrigin="anonymous"
          strategy="afterInteractive" 
        />
        {/* ============================= */}

      </head>
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        <I18nProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}