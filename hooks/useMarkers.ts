import { useState, useCallback } from 'react';

export interface Marker {
  id: number;
  messageIndex: number;
}

export function useMarkers() {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [currentMarkerIndex, setCurrentMarkerIndex] = useState<number | null>(null);

  const addMarker = useCallback((messageIndex: number) => {
    const newMarker: Marker = {
      id: Date.now(),
      messageIndex,
    };
    setMarkers(prevMarkers => {
      const updatedMarkers = [...prevMarkers, newMarker];
      if (updatedMarkers.length === 1) {
        setCurrentMarkerIndex(newMarker.id);
      }
      console.log('Marker added, new total:', updatedMarkers.length);
      return updatedMarkers;
    });
  }, []);

  const removeMarker = useCallback((id: number) => {
    setMarkers(prevMarkers => {
      const updatedMarkers = prevMarkers.filter(marker => marker.id !== id);
      console.log('Marker removed, new total:', updatedMarkers.length);
      return updatedMarkers;
    });
    if (currentMarkerIndex === id) {
      setCurrentMarkerIndex(null);
    }
  }, [currentMarkerIndex]);

  const navigateMarker = (direction: 'up' | 'down'): number | null => {
    if (markers.length === 0) return null;

    const sortedMarkers = [...markers].sort((a, b) => a.messageIndex - b.messageIndex);
    const currentIndex = currentMarkerIndex !== null
      ? sortedMarkers.findIndex(marker => marker.id === currentMarkerIndex)
      : -1;

    let newIndex;
    if (direction === 'up') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : sortedMarkers.length - 1;
    } else {
      newIndex = currentIndex < sortedMarkers.length - 1 ? currentIndex + 1 : 0;
    }

    const newMarkerIndex = sortedMarkers[newIndex].id;
    setCurrentMarkerIndex(newMarkerIndex);
    return newMarkerIndex;
  };

  return {
    markers,
    currentMarkerIndex,
    addMarker,
    removeMarker,
    navigateMarker,
  };
}