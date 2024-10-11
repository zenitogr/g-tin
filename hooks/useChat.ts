import { useState, useCallback, useRef } from 'react';
import { Message } from '../types/chat';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm the g-tin AI assistant. How can I help you today?", isUser: false, id: Date.now() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [markers, setMarkers] = useState<number[]>([]);
  const [currentMarkerIndex, setCurrentMarkerIndex] = useState<number | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Include all the logic for handling messages, markers, and scrolling here
  // ...

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
  };
};