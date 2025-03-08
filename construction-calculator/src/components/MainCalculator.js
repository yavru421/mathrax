import dynamic from 'next/dynamic';
import React, { useState, useRef, useCallback, useEffect } from 'react'; // Added useEffect
import { motion } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
import { evaluateExpression, formatResult } from '../utils/mathParser'; // Keep your existing utils import
import { FiCalculator, FiClock, FiHelpCircle, FiTrash2 } from 'react-icons/fi';
import { useMemory } from '../contexts/MemoryContext';
import useSound from 'use-sound';

// Attempt to dynamically import mathjs (for better Webpack compatibility)
const mathjs = import('mathjs').then(math => math);

const MemoryPanel = dynamic(() => import('./MemoryPanel'), { ssr: false });

const MainCalculator = () => {
  const [input, setInput] = useState('');
  const [calcType, setCalcType] = useState('feet');
  const [result, setResult] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [inputError, setInputError] = useState('');
  const inputRef = useRef(null);
  const { memories, saveMemory, deleteMemory, clearAllMemories } = useMemory();
  const [currentMemoryKey, setCurrentMemoryKey] = useState('A');
  const [mathParser, setMathParser] = useState(null); // State to hold mathjs parser

  const [playSuccess] = useSound('/sounds/success.mp3', { volume: 0.5 });
  const [playError] = useSound('/sounds/error.mp3', { volume: 0.5 });

  const types = [
    { id: 'feet', label: 'Length (ft/in)' }
  ];

  // Load mathjs parser after component mounts using useEffect
  useEffect(() => {
    mathjs.then(math => {
      setMathParser(math.parser()); // Store the parser instance in state
    });
  }, []);

  const handleCalculate = useCallback(async () => {
    setInputError('');
    let interpretationsDisplay = document.getElementById('input-interpretations-display');

    try {
      if (!input.trim()) {
        setInputError("Please enter a calculation.");
        if (typeof playError === 'function') playError();
        if (interpretationsDisplay) {
          interpretationsDisplay.innerHTML = `<p class="text-red-500">Please enter a calculation.</p>`;
        }
        return;
      }

      // Show preprocessing steps
      if (interpretationsDisplay) {
        interpretationsDisplay.innerHTML = `<p>Processing expression...</p>`;
      }

      // Evaluate the expression
      const value = await evaluateExpression(input, calcType, memories);
      console.log('Calculated value:', value);
      
      if (value === null) {
        throw new Error("Invalid calculation");
      }
      
      // Format the result
      const formatted = formatResult(value, calcType);
      console.log('Formatted result:', formatted);
      
      setResult({ value, formatted });
      
      if (typeof playSuccess === 'function') playSuccess();

      // Show the interpretation steps
      if (interpretationsDisplay) {
        interpretationsDisplay.innerHTML = `
          <p class="text-green-600">Calculation steps:</p>
          <pre class="mt-2 bg-gray-50 p-2 rounded">
Input: ${input}
Value: ${value}
Result: ${formatted}
          </pre>
        `;
      }

      // Save to memory
      if (value !== null) {
        saveMemory(currentMemoryKey, value);
        if (/^[A-Z]$/.test(currentMemoryKey)) {
          const nextKey = String.fromCharCode(currentMemoryKey.charCodeAt(0) + 1 > 90 ? 65 : currentMemoryKey.charCodeAt(0) + 1);
          setCurrentMemoryKey(nextKey);
        }
      }
      
    } catch (err) {
      console.error('Calculator error:', err);
      const errorMessage = err.message || 'Calculation error';
      setResult({ error: errorMessage });
      setInputError(errorMessage);
      
      if (interpretationsDisplay) {
        interpretationsDisplay.innerHTML = `
          <p class="text-red-500">Error processing calculation:</p>
          <pre class="mt-2 bg-red-50 p-2 rounded">
${errorMessage}
Input: ${input}
          </pre>
        `;
      }
      
      if (typeof playError === 'function') playError();
    }
  }, [input, calcType, memories, playSuccess, playError, saveMemory, currentMemoryKey]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCalculate();
    }
  }, [handleCalculate]);

  const handleClearInput = () => {
    setInput('');
    setResult(null);
    setInputError('');
    document.getElementById('input-interpretations-display').innerHTML = `<p>No interpretations yet. Enter calculation.</p>`;
    inputRef.current.focus();
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  const handleSaveMemory = (key) => {
    try {
      const evaluatedResult = evaluateExpression(input, calcType, memories);
      saveMemory(key, evaluatedResult);
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };
  
  // Update the example calculations to show only length calculations
  const examples = [
    '15ft + 6in',
    '(10ft * 2) + 3in',
    '5ft 6in + 3ft 2in',
    '(8ft + 3in) * 2'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-indigo-900">
            MATHRAX
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleHelp}
              className={`p-2 rounded-full hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${false ? 'text-white hover:bg-white/20 focus:ring-white' : 'bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-300'}`}
              aria-label="Help"
            >
              <FiHelpCircle size={24} />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Calculator */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl shadow-xl overflow-hidden border ${false ? 'bg-gray-800 border-gray-700' : 'bg-bg-off-white border-secondary-slate/30'}`}
            >
              <div className={`p-8 bg-gradient-to-r ${false ? 'from-gray-700 to-gray-600' : 'from-primary-teal to-accent-blue'}`}>
                {/* Type Selector */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {types.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setCalcType(type.id)}
                      className={`
                        flex items-center gap-2 px-6 py-3 rounded-xl
                        font-semibold transition-all duration-200 text-base
                        ${calcType === type.id
                          ? `bg-bg-off-white text-primary-teal shadow-md scale-105 border border-secondary-slate/20 ${false ? 'hover:bg-gray-100' : ''}`
                          : `bg-opacity-10 ${false ? 'text-gray-300 hover:bg-white/10' : 'text-white hover:bg-primary-teal/20'}`}
                      `}
                      aria-label={`Calculate ${type.label}`}
                    >
                      <img
                        src={`/images/icons/${type.id}-icon.svg`}
                        alt=""
                        className="w-5 h-5"
                      />
                      {type.label}
                    </button>
                  ))}
                </div>

                {/* Input Area */}
                <div className={`relative bg-opacity-5 rounded-xl p-2 mb-2 ${inputError ? 'border-2 border-red-500' : ''} border border-secondary-slate/20 ${false ? 'bg-white/5 border-gray-600' : 'bg-white/5 border-secondary-slate/20'}`}>
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className={`w-full h-48 p-6 text-2xl font-mono rounded-lg focus:ring-2 focus:ring-opacity-50 resize-none ${false ? 'bg-black/20 text-white focus:ring-white/50 placeholder-gray-400' : 'bg-bg-off-white text-text-dark-grey focus:ring-primary-teal/30 placeholder-text-dark-grey/40 border border-secondary-slate/20'}`}
                    placeholder={`Enter complex calculation (e.g., (15'6" + 20'3")/2 * 4)`}
                  />
                  {input && (
                    <button
                      onClick={handleClearInput}
                      className="absolute top-2 right-2 p-2 rounded-md bg-white/10 hover:bg-white/20 text-white"
                      aria-label="Clear Input"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  )}
                </div>
                
                {/* Show common expressions as quick reference */}
                <div className="mt-4 mb-4 text-white text-opacity-90 text-sm">
                  <p className="mb-1 font-semibold">Common expressions:</p>
                  <div className="flex flex-wrap gap-2">
                    {examples.map((example, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(example)}
                        className="px-2 py-1 bg-white/20 rounded-md text-xs hover:bg-white/30"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>

                {inputError && (
                  <p className="text-red-400 text-sm mt-1">{inputError}</p>
                )}

                {/* Input Interpretations Display */}
                <div className="mt-4 p-4 rounded-lg bg-gray-100 border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Input Interpretations:</h4>
                  <div id="input-interpretations-display" className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                    <p>No interpretations yet. Enter calculation.</p>
                  </div>
                </div>


                {/* Results Area */}
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-6 p-6 rounded-xl ${
                      result.error
                        ? 'bg-red-500/10 border-2 border-red-500'
                        : 'bg-emerald-500/10 border-2 border-emerald-500'
                    }`}
                  >
                    {result.error ? (
                      <p className="text-red-200 text-xl">{result.error}</p>
                    ) : (
                      <div className="text-4xl font-mono text-white font-bold">
                        {result.formatted}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Calculate Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCalculate}
                  className="w-full mt-6 py-5 rounded-xl text-xl font-bold shadow-lg transition-all"
                  style={{ backgroundColor: false ? '#6B7280' : '', color: false ? 'white' : '', backgroundImage: !false ? 'linear-gradient(to right, #accent-blue, #primary-teal)' : '' }}
                  aria-label="Calculate"
                >
                  Calculate
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Memory Panel */}
          <MemoryPanel />
        </div>
      </div>

      {/* Help Dialog */}
      <Transition.Root show={showHelp} as={React.Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={setShowHelp}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal content. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className={`text-lg font-bold leading-6 border-b pb-2 mb-4 ${false ? 'text-white border-gray-600' : 'text-text-dark-grey border-secondary-slate/30'}`}
                >
                  Help - MATHRAX
                </Dialog.Title>
                <div className="prose prose-sm max-w-none">
                  <h3>Understanding Input</h3>
                  <p>This calculator handles complex expressions combining construction measurements:</p>
                  <ul>
                    <li><code>15'6" + 20'3"</code> - Adding two lengths</li>
                    <li><code>(12' * 10') / 2</code> - Triangle area using division</li>
                    <li><code>((4' + 5') * 10') / 27</code> - Calculate volume in cubic yards</li>
                    <li><code>4' 6" * (8' + 2')</code> - Mixed notation with parentheses</li>
                  </ul>
                  <h3>Supported Units</h3>
                  <ul>
                    <li><strong>Length (ft/in):</strong> feet (<code>ft</code> or <code>'</code>), inches (<code>in</code> or <code>"</code>).</li>
                    <li><strong>Area:</strong> Area from length inputs (e.g., <code>ft * ft</code>).</li>
                    <li><strong>Volume:</strong> Volume, cubic feet, etc.</li>
                    <li><strong>Cubic Yards:</strong> <code>yd3</code> or <code>yards</code>.</li>
                  </ul>
                  <h3>Memory Keys</h3>
                  <p>Results are auto-saved to memory slots (A, B, C...). Use memory values in calculations with single letters:</p>
                  <ul>
                    <li><code>A + 10</code> - Add 10 to memory value A</li>
                    <li><code>A * B</code> - Multiply memory values A and B</li>
                    <li><code>(A + B) / 2</code> - Average of memory values A and B</li>
                  </ul>
                  <h3>Keyboard Shortcuts</h3>
                  <ul>
                    <li><strong>Enter:</strong> Calculate.</li>
                  </ul>
                  <p>Advanced operations/unit conversions: refer to math parser docs.</p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className={`inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-teal/50 ${false ? 'text-white bg-gray-600 hover:bg-gray-500' : 'text-text-dark-grey bg-indigo-100 hover:bg-indigo-200'}`}
                    onClick={toggleHelp}
                    aria-label="Close Help"
                  >
                    Got it!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default MainCalculator;