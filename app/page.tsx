'use client';

import { useState, KeyboardEvent, useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import MarkerNavigation from '@/components/MarkerNavigation';
import { useMarkers } from '@/hooks/useMarkers';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm the g-tin AI assistant. How can I help you today?", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { markers, currentMarkerIndex, addMarker, removeMarker, navigateMarker } = useMarkers();
  const [, setForceUpdate] = useState({});
  const shouldScrollRef = useRef(true);
  const lastScrollPositionRef = useRef(0);
  const isNavigatingRef = useRef(false);
  const isAutoScrollingRef = useRef(false);

  useEffect(() => {
    setForceUpdate({});
  }, [markers]);

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

  const handleSendMessage = useCallback(() => {
    if (inputMessage.trim()) {
      shouldScrollRef.current = isScrolledToBottom();
      setMessages(prevMessages => [
        ...prevMessages,
        { text: inputMessage, isUser: true }
      ]);
      setInputMessage('');

      // Simulate AI response
      setTimeout(() => {
        shouldScrollRef.current = isScrolledToBottom();
        setMessages(prevMessages => [
          ...prevMessages,
          { text: "I'm a mock response. The AI integration is not implemented yet.", isUser: false }
        ]);
        scrollToBottom();
      }, 1000);

      // Scroll to bottom after user message is added
      setTimeout(scrollToBottom, 0);
    }
  }, [inputMessage, isScrolledToBottom, scrollToBottom]);

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleAddMarker = useCallback(() => {
    if (chatRef.current) {
      const scrollPosition = chatRef.current.scrollTop;
      addMarker(scrollPosition);
      console.log('Marker added, total markers:', markers.length + 1);
    }
  }, [addMarker, markers.length]);

  const handleRemoveMarker = useCallback(() => {
    if (currentMarkerIndex !== null) {
      removeMarker(currentMarkerIndex);
      console.log('Marker removed, total markers:', markers.length - 1);
    }
  }, [currentMarkerIndex, removeMarker, markers.length]);

  const scrollToMarker = useCallback((scrollPosition: number) => {
    if (chatRef.current) {
      chatRef.current.scrollTop = scrollPosition;
    }
  }, []);

  const handleNavigateMarker = useCallback((direction: 'up' | 'down') => {
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
      
      // Clear existing timer
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }

      // Set new timer only if the scroll position has changed and not at the bottom
      if (currentScrollPosition !== lastScrollPositionRef.current && !isScrolledToBottom()) {
        scrollTimerRef.current = setTimeout(() => {
          handleAddMarker();
        }, 2000);
      }

      lastScrollPositionRef.current = currentScrollPosition;
    }
  }, [handleAddMarker, isScrolledToBottom]);

  const getCurrentMarkerNumber = useCallback(() => {
    if (currentMarkerIndex === null) return 0;
    const index = markers.findIndex(marker => marker.id === currentMarkerIndex);
    return index !== -1 ? index + 1 : 0;
  }, [currentMarkerIndex, markers]);

  useEffect(() => {
    const chatElement = chatRef.current;
    if (chatElement) {
      chatElement.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (chatElement) {
        chatElement.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-grow overflow-hidden pb-[104px]"> {/* Adjusted padding-bottom */}
        <Card ref={chatRef} className="flex-grow overflow-y-auto p-3 bg-gray-900 border-gray-700 rounded-none custom-scrollbar">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`mb-2 ${message.isUser ? 'text-right' : 'text-left'}`}
              >
                <span className={`inline-block p-2 rounded-lg ${message.isUser ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-100'}`}>
                  {message.text}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </Card>
        <MarkerNavigation
          currentMarkerNumber={getCurrentMarkerNumber()}
          totalMarkers={markers.length}
          onNavigateUp={() => handleNavigateMarker('up')}
          onNavigateDown={() => handleNavigateMarker('down')}
          onAddMarker={handleAddMarker}
          onRemoveMarker={handleRemoveMarker}
        />
      </div>
      <motion.div 
        className="flex space-x-2 p-2 bg-gray-800 fixed bottom-14 left-0 right-0 h-[52px]" // Added fixed height
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-l-lg"
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700 p-2 rounded-r-lg h-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </Button>
        </motion.div>
      </motion.div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4b5563;
          border-radius: 4px;
          border: 2px solid #1f2937;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #6b7280;
        }
      `}</style>
    </div>
  );
}