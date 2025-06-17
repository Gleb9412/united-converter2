// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // Импортируем компонент Script
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { I18nProvider } from "@/context/I18nProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "United converter", // Обновил title здесь тоже
  description: "Convert between various units of measurement easily and quickly.",
    // === НОВЫЙ БЛОК ДЛЯ CANONICAL ===
  alternates: { canonical: 'https://united-converter.org', },
};

// Твой ID из GTM
const GTM_ID = 'GTM-M5KTZLBD';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
        <meta name="google-adsense-account" content="ca-pub-5212150327692150"></meta>
        
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5212150327692150`}
          crossOrigin="anonymous"
          strategy="afterInteractive" 
        />
        
        {/* === GOOGLE TAG MANAGER (script) === */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        {/* =================================== */}

      </head>
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        {/* === GOOGLE TAG MANAGER (noscript) === */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* ===================================== */}
        
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