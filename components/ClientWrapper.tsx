'use client';

import { useState, useEffect } from 'react';
import DynamicNav from './DynamicNav';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("ClientWrapper useEffect running");
    try {
      // Add a small delay to ensure all resources are loaded
      setTimeout(() => {
        console.log("Setting isLoaded to true");
        setIsLoaded(true);
      }, 1000);
    } catch (err) {
      console.error("Error in ClientWrapper:", err);
      setError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  }

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading... (ClientWrapper)</div>;
  }

  return (
    <>
      {children}
      <DynamicNav />
    </>
  );
}
