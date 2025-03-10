import React from 'react';
import { useMemory } from '../contexts/MemoryContext';
import { FiTrash2 } from 'react-icons/fi';
import { formatResult } from '../utils/mathParser';

const MemoryPanel = () => {
  const { memories, deleteMemory, clearAllMemories } = useMemory();

  const formatMemoryValue = (value) => {
    return formatResult(value, 'feet');
  };

  return (
    <div className="h-full flex flex-col p-3">
      <h2 className="text-lg font-semibold mb-2">Memory Slots</h2>
      
      <div className="flex-grow overflow-auto mb-2">
        {Object.keys(memories).length === 0 ? (
          <p className="text-gray-500 text-sm">No memories saved yet.</p>
        ) : (
          <div className="space-y-2">
            {Object.entries(memories).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-2 rounded-lg bg-white shadow-sm border border-gray-200">
                <span className="font-semibold">{key}:</span>
                <span className="text-gray-700 font-mono text-sm truncate max-w-[120px]">{formatMemoryValue(value)}</span>
                <button
                  onClick={() => deleteMemory(key)}
                  className="p-1 rounded-md hover:bg-red-100 text-red-500"
                  aria-label={`Clear memory slot ${key}`}
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={clearAllMemories}
        className="w-full py-2 rounded-lg text-sm font-bold text-white shadow-lg transition-all bg-red-500 hover:bg-red-600 focus:outline-none"
      >
        Clear All Memories
      </button>
    </div>
  );
};

export default MemoryPanel;
