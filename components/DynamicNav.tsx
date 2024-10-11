'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DynamicNav() {
  return (
    <nav className="bg-gray-800 py-1 px-2 fixed bottom-0 left-0 right-0 h-14 z-50">
      <ul className="flex justify-around items-center h-full">
        {['Home', 'About', 'Contact'].map((item) => (
          <motion.li key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="flex flex-col items-center text-gray-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-[10px] mt-0.5">{item}</span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}