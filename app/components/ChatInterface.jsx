'use client';

import React, { useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import './ChatInterface.css';
import useChatStore from '../store/chatStore';

const ChatMessage = ({ message, isCharacter }) => {
  return (
    <div
      className={clsx(
        'mb-4 flex',
        isCharacter ? 'justify-start' : 'justify-end'
      )}
    >
      <div
        className={clsx(
          'max-w-[70%] rounded-2xl px-4 py-2',
          isCharacter
            ? 'bg-blue-100 text-blue-900'
            : 'bg-green-100 text-green-900',
          'relative',
          'animate-fadeIn'
        )}
      >
        <div className="text-sm">{message.content}</div>
        <div className="text-xs text-gray-500 mt-1">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
        {/* Speech bubble triangle */}
        <div
          className={clsx(
            'absolute top-[50%] w-4 h-4 transform rotate-45',
            isCharacter
              ? '-left-2 bg-blue-100'
              : '-right-2 bg-green-100'
          )}
        />
      </div>
    </div>
  );
};

const ChatInterface = () => {
  const { messages, isTyping, currentCharacter, addMessage, setIsTyping } = useChatStore();
  const [inputValue, setInputValue] = React.useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      content: inputValue,
      timestamp: new Date(),
      isCharacter: false,
    };

    addMessage(newMessage);
    setInputValue('');

    // Simulate character response (this will be replaced with actual character AI later)
    setIsTyping(true);
    setTimeout(() => {
      const characterResponse = {
        id: Date.now() + 1,
        content: `I'm ${currentCharacter || 'a character'} - this is just a demo response!`,
        timestamp: new Date(),
        isCharacter: true,
      };
      addMessage(characterResponse);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">
          Chat with {currentCharacter || 'Character'}
        </h3>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isCharacter={message.isCharacter}
          />
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="text-sm">Character is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface; 