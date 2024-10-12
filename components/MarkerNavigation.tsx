'use client';

import React from 'react';
import { Button } from "@/components/ui/button";

interface MarkerNavigationProps {
  currentMarkerNumber: number;
  totalMarkers: number;
  onNavigateUp: () => void;
  onNavigateDown: () => void;
  onAddMarker: () => void;
  onRemoveMarker: () => void;
}

const MarkerNavigation: React.FC<MarkerNavigationProps> = ({
  currentMarkerNumber,
  totalMarkers,
  onNavigateUp,
  onNavigateDown,
  onAddMarker,
  onRemoveMarker
}) => {
  return (
    <div className="flex flex-col bg-gray-800 p-2 w-12 space-y-2">
      <Button onClick={onNavigateUp} className="w-full p-2" aria-label="Previous marker" disabled={totalMarkers === 0}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </Button>
      <div className="text-center text-white">
        {totalMarkers > 0 ? `${currentMarkerNumber}/${totalMarkers}` : '-'}
      </div>
      <Button onClick={onNavigateDown} className="w-full p-2" aria-label="Next marker" disabled={totalMarkers === 0}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>
      <Button onClick={onAddMarker} className="w-full p-2" aria-label="Add marker">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </Button>
      <Button onClick={onRemoveMarker} className="w-full p-2" aria-label="Remove marker" disabled={totalMarkers === 0}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Button>
    </div>
  );
};

export default MarkerNavigation;
