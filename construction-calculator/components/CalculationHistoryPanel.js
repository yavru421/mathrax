import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';

const CalculationHistoryPanel = ({ history, onClearHistory, theme, onSelectHistoryItem }) => {
    const handleItemClick = useCallback((item) => {
        onSelectHistoryItem(item);
    }, [onSelectHistoryItem]);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`bg-white shadow-xl rounded-2xl border border-gray-100 p-6 max-h-[600px] overflow-y-auto w-full lg:w-96 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : ''}`}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Calculation History</h3>
                <button
                    onClick={onClearHistory}
                    className={`p-2 rounded-full hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${theme === 'dark' ? 'text-white hover:bg-white/20 focus:ring-white' : 'text-gray-700 hover:bg-gray-200 focus:ring-gray-500'}`}
                    aria-label="Clear History"
                >
                    <FiTrash2 size={20} />
                </button>
            </div>
            {history.length === 0 ? (
                <p className={`text-gray-500 ${theme === 'dark' ? 'text-gray-400' : ''}`}>No calculations yet.</p>
            ) : (
                <ul className="space-y-2">
                    {history.map((item) => (
                        <motion.li
                            key={item.key}
                            className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200 ${theme === 'dark' ? 'hover:bg-gray-700' : ''}`}
                            onClick={() => handleItemClick(item)}
                        >
                            <p className={`font-mono text-sm text-gray-600 truncate ${theme === 'dark' ? 'text-gray-400' : ''}`}>{item.input}</p>
                            <p className={`font-bold text-lg font-mono ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.result}</p>
                            <p className={`text-xs text-gray-500 italic ${theme === 'dark' ? 'text-gray-500' : ''}`}>{item.type}</p>
                        </motion.li>
                    ))}
                </ul>
            )}
        </motion.div>
    );
};

export default CalculationHistoryPanel;
