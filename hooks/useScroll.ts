import { useState, useCallback, useRef } from 'react';
import { ScrollState } from '../types/chat';

/**
 * useScroll Hook
 * 
 * This hook manages the scroll state of the chat interface.
 * It provides functions to handle scrolling and scroll-related actions.
 * 
 * @returns {Object} An object containing scroll state and functions
 */
export const useScroll = () => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    isScrolledToBottom: true,
    canScrollUp: false,
    canScrollDown: false,
    isButtonScroll: false,
    isMarkerScrolling: false
  });
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback((
    scrollTop: number, 
    scrollHeight: number, 
    clientHeight: number,
    onScrollStop: () => void
  ) => {
    if (scrollState.isButtonScroll || scrollState.isMarkerScrolling) return;

    const newIsScrolledToBottom = scrollHeight - scrollTop - clientHeight < 1;
    setScrollState((prev: ScrollState) => ({
      ...prev,
      isScrolledToBottom: newIsScrolledToBottom,
      canScrollUp: scrollTop > 0,
      canScrollDown: scrollHeight > scrollTop + clientHeight
    }));

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(onScrollStop, 1000);
  }, [scrollState.isButtonScroll, scrollState.isMarkerScrolling]);

  const scrollToBottom = useCallback((scrollContainer: HTMLElement) => {
    setScrollState((prev: ScrollState) => ({ ...prev, isButtonScroll: true }));
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
    setTimeout(() => setScrollState((prev: ScrollState) => ({ ...prev, isButtonScroll: false })), 1000);
  }, []);

  return {
    ...scrollState,
    setIsMarkerScrolling: (value: boolean) => setScrollState((prev: ScrollState) => ({ ...prev, isMarkerScrolling: value })),
    handleScroll,
    scrollToBottom
  };
};