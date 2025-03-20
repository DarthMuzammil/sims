'use client';

import { create } from 'zustand';

const useChatStore = create((set) => ({
  messages: [],
  isTyping: false,
  currentCharacter: null,
  
  addMessage: (message) => 
    set((state) => ({ 
      messages: [...state.messages, message]
    })),
    
  setIsTyping: (isTyping) => 
    set({ isTyping }),
    
  setCurrentCharacter: (character) =>
    set({ currentCharacter: character }),
    
  clearChat: () =>
    set({ 
      messages: [],
      isTyping: false,
      currentCharacter: null
    }),
}));

export default useChatStore; 