import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from '@/app/components/ui/CustomCursor';
import LiquidBackground from '@/app/components/canvas/LiquidBackground';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumen Logic | Immersive Digital Experiences",
  description: "A showcase of high-performance WebGL, kinetic typography, and fluid scrollytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-black antialiased overflow-x-hidden">
        <LiquidBackground />
        <CustomCursor />
        <main>
          {children}</main>
      </body>
    </html>
  );
}
