// contexts/MemoryContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const MemoryContext = createContext();

export function useMemory() {
  return useContext(MemoryContext);
}

export function MemoryProvider({ children }) {
  const [memories, setMemories] = useState({});

  // Load memories from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedMemories = localStorage.getItem('calculator_memories');
        if (savedMemories) {
          setMemories(JSON.parse(savedMemories));
        }
      } catch (error) {
        console.error('Failed to load memories from localStorage:', error);
      }
    }
  }, []);

  // Save memories to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && Object.keys(memories).length > 0) {
      try {
        localStorage.setItem('calculator_memories', JSON.stringify(memories));
      } catch (error) {
        console.error('Failed to save memories to localStorage:', error);
      }
    }
  }, [memories]);

  const saveMemory = (key, value) => {
    setMemories(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const deleteMemory = (key) => {
    setMemories(prev => {
      const newMemories = { ...prev };
      delete newMemories[key];
      return newMemories;
    });
  };

  const clearAllMemories = () => {
    setMemories({});
    if (typeof window !== 'undefined') {
      localStorage.removeItem('calculator_memories');
    }
  };

  return (
    <MemoryContext.Provider value={{ 
      memories, 
      saveMemory, 
      deleteMemory, 
      clearAllMemories 
    }}>
      {children}
    </MemoryContext.Provider>
  );
}