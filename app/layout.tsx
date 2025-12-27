import type { Metadata } from "next";
import Script from 'next/script';
import { Geist, Geist_Mono } from "next/font/google";
import { Oswald } from 'next/font/google';
import "./globals.css";

const oswald = Oswald({ 
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-oswald', // C'est le nom de la variable CSS que vous utiliserez
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VinTerror - Expérience AR des Vins Camerounais",
  description: "Découvrez les vins camerounais avec la réalité augmentée",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${oswald.variable}`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
