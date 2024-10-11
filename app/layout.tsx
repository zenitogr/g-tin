import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DynamicNav from '@/components/DynamicNav';

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
        <main className="flex-grow overflow-hidden flex flex-col">
          {children}
        </main>
        <DynamicNav />
      </body>
    </html>
  );
}
