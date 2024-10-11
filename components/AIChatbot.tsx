'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, ChevronUp, ChevronsDown } from 'lucide-react';

const AIChatbot = () => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; id: number }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [markers, setMarkers] = useState<number[]>([]);
  const [currentMarkerIndex, setCurrentMarkerIndex] = useState<number | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    const { scrollTop, scrollHeight, clientHeight } = chatContainer;
    const newIsScrolledToBottom = scrollHeight - scrollTop - clientHeight < 1;
    setIsScrolledToBottom(newIsScrolledToBottom);

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set new timeout
    scrollTimeoutRef.current = setTimeout(() => {
      if (!newIsScrolledToBottom) {
        const lastVisibleMessageIndex = Math.floor((scrollTop + clientHeight) / 50) - 1;
        if (lastVisibleMessageIndex >= 0 && !markers.includes(lastVisibleMessageIndex)) {
          setMarkers(prev => {
            const newMarkers = [...prev, lastVisibleMessageIndex].sort((a, b) => a - b);
            setCurrentMarkerIndex(newMarkers.indexOf(lastVisibleMessageIndex));
            return newMarkers;
          });
        }
      }
    }, 2000); // Changed from 3000 to 2000 milliseconds
  }, [markers]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    chatContainer.addEventListener('scroll', handleScroll);
    return () => {
      chatContainer.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    setMessages(prev => [...prev, { text: inputMessage, isUser: true, id: Date.now() }]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: `AI response to: "${inputMessage}"`, isUser: false, id: Date.now() }]);
    }, 1000);
  };

  const scrollToMarker = (index: number) => {
    if (chatContainerRef.current && markers[index] !== undefined) {
      const markerElement = document.getElementById(`message-${markers[index]}`);
      if (markerElement) {
        markerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setCurrentMarkerIndex(index);
      }
    }
  };

  const navigateMarkers = (direction: 'prev' | 'next') => {
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
  };

  return (
    <div className="flex h-full relative">
      <div className="flex-grow flex flex-col">
        <div 
          ref={chatContainerRef} 
          className="flex-grow overflow-y-auto p-4 space-y-4"
        >
          {messages.map((message, index) => (
            <div 
              key={message.id} 
              id={`message-${index}`}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} relative`}
            >
              <div className={`max-w-[70%] p-2 rounded-lg ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                {message.text}
              </div>
              {markers.includes(index) && (
                <div className="w-full h-0.5 bg-red-500 absolute bottom-0 left-0" />
              )}
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-grow p-2 border rounded-lg"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="w-12 flex flex-col justify-end space-y-2 p-2 bg-gray-100">
        <button
          onClick={() => navigateMarkers('prev')}
          className="p-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors duration-200 disabled:opacity-50"
          aria-label="Previous marker"
          disabled={markers.length === 0}
        >
          <ChevronUp size={24} />
        </button>
        <button
          onClick={() => navigateMarkers('next')}
          className="p-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors duration-200 disabled:opacity-50"
          aria-label="Next marker"
          disabled={markers.length === 0}
        >
          <ChevronDown size={24} />
        </button>
        <button
          onClick={scrollToBottom}
          className="p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200"
          aria-label="Scroll to bottom"
        >
          <ChevronsDown size={24} />
        </button>
      </div>
    </div>
  );
};

export default AIChatbot;