import { useState, useCallback } from 'react';
import { Message } from '@/types/chat';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const initializeChat = useCallback(() => {
    setMessages([{ id: Date.now(), text: "Hello! I'm the g-tin AI assistant. How can I help you today?", isUser: false }]);
  }, []);

  const sendMessage = useCallback(() => {
    if (inputMessage.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        { id: Date.now(), text: inputMessage, isUser: true }
      ]);
      setInputMessage('');

      // Simulate AI response
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { id: Date.now(), text: "I'm a mock response. The AI integration is not implemented yet.", isUser: false }
        ]);
      }, 1000);
    }
  }, [inputMessage]);

  return { messages, inputMessage, setInputMessage, sendMessage, initializeChat };
}
