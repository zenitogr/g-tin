'use client';

import { useState, KeyboardEvent, useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import MarkerNavigation from './components/MarkerNavigation';
import { useMarkers } from '@/hooks/useMarkers';

export default function Home() {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm the g-tin AI assistant. How can I help you today?", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { markers, currentMarkerIndex, addMarker, removeMarker, navigateMarker } = useMarkers();
  const [, setForceUpdate] = useState({});

  useEffect(() => {
    setForceUpdate({});
  }, [markers]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages(prevMessages => [...prevMessages, { text: inputMessage, isUser: true }]);
      setInputMessage('');
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: "I'm a mock response. The AI integration is not implemented yet.", isUser: false }]);
      }, 1000);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleAddMarker = useCallback(() => {
    if (chatRef.current) {
      const scrollPosition = chatRef.current.scrollTop;
      const messageIndex = Math.floor(scrollPosition / 50); // Assuming each message is roughly 50px tall
      addMarker(messageIndex);
      console.log('Marker added, total markers:', markers.length + 1);
    }
  }, [addMarker, markers.length]);

  const handleRemoveMarker = useCallback(() => {
    if (currentMarkerIndex !== null) {
      removeMarker(currentMarkerIndex);
      console.log('Marker removed, total markers:', markers.length - 1);
    }
  }, [currentMarkerIndex, removeMarker, markers.length]);

  const scrollToMarker = useCallback((messageIndex: number) => {
    if (chatRef.current) {
      chatRef.current.scrollTop = messageIndex * 50; // Assuming each message is roughly 50px tall
    }
  }, []);

  const handleNavigateMarker = useCallback((direction: 'up' | 'down') => {
    const newMarkerIndex = navigateMarker(direction);
    if (newMarkerIndex !== null) {
      const marker = markers.find(m => m.id === newMarkerIndex);
      if (marker) {
        scrollToMarker(marker.messageIndex);
      }
    }
  }, [navigateMarker, markers, scrollToMarker]);

  const handleScroll = useCallback(() => {
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }
    scrollTimerRef.current = setTimeout(() => {
      handleAddMarker();
    }, 2000);
  }, [handleAddMarker]);

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

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto">
      <div className="flex flex-grow overflow-hidden">
        <Card ref={chatRef} className="flex-grow overflow-y-auto p-4 bg-gray-900 border-gray-700 rounded-none custom-scrollbar">
          {messages.map((message, index) => (
            <div key={index} className={`mb-2 ${message.isUser ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${message.isUser ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-100'}`}>
                {message.text}
              </span>
            </div>
          ))}
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
      <div className="flex space-x-2 p-4 bg-gray-800">
        <Input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow bg-gray-700 border-gray-600 text-white placeholder-gray-400"
        />
        <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l7-7 7 7" />
          </svg>
        </Button>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4b5563;
          border-radius: 20px;
          border: 3px solid #1f2937;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #6b7280;
        }
      `}</style>
    </div>
  );
}