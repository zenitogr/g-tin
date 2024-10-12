import { useRef, useCallback, useEffect } from 'react';
import { Marker } from '@/types/marker'; // You'll need to create this type

type Direction = 'up' | 'down';

export function useScrollHandling(
  markers: Marker[],
  addMarker: (scrollPosition: number) => void,
  removeMarker: (index: number) => void,
  navigateMarker: (direction: Direction) => number | null
) {
  const chatRef = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const shouldScrollRef = useRef(true);
  const lastScrollPositionRef = useRef(0);
  const isNavigatingRef = useRef(false);
  const isAutoScrollingRef = useRef(false);

  const isScrolledToBottom = useCallback(() => {
    if (chatRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = chatRef.current;
      return Math.abs(scrollHeight - clientHeight - scrollTop) < 1;
    }
    return false;
  }, []);

  const scrollToBottom = useCallback(() => {
    if (chatRef.current && shouldScrollRef.current) {
      isAutoScrollingRef.current = true;
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
      setTimeout(() => {
        isAutoScrollingRef.current = false;
      }, 100);
    }
  }, []);

  const handleAddMarker = useCallback(() => {
    if (chatRef.current) {
      const scrollPosition = chatRef.current.scrollTop;
      addMarker(scrollPosition);
    }
  }, [addMarker]);

  const handleRemoveMarker = useCallback(() => {
    const currentMarkerIndex = markers.findIndex(marker => marker.isCurrent);
    if (currentMarkerIndex !== -1) {
      removeMarker(currentMarkerIndex);
    }
  }, [markers, removeMarker]);

  const scrollToMarker = useCallback((scrollPosition: number) => {
    if (chatRef.current) {
      chatRef.current.scrollTop = scrollPosition;
    }
  }, []);

  const handleNavigateMarker = useCallback((direction: Direction) => {
    isNavigatingRef.current = true;
    const newMarkerIndex = navigateMarker(direction);
    if (newMarkerIndex !== null) {
      const marker = markers.find(m => m.id === newMarkerIndex);
      if (marker) {
        scrollToMarker(marker.scrollPosition);
      }
    }
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 100);
  }, [navigateMarker, markers, scrollToMarker]);

  const handleScroll = useCallback(() => {
    if (chatRef.current && !isNavigatingRef.current && !isAutoScrollingRef.current) {
      const currentScrollPosition = chatRef.current.scrollTop;
      
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }

      if (currentScrollPosition !== lastScrollPositionRef.current && !isScrolledToBottom()) {
        scrollTimerRef.current = setTimeout(() => {
          handleAddMarker();
        }, 2000);
      }

      lastScrollPositionRef.current = currentScrollPosition;
    }
  }, [handleAddMarker, isScrolledToBottom]);

  const getCurrentMarkerNumber = useCallback(() => {
    const currentMarkerIndex = markers.findIndex(marker => marker.isCurrent);
    return currentMarkerIndex !== -1 ? currentMarkerIndex + 1 : 0;
  }, [markers]);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  return {
    chatRef,
    isScrolledToBottom,
    scrollToBottom,
    handleScroll,
    handleAddMarker,
    handleRemoveMarker,
    handleNavigateMarker,
    getCurrentMarkerNumber,
  };
}
