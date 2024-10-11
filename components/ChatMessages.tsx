import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message } from '../types/chat';

interface ChatMessagesProps {
  messages: Message[];
  markers: number[];
}

const messageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 }
};

export const ChatMessages: React.FC<ChatMessagesProps> = React.memo(({ messages, markers }) => {
  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No messages yet. Start a conversation!</p>
      </div>
    );
  }

  return (
    <AnimatePresence initial={false}>
      {messages.map((message, index) => (
        <motion.div 
          key={message.id} 
          id={`message-${index}`}
          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} relative`}
          variants={messageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeOut" }}
          role="listitem"
          aria-label={`${message.isUser ? 'User' : 'AI'} message`}
        >
          <div className={`message ${message.isUser ? 'message-user' : 'message-ai'}`}>
            {message.text}
          </div>
          {markers.includes(index) && (
            <div className="w-1 bg-red-500 absolute top-0 bottom-0 right-0" aria-hidden="true" />
          )}
        </motion.div>
      ))}
    </AnimatePresence>
  );
});