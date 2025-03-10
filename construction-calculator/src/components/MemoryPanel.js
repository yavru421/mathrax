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
    <div className="w-full lg:w-96 rounded-2xl shadow-xl overflow-hidden border bg-bg-off-white border-secondary-slate/30 p-6">
      <h2 className="text-2xl font-semibold mb-4">Memory Slots</h2>
      
      {Object.keys(memories).length === 0 ? (
        <p className="text-gray-500">No memories saved yet.</p>
      ) : (
        <div className="space-y-3">
          {Object.entries(memories).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm border border-gray-200">
              <span className="font-semibold">{key}:</span>
              <span className="text-gray-700 font-mono">{formatMemoryValue(value)}</span>
              <button
                onClick={() => deleteMemory(key)}
                className="p-2 rounded-md hover:bg-red-100 text-red-500"
                aria-label={`Clear memory slot ${key}`}
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={clearAllMemories}
        className="w-full mt-6 py-3 rounded-xl text-base font-bold text-white shadow-lg transition-all bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Clear All Memories
      </button>
    </div>
  );
};

export default MemoryPanel;
