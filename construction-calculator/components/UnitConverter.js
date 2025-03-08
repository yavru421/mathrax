import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { units } from '../utils/unitConversions'; // You'll need to create this utility file
import { FiX } from 'react-icons/fi';

const UnitConverter = ({ theme, onClose }) => {
    const [fromValue, setFromValue] = useState('');
    const [fromUnit, setFromUnit] = useState('feet');
    const [toUnit, setToUnit] = useState('inches');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const handleConvert = useCallback(() => {
        setError('');
        try {
            const value = parseFloat(fromValue);
            if (isNaN(value)) {
                setError("Invalid input value.");
                setResult('');
                return;
            }

            if (!units[fromUnit] || !units[toUnit]) {
                setError("Invalid unit selection.");
                setResult('');
                return;
            }

            const baseValue = value * units[fromUnit].toBase;
            const convertedValue = baseValue / units[toUnit].toBase;
            setResult(convertedValue.toFixed(4)); // Format to 4 decimal places
        } catch (err) {
            setError("Conversion error.");
            setResult('');
        }
    }, [fromValue, fromUnit, toUnit]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`bg-white shadow-xl rounded-2xl border border-gray-100 p-6 w-full lg:w-96 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : ''}`}
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Unit Converter</h3>
                <button
                    onClick={onClose}
                    className={`p-2 rounded-full hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${theme === 'dark' ? 'text-white hover:bg-white/20 focus:ring-white' : 'text-gray-700 hover:bg-gray-200 focus:ring-gray-500'}`}
                    aria-label="Close Unit Converter"
                >
                    <FiX size={20} />
                </button>
            </div>

            {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

            <div className="mb-4">
                <label htmlFor="fromValue" className={`block mb-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Value</label>
                <input
                    type="number"
                    id="fromValue"
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : ''}`}
                    placeholder="Enter value"
                    value={fromValue}
                    onChange={(e) => setFromValue(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label htmlFor="fromUnit" className={`block mb-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>From Unit</label>
                    <select
                        id="fromUnit"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value)}
                    >
                        {Object.keys(units).map((unitKey) => (
                            <option key={unitKey} value={unitKey}>{units[unitKey].label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="toUnit" className={`block mb-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>To Unit</label>
                    <select
                        id="toUnit"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                        value={toUnit}
                        onChange={(e) => setToUnit(e.target.value)}
                    >
                        {Object.keys(units).map((unitKey) => (
                            <option key={unitKey} value={unitKey}>{units[unitKey].label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConvert}
                className="w-full py-2 rounded-xl text-lg font-semibold shadow-md transition-all duration-200"
                style={{ backgroundColor: theme === 'dark' ? '#6B7280' : '', color: theme === 'dark' ? 'white' : '', backgroundImage: theme !== 'dark' ? 'linear-gradient(to right, #10b981, #134e4a)' : '' }}
            >
                Convert
            </motion.button>

            {result && (
                <div className={`mt-6 p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-100'}`}>
                    <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Result:</p>
                    <p className={`text-2xl font-mono ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{result} {units[toUnit].symbol}</p>
                </div>
            )}
        </motion.div>
    );
};

export default UnitConverter;
