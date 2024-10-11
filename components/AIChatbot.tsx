'use client';

import { useState } from 'react';
import { useChat } from '../hooks/useChat';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { ChatLayout } from './ChatLayout';

const AIChatbot = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const {
    messages,
    inputMessage,
    setInputMessage,
    markers,
    currentMarkerIndex,
    handleSendMessage,
    handleScroll,
    navigateMarkers,
    scrollToBottom,
    chatContainerRef,
  } = useChat();

  const toggleNav = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  return (
    <ChatLayout
      isNavExpanded={isNavExpanded}
      toggleNav={toggleNav}
      navigateMarkers={navigateMarkers}
      scrollToBottom={scrollToBottom}
      markersLength={markers.length}
      currentMarkerIndex={currentMarkerIndex}
    >
      <div 
        ref={chatContainerRef} 
        className="flex-grow overflow-y-scroll p-4 space-y-4 scrollbar-custom bg-gray-900"
        onScroll={handleScroll}
      >
        <ChatMessages messages={messages} markers={markers} />
      </div>
      <ChatInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleSendMessage}
      />
    </ChatLayout>
  );
};

export default AIChatbot;