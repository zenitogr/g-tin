import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} flex flex-col h-full bg-gray-900 text-white`}>
        <header className="bg-gray-800 p-2">
          <nav className="flex justify-between items-center max-w-full mx-auto px-4">
            <h1 className="text-2xl font-bold">g-tin</h1>
            <ul className="flex space-x-6">
              <li><Link href="/" className="hover:text-gray-300 text-lg">Home</Link></li>
              <li><Link href="/about" className="hover:text-gray-300 text-lg">About</Link></li>
              <li><Link href="/contact" className="hover:text-gray-300 text-lg">Contact</Link></li>
            </ul>
          </nav>
        </header>
        <main className="flex-grow overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
