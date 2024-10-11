'use client';

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { useMarkers } from '../hooks/useMarkers';
import { useScroll } from '../hooks/useScroll';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { NavigationPanel } from './NavigationPanel';
import { Marker } from '../types/chat';

/**
 * AIChatbot Component
 * 
 * This component represents the main chat interface for the AI chatbot.
 * It integrates various hooks for chat functionality, marker management, and scrolling.
 * 
 * @returns {JSX.Element} The rendered AIChatbot component
 */
const AIChatbot: React.FC = () => {
  const { messages, inputMessage, setInputMessage, sendMessage, isLoading, error, clearError } = useChat();
  const { markers, currentMarkerIndex, addMarker, navigateMarkers } = useMarkers();
  const {
    isScrolledToBottom,
    canScrollUp,
    canScrollDown,
    isButtonScroll,
    isMarkerScrolling,
    setIsMarkerScrolling,
    handleScroll,
    scrollToBottom
  } = useScroll();

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom(chatContainerRef.current!);
    }
  }, [messages, scrollToBottom]);

  useEffect(() => {
    scrollToBottom(chatContainerRef.current!);
  }, [scrollToBottom]);

  const getVisibleMessageIds = useCallback(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return [];

    const messageElements = chatContainer.querySelectorAll('[id^="message-"]');
    const visibleMessageIds: number[] = [];

    messageElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const topVisible = rect.top >= 0 && rect.top < chatContainer.clientHeight;
      const bottomVisible = rect.bottom > 0 && rect.bottom <= chatContainer.clientHeight;

      if (topVisible || bottomVisible) {
        const messageId = parseInt(el.id.split('-')[1]);
        visibleMessageIds.push(messageId);
      }
    });

    return visibleMessageIds;
  }, []);

  const handleScrollEvent = useCallback(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    const { scrollTop, scrollHeight, clientHeight } = chatContainer;
    handleScroll(scrollTop, scrollHeight, clientHeight, () => {
      const visibleMessageIds = getVisibleMessageIds();
      if (visibleMessageIds.length > 0 && !isMarkerScrolling) {
        addMarker({
          id: Date.now(),
          messageIds: visibleMessageIds,
          scrollPosition: scrollTop
        });
      }
    });
  }, [handleScroll, isMarkerScrolling, addMarker, getVisibleMessageIds]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    chatContainer.addEventListener('scroll', handleScrollEvent);
    return () => {
      chatContainer.removeEventListener('scroll', handleScrollEvent);
    };
  }, [handleScrollEvent]);

  const scrollToNextMessage = useCallback(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    const messageElements = chatContainer.querySelectorAll('[id^="message-"]');
    const { scrollTop, clientHeight } = chatContainer;

    let nextMessageToScroll: HTMLElement | null = null;

    for (let i = 0; i < messageElements.length; i++) {
      const element = messageElements[i] as HTMLElement;
      const elementBottom = element.offsetTop + element.offsetHeight;
      
      if (elementBottom > scrollTop + clientHeight) {
        nextMessageToScroll = element;
        break;
      }
    }

    if (nextMessageToScroll) {
      const scrollPosition = nextMessageToScroll.offsetTop + nextMessageToScroll.offsetHeight - clientHeight;
      chatContainer.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const scrollToPreviousMessage = useCallback(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    const messageElements = chatContainer.querySelectorAll('[id^="message-"]');
    const { scrollTop } = chatContainer;

    for (let i = messageElements.length - 1; i >= 0; i--) {
      const element = messageElements[i] as HTMLElement;
      if (element.offsetTop < scrollTop) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      }
    }
  }, []);

  const toggleNav = useCallback(() => {
    setIsNavExpanded(prev => !prev);
  }, []);

  const getCurrentMarkerDisplay = useCallback(() => {
    if (markers.length === 0) return '-';
    if (currentMarkerIndex === null) return '-';
    return `${markers.length - currentMarkerIndex}/${markers.length}`;
  }, [markers.length, currentMarkerIndex]);

  const handleScrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      scrollToBottom(chatContainerRef.current);
    }
  }, [scrollToBottom]);

  const memoizedChatMessages = useMemo(() => (
    <ChatMessages messages={messages} markers={markers.flatMap((m: Marker) => m.messageIds)} />
  ), [messages, markers]);

  const memoizedChatInput = useMemo(() => (
    <ChatInput
      inputMessage={inputMessage}
      setInputMessage={setInputMessage}
      sendMessage={sendMessage}
      isLoading={isLoading}
    />
  ), [inputMessage, setInputMessage, sendMessage, isLoading]);

  const memoizedNavigationPanel = useMemo(() => (
    <NavigationPanel
      isNavExpanded={isNavExpanded}
      toggleNav={toggleNav}
      navigateMarkers={navigateMarkers}
      getCurrentMarkerDisplay={getCurrentMarkerDisplay}
      scrollToBottom={handleScrollToBottom}
      markersLength={markers.length}
    />
  ), [isNavExpanded, toggleNav, navigateMarkers, getCurrentMarkerDisplay, handleScrollToBottom, markers.length]);

  return (
    <div className="chat-container" role="main" aria-label="AI Chatbot Interface">
      <div className={`chat-main ${isNavExpanded ? 'w-2/3' : 'w-full'}`}>
        {canScrollUp && (
          <button
            onClick={scrollToPreviousMessage}
            className="chat-scroll-button top-2"
            aria-label="Scroll to previous message"
          >
            <ChevronUp size={20} />
          </button>
        )}
        <div 
          ref={chatContainerRef} 
          className="chat-messages-container"
          role="log"
          aria-live="polite"
          aria-label="Chat messages"
        >
          {memoizedChatMessages}
        </div>
        {canScrollDown && (
          <button
            onClick={scrollToNextMessage}
            className="chat-scroll-button bottom-20"
            aria-label="Scroll to next message"
          >
            <ChevronDown size={20} />
          </button>
        )}
        <div className="chat-input-container">
          {memoizedChatInput}
        </div>
        {error && (
          <div className="chat-error">
            {error}
            <button onClick={clearError} className="ml-2 font-bold">×</button>
          </div>
        )}
      </div>
      {memoizedNavigationPanel}
    </div>
  );
};

export default AIChatbot;