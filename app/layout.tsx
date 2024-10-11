import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from '../components/Navbar';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "g-tin",
  description: "Fast OpenSource AI for everyone, anywhere, anytime.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-full`}
      >
        <Navbar />
        <main className="flex-grow overflow-hidden flex flex-col">
          <div className="container mx-auto px-4 py-2 flex-grow overflow-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
