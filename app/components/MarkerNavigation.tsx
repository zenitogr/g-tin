'use client';

import { Button } from "@/components/ui/button";

interface MarkerNavigationProps {
  currentMarkerNumber: number;
  totalMarkers: number;
  onNavigateUp: () => void;
  onNavigateDown: () => void;
  onAddMarker: () => void;
  onRemoveMarker: () => void;
}

export default function MarkerNavigation({
  currentMarkerNumber,
  totalMarkers,
  onNavigateUp,
  onNavigateDown,
  onAddMarker,
  onRemoveMarker
}: MarkerNavigationProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 rounded-r-lg p-1 ml-1">
      <div className="text-xs mb-1 text-gray-400">{totalMarkers} markers</div>
      <Button variant="ghost" className="p-1 mb-1" onClick={onNavigateUp}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </Button>
      <div className="bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center mb-1 text-sm">
        {currentMarkerNumber}
      </div>
      <Button variant="ghost" className="p-1 mb-1" onClick={onNavigateDown}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>
      <Button variant="ghost" className="p-1 mb-1 text-sm" onClick={onRemoveMarker}>
        -
      </Button>
      <Button variant="ghost" className="p-1" onClick={onAddMarker}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </Button>
    </div>
  );
}