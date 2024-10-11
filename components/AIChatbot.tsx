'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, ChevronUp, ChevronsDown, Send, ChevronLeft, ChevronRight } from 'lucide-react';

interface Marker {
  start: number;
  end: number;
  id: number;
}

const AIChatbot = () => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; id: number }>>([
    { text: "Hello! I'm the g-tin AI assistant. How can I help you today?", isUser: false, id: Date.now() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [currentMarkerIndex, setCurrentMarkerIndex] = useState<number | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [markerStartIndex, setMarkerStartIndex] = useState<number | null>(null);

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
        console.log('Last visible message index:', lastVisibleMessageIndex);
        console.log('Current marker start index:', markerStartIndex);
        
        if (lastVisibleMessageIndex >= 0) {
          if (markerStartIndex === null) {
            console.log('Setting marker start index');
            setMarkerStartIndex(lastVisibleMessageIndex);
          } else {
            console.log('Creating new marker');
            const newMarker: Marker = {
              start: markerStartIndex,
              end: lastVisibleMessageIndex,
              id: Date.now()
            };
            setMarkers(prev => {
              console.log('Previous markers:', prev);
              console.log('New marker:', newMarker);
              return [...prev, newMarker];
            });
            setMarkerStartIndex(null);
          }
        }
      } else {
        console.log('Scrolled to bottom, resetting marker start index');
        setMarkerStartIndex(null);
      }
    }, 2000);
  }, [markerStartIndex]);

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

  useEffect(() => {
    // Scroll to bottom when component mounts to show initial message
    scrollToBottom();
  }, []); // Empty dependency array ensures this runs only once on mount

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
    if (chatContainerRef.current && markers[index]) {
      const markerStartElement = document.getElementById(`message-${markers[index].start}`);
      if (markerStartElement) {
        markerStartElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  const toggleNav = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  return (
    <div className="flex h-full relative chat-container">
      <div className={`flex-grow flex flex-col ${isNavExpanded ? 'w-2/3' : 'w-full'} transition-all duration-300`}>
        <div 
          ref={chatContainerRef} 
          className="flex-grow overflow-y-scroll p-4 space-y-4 scrollbar-custom"
        >
          {messages.map((message, index) => (
            <div 
              key={message.id} 
              id={`message-${index}`}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} relative`}
            >
              <div className={`message ${message.isUser ? 'message-user' : 'message-ai'}`}>
                {message.text}
              </div>
              {markers.some(marker => index >= marker.start && index <= marker.end) && (
                <div className="w-1 bg-red-500 absolute top-0 bottom-0 right-0" />
              )}
            </div>
          ))}
        </div>
        <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="chat-input flex-grow"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className="chat-button-send bg-blue-500 text-white p-2 rounded-full flex-shrink-0"
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className={`flex flex-col justify-between bg-gray-100 dark:bg-gray-800 transition-all duration-300 ${isNavExpanded ? 'w-1/3' : 'w-12'}`}>
        <button
          onClick={toggleNav}
          className="chat-button bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white self-start m-2"
          aria-label={isNavExpanded ? "Collapse navigation" : "Expand navigation"}
        >
          {isNavExpanded ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
        <div className="flex flex-col justify-end space-y-2 p-2">
          <button
            onClick={() => navigateMarkers('prev')}
            className="chat-button bg-green-500 text-white"
            aria-label="Previous marker"
            disabled={markers.length === 0}
          >
            <ChevronUp size={24} />
            {isNavExpanded && <span className="ml-2">Previous</span>}
          </button>
          <button
            onClick={() => navigateMarkers('next')}
            className="chat-button bg-green-500 text-white"
            aria-label="Next marker"
            disabled={markers.length === 0}
          >
            <ChevronDown size={24} />
            {isNavExpanded && <span className="ml-2">Next</span>}
          </button>
          <button
            onClick={scrollToBottom}
            className="chat-button bg-blue-500 text-white"
            aria-label="Scroll to bottom"
          >
            <ChevronsDown size={24} />
            {isNavExpanded && <span className="ml-2">Bottom</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;