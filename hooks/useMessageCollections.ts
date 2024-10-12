import { useState, useCallback } from 'react';

export interface MessageCollection {
  id: number;
  name: string;
  messages: { text: string; isUser: boolean }[];
}

export function useMessageCollections() {
  const [collections, setCollections] = useState<MessageCollection[]>([]);
  const [currentCollectionIndex, setCurrentCollectionIndex] = useState<number | null>(null);

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

  return {
    collections,
    currentCollectionIndex,
    addCollection,
    removeCollection,
    navigateCollection,
  };
}
