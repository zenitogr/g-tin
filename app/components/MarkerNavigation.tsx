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
    <div className="flex flex-col items-center justify-between bg-gray-800 rounded-r-lg p-2 ml-1 h-full">
      <div>
        <Button variant="ghost" className="p-1 mb-2" onClick={onNavigateUp}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </Button>
        <div className="bg-gray-700 rounded-lg px-2 py-1 mb-2 text-sm text-center">
          {currentMarkerNumber}/{totalMarkers}
        </div>
        <Button variant="ghost" className="p-1 mb-2" onClick={onNavigateDown}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      </div>
      <div>
        <Button variant="ghost" className="p-1 mb-2 text-sm" onClick={onRemoveMarker}>
          -
        </Button>
        <Button variant="ghost" className="p-1" onClick={onAddMarker}>
          +
        </Button>
      </div>
      <div className="text-xs text-gray-400 mt-2 rotate-90">
        {totalMarkers} markers
      </div>
    </div>
  );
}