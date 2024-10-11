import { Message } from '../types/chat';

interface ChatMessagesProps {
  messages: Message[];
  markers: number[];
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, markers }) => {
  return (
    <>
      {messages.map((message, index) => (
        <div 
          key={message.id} 
          id={`message-${index}`}
          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} relative`}
        >
          <div className={`message ${message.isUser ? 'message-user' : 'message-ai'}`}>
            {message.text}
          </div>
          {markers.includes(index) && (
            <div className="w-full h-0.5 bg-red-500 absolute bottom-0 left-0" />
          )}
        </div>
      ))}
    </>
  );
};