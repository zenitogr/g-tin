import { useState, useCallback } from 'react';

export interface Marker {
  id: number;
  scrollPosition: number;
}

export function useMarkers() {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [currentMarkerIndex, setCurrentMarkerIndex] = useState<number | null>(null);

  const addMarker = useCallback((scrollPosition: number) => {
    const newMarker: Marker = {
      id: Date.now(),
      scrollPosition,
    };
    setMarkers(prevMarkers => {
      const updatedMarkers = [...prevMarkers, newMarker].sort((a, b) => a.scrollPosition - b.scrollPosition);
      setCurrentMarkerIndex(newMarker.id);
      console.log('Marker added, new total:', updatedMarkers.length);
      return updatedMarkers;
    });
  }, []);

  const removeMarker = useCallback((id: number) => {
    setMarkers(prevMarkers => {
      const updatedMarkers = prevMarkers.filter(marker => marker.id !== id);
      console.log('Marker removed, new total:', updatedMarkers.length);
      if (currentMarkerIndex === id) {
        setCurrentMarkerIndex(updatedMarkers.length > 0 ? updatedMarkers[0].id : null);
      }
      return updatedMarkers;
    });
  }, [currentMarkerIndex]);

  const navigateMarker = useCallback((direction: 'up' | 'down'): number | null => {
    if (markers.length === 0) return null;

    const currentIndex = markers.findIndex(marker => marker.id === currentMarkerIndex);
    let newIndex;

    if (currentIndex === -1) {
      newIndex = direction === 'up' ? markers.length - 1 : 0;
    } else if (direction === 'up') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : markers.length - 1;
    } else {
      newIndex = currentIndex < markers.length - 1 ? currentIndex + 1 : 0;
    }

    const newMarkerIndex = markers[newIndex].id;
    setCurrentMarkerIndex(newMarkerIndex);
    return newMarkerIndex;
  }, [markers, currentMarkerIndex]);

  return {
    markers,
    currentMarkerIndex,
    addMarker,
    removeMarker,
    navigateMarker,
  };
}