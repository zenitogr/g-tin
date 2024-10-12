import { useState, useCallback } from 'react';
import { Marker } from '@/types/marker';

export function useMarkers() {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [currentMarkerIndex, setCurrentMarkerIndex] = useState<number | null>(null);

  const addMarker = useCallback((scrollPosition: number) => {
    setMarkers(prevMarkers => [
      ...prevMarkers,
      { id: Date.now(), scrollPosition, isCurrent: false }
    ]);
  }, []);

  const removeMarker = useCallback((index: number) => {
    setMarkers(prevMarkers => prevMarkers.filter((_, i) => i !== index));
    if (currentMarkerIndex === index) {
      setCurrentMarkerIndex(null);
    }
  }, [currentMarkerIndex]);

  const navigateMarker = useCallback((direction: 'up' | 'down') => {
    if (markers.length === 0) return null;

    let newIndex: number;
    if (currentMarkerIndex === null) {
      newIndex = direction === 'up' ? markers.length - 1 : 0;
    } else {
      newIndex = direction === 'up' ? currentMarkerIndex - 1 : currentMarkerIndex + 1;
      if (newIndex < 0) newIndex = markers.length - 1;
      if (newIndex >= markers.length) newIndex = 0;
    }

    setCurrentMarkerIndex(newIndex);
    setMarkers(prevMarkers =>
      prevMarkers.map((marker, index) => ({
        ...marker,
        isCurrent: index === newIndex
      }))
    );

    return markers[newIndex].id;
  }, [markers, currentMarkerIndex]);

  return { markers, currentMarkerIndex, addMarker, removeMarker, navigateMarker };
}