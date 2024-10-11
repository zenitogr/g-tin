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
    >
      <div 
        ref={chatContainerRef} 
        className="flex-grow overflow-y-scroll p-4 space-y-4 scrollbar-custom"
        onScroll={handleScroll}
      >
        <ChatMessages messages={messages} markers={markers} />
      </div>
      <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
        <ChatInput
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </ChatLayout>
  );
};

export default AIChatbot;