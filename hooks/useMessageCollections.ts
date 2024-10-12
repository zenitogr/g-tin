import { useState, useCallback } from 'react';
import { Message } from '@/types/chat'; // Make sure to import the Message type

export interface MessageCollection {
  id: number;
  name: string;
  messages: { text: string; isUser: boolean }[];
}

export function useMessageCollections() {
  const [collections, setCollections] = useState<MessageCollection[]>([]);
  const [currentCollectionIndex, setCurrentCollectionIndex] = useState<number | null>(null);
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);

  const addCollection = useCallback((name: string, messages: { text: string; isUser: boolean }[]) => {
    const newCollection: MessageCollection = {
      id: Date.now(),
      name,
      messages,
    };
    setCollections(prevCollections => [...prevCollections, newCollection]);
    setCurrentCollectionIndex(collections.length);
  }, [collections.length]);

  const removeCollection = useCallback((id: number) => {
    setCollections(prevCollections => {
      const updatedCollections = prevCollections.filter(collection => collection.id !== id);
      if (currentCollectionIndex !== null && currentCollectionIndex >= updatedCollections.length) {
        setCurrentCollectionIndex(updatedCollections.length > 0 ? updatedCollections.length - 1 : null);
      }
      return updatedCollections;
    });
  }, [currentCollectionIndex]);

  const navigateCollection = useCallback((direction: 'up' | 'down') => {
    if (collections.length === 0) return;

    setCurrentCollectionIndex(prevIndex => {
      if (prevIndex === null) return direction === 'up' ? collections.length - 1 : 0;
      if (direction === 'up') return prevIndex > 0 ? prevIndex - 1 : collections.length - 1;
      return prevIndex < collections.length - 1 ? prevIndex + 1 : 0;
    });
  }, [collections.length]);

  const toggleMessageSelection = useCallback((messageId: number) => {
    setSelectedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  }, []);

  const addSelectedMessagesToCollection = useCallback((collectionId: number, messages: Message[]) => {
    setCollections(prevCollections => {
      return prevCollections.map(collection => {
        if (collection.id === collectionId) {
          const newMessages = selectedMessages.map(id => {
            const message = messages.find(m => m.id === id);
            return message ? { text: message.text, isUser: message.isUser } : null;
          }).filter((m): m is { text: string; isUser: boolean } => m !== null);
          
          return {
            ...collection,
            messages: [...collection.messages, ...newMessages]
          };
        }
        return collection;
      });
    });
    setSelectedMessages([]);
  }, [selectedMessages]);

  return {
    collections,
    currentCollectionIndex,
    selectedMessages,
    addCollection,
    removeCollection,
    navigateCollection,
    toggleMessageSelection,
    addSelectedMessagesToCollection,
  };
}
