'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

interface MessageCollectionsProps {
  collections: { id: number; name: string }[];
  currentCollectionIndex: number | null;
  onNavigateUp: () => void;
  onNavigateDown: () => void;
  onAddCollection: () => void;
  onRemoveCollection: () => void;
}

const MessageCollections: React.FC<MessageCollectionsProps> = ({
  collections,
  currentCollectionIndex,
  onNavigateUp,
  onNavigateDown,
  onAddCollection,
  onRemoveCollection
}) => {
  return (
    <div className="flex flex-col bg-gray-800 p-2 w-12 space-y-2">
      <Button onClick={onNavigateUp} className="w-full p-2" aria-label="Previous collection" disabled={collections.length === 0}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </Button>
      <div className="text-center text-white">
        {collections.length > 0 && currentCollectionIndex !== null ? `${currentCollectionIndex + 1}/${collections.length}` : '-'}
      </div>
      <Button onClick={onNavigateDown} className="w-full p-2" aria-label="Next collection" disabled={collections.length === 0}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>
      <Button onClick={onAddCollection} className="w-full p-2" aria-label="Add collection">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </Button>
      <Button onClick={onRemoveCollection} className="w-full p-2" aria-label="Remove collection" disabled={collections.length === 0}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Button>
    </div>
  );
};

export default MessageCollections;
