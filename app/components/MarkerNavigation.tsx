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
    <div className="flex flex-col items-center justify-between bg-gray-800 rounded-r-lg py-2 px-1 w-7">
      <div className="flex flex-col items-center mb-2">
        <div className="text-[10px] text-gray-400 mb-1">{totalMarkers}</div>
        <div className="text-[8px] text-gray-400 whitespace-nowrap">markers</div>
      </div>
      <div className="flex flex-col items-center">
        <Button variant="ghost" className="p-0.5 mb-1" onClick={onNavigateUp}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </Button>
        <div className="bg-gray-700 rounded-md px-1 py-0.5 text-xs text-center w-full mb-1">
          {currentMarkerNumber}/{totalMarkers}
        </div>
        <Button variant="ghost" className="p-0.5 mb-2" onClick={onNavigateDown}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      </div>
      <div className="flex flex-col items-center">
        <Button variant="ghost" className="p-0.5 mb-1 text-xs" onClick={onRemoveMarker}>
          -
        </Button>
        <Button variant="ghost" className="p-0.5 text-xs" onClick={onAddMarker}>
          +
        </Button>
      </div>
    </div>
  );
}