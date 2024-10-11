'use client';

import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

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
    <motion.div 
      className="flex flex-col items-center justify-between bg-gray-800 rounded-r-lg py-2 px-1 w-7"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div className="flex flex-col items-center mb-2" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5 }}>
        <div className="text-[10px] text-gray-400 mb-1">{totalMarkers}</div>
        <div className="text-[8px] text-gray-400 whitespace-nowrap">markers</div>
      </motion.div>
      <div className="flex flex-col items-center">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button variant="ghost" className="p-0.5 mb-1" onClick={onNavigateUp}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </Button>
        </motion.div>
        <motion.div 
          className="bg-gray-700 rounded-md px-1 py-0.5 text-xs text-center w-full mb-1"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          {currentMarkerNumber}/{totalMarkers}
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button variant="ghost" className="p-0.5 mb-2" onClick={onNavigateDown}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
        </motion.div>
      </div>
      <div className="flex flex-col items-center">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button variant="ghost" className="p-0.5 mb-1 text-xs" onClick={onRemoveMarker}>
            -
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button variant="ghost" className="p-0.5 text-xs" onClick={onAddMarker}>
            +
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}