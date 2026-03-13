import type { Metadata } from "next";
import { DM_Sans, Space_Mono, Syne } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SachCheck | India's AI Misinformation Detection",
  description: "Stop the spread of WhatsApp university forwards. Instant AI verification for the 1.4 billion voices of India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${spaceMono.variable} ${syne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
