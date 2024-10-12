import { useState, useCallback } from 'react';

interface Message {
  text: string;
  isUser: boolean;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const initializeChat = useCallback(() => {
    setMessages([{ text: "Hello! I'm the g-tin AI assistant. How can I help you today?", isUser: false }]);
  }, []);

  const sendMessage = useCallback(() => {
    if (inputMessage.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: inputMessage, isUser: true }
      ]);
      setInputMessage('');

      // Simulate AI response
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: "I'm a mock response. The AI integration is not implemented yet.", isUser: false }
        ]);
      }, 1000);
    }
  }, [inputMessage]);

  return { messages, inputMessage, setInputMessage, sendMessage, initializeChat };
}