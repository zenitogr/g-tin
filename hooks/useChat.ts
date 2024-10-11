import { useState, useCallback } from 'react';
import { ChatState, Message } from '../types/chat';

/**
 * useChat Hook
 * 
 * This hook manages the chat state, including messages, input, loading state, and errors.
 * It provides functions to send messages and handle chat-related actions.
 * 
 * @returns {Object} An object containing chat state and functions
 */
export const useChat = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      { id: Date.now(), text: "Hello! I'm the g-tin AI assistant. How can I help you today?", isUser: false }
    ],
    inputMessage: '',
    isLoading: false,
    error: null
  });

  const setInputMessage = useCallback((message: string) => {
    setChatState((prev: ChatState) => ({ ...prev, inputMessage: message }));
  }, []);

  const sendMessage = useCallback(async () => {
    if (chatState.inputMessage.trim() === '') return;

    const newMessage: Message = { id: Date.now(), text: chatState.inputMessage, isUser: true };
    setChatState((prev: ChatState) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      inputMessage: '',
      isLoading: true,
      error: null
    }));

    try {
      // Simulate API call
      const response = await new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.9) { // 10% chance of error
            reject(new Error('Failed to get AI response'));
          } else {
            resolve(`AI response to: "${chatState.inputMessage}"`);
          }
        }, 1000);
      });

      const aiResponse: Message = { id: Date.now(), text: response, isUser: false };
      setChatState((prev: ChatState) => ({
        ...prev,
        messages: [...prev.messages, aiResponse],
        isLoading: false
      }));
    } catch (error) {
      setChatState((prev: ChatState) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      }));
    }
  }, [chatState.inputMessage]);

  const clearError = useCallback(() => {
    setChatState((prev: ChatState) => ({ ...prev, error: null }));
  }, []);

  return {
    messages: chatState.messages,
    inputMessage: chatState.inputMessage,
    isLoading: chatState.isLoading,
    error: chatState.error,
    setInputMessage,
    sendMessage,
    clearError
  };
};