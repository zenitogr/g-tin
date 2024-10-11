import { Send } from 'lucide-react';

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  return (
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
  );
};