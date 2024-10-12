'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';

const ChatInterface = dynamic(() => import('@/components/ChatInterface'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <LoadingSpinner />;

  return (
    <div className="h-screen">
      <Suspense fallback={<LoadingSpinner />}>
        <ChatInterface />
      </Suspense>
    </div>
  );
}
