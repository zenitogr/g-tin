import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  sendMessage: () => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = React.memo(({ inputMessage, setInputMessage, sendMessage, isLoading }) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      sendMessage();
    }
  };

  return (
    <div className="flex items-center space-x-2" role="form" aria-label="Chat input">
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        className="chat-input flex-grow bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border-none rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your message..."
        aria-label="Type your message"
        disabled={isLoading}
      />
      <button
        onClick={sendMessage}
        className={`chat-button-send bg-blue-500 text-white p-2 rounded-full flex-shrink-0 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Send message"
        disabled={isLoading}
      >
        <Send size={20} />
      </button>
    </div>
  );
});