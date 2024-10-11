import { useState, useCallback, useRef, useEffect } from 'react';
import { Message } from '../types/chat';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm the g-tin AI assistant. How can I help you today?", isUser: false, id: Date.now() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [markers, setMarkers] = useState<number[]>([]);
  const [currentMarkerIndex, setCurrentMarkerIndex] = useState<number | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = useCallback(() => {
    if (inputMessage.trim() === '') return;

    setMessages(prev => [...prev, { text: inputMessage, isUser: true, id: Date.now() }]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: `AI response to: "${inputMessage}"`, isUser: false, id: Date.now() }]);
    }, 1000);
  }, [inputMessage]);

  const handleScroll = useCallback(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    const { scrollTop, scrollHeight, clientHeight } = chatContainer;
    const isScrolledToBottom = scrollHeight - scrollTop - clientHeight < 1;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (!isScrolledToBottom) {
        const lastVisibleMessageIndex = Math.floor((scrollTop + clientHeight) / 50) - 1;
        if (lastVisibleMessageIndex >= 0 && !markers.includes(lastVisibleMessageIndex)) {
          setMarkers(prev => {
            const newMarkers = [...prev, lastVisibleMessageIndex].sort((a, b) => a - b);
            setCurrentMarkerIndex(newMarkers.indexOf(lastVisibleMessageIndex));
            return newMarkers;
          });
        }
      }
    }, 2000);
  }, [markers]);

  const scrollToMarker = useCallback((index: number) => {
    if (chatContainerRef.current && markers[index] !== undefined) {
      const markerElement = document.getElementById(`message-${markers[index]}`);
      if (markerElement) {
        markerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setCurrentMarkerIndex(index);
      }
    }
  }, [markers]);

  const navigateMarkers = useCallback((direction: 'prev' | 'next') => {
    if (markers.length === 0) return;

    let newIndex: number;
    if (currentMarkerIndex === null) {
      newIndex = direction === 'prev' ? markers.length - 1 : 0;
    } else {
      newIndex = direction === 'prev' 
        ? Math.max(0, currentMarkerIndex - 1)
        : Math.min(markers.length - 1, currentMarkerIndex + 1);
    }
    scrollToMarker(newIndex);
  }, [currentMarkerIndex, markers, scrollToMarker]);

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  return {
    messages,
    inputMessage,
    setInputMessage,
    markers,
    currentMarkerIndex,
    handleSendMessage,
    handleScroll,
    scrollToMarker,
    navigateMarkers,
    scrollToBottom,
    chatContainerRef,
  };
};