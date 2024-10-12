'use client';

import { KeyboardEvent, useCallback, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import MarkerNavigation from '@/components/MarkerNavigation';
import MessageCollections from '@/components/MessageCollections';
import { useMarkers } from '@/hooks/useMarkers';
import { useMessageCollections } from '@/hooks/useMessageCollections';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@/hooks/useChat';
import { useScrollHandling } from '@/hooks/useScrollHandling';

export default function ChatInterface() {
  const [isMounted, setIsMounted] = useState(false);
  const { messages, inputMessage, setInputMessage, sendMessage, initializeChat } = useChat();
  const { markers, currentMarkerIndex, addMarker, removeMarker, navigateMarker } = useMarkers();
  const {
    collections,
    currentCollectionIndex,
    addCollection,
    removeCollection,
    navigateCollection
  } = useMessageCollections();
  const {
    chatRef,
    handleScroll,
    handleAddMarker,
    handleRemoveMarker,
    handleNavigateMarker,
    getCurrentMarkerNumber,
  } = useScrollHandling(markers, addMarker, removeMarker, navigateMarker);

  useEffect(() => {
    setIsMounted(true);
    initializeChat();
  }, [initializeChat]);

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const handleAddCollection = useCallback(() => {
    const name = prompt('Enter a name for the collection:');
    if (name) {
      addCollection(name, messages);
    }
  }, [addCollection, messages]);

  const handleRemoveCollection = useCallback(() => {
    if (currentCollectionIndex !== null) {
      const collectionToRemove = collections[currentCollectionIndex];
      if (confirm(`Are you sure you want to remove the collection "${collectionToRemove.name}"?`)) {
        removeCollection(collectionToRemove.id);
      }
    }
  }, [currentCollectionIndex, collections, removeCollection]);

  if (!isMounted) {
    return null; // or return a loading spinner
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-grow overflow-hidden pb-[104px]">
        <MessageCollections
          collections={collections}
          currentCollectionIndex={currentCollectionIndex}
          onNavigateUp={() => navigateCollection('up')}
          onNavigateDown={() => navigateCollection('down')}
          onAddCollection={handleAddCollection}
          onRemoveCollection={handleRemoveCollection}
        />
        <Card className="flex-grow overflow-y-auto p-3 bg-gray-900 border-gray-700 rounded-none custom-scrollbar">
          <div ref={chatRef} onScroll={handleScroll}>
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
          </div>
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
        className="flex space-x-2 p-2 bg-gray-800 fixed bottom-14 left-0 right-0 h-[52px]"
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
          <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700 p-2 rounded-r-lg h-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
