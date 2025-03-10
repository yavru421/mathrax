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
    <div className="h-full py-2 px-2"> {/* Reduced padding */}
      <div className="h-full max-w-7xl mx-auto flex flex-col">
        {/* Header - even more compact */}
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl font-bold text-indigo-900"> {/* Smaller text */}
            Imperial Calculator
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleHelp}
              className="p-1 rounded-full bg-indigo-100 hover:bg-indigo-200 focus:outline-none"
              aria-label="Help"
            >
              <FiHelpCircle size={18} /> {/* Smaller icon */}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-2 flex-1 overflow-hidden"> {/* Reduced gap */}
          {/* Main Calculator */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full rounded-lg shadow-lg overflow-hidden border bg-bg-off-white border-secondary-slate/30 flex flex-col"
            >
              <div className="p-4 bg-gradient-to-r from-primary-teal to-accent-blue flex flex-col h-full">
                {/* Type Selector - more compact */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {types.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setCalcType(type.id)}
                      className={`
                        flex items-center gap-1 px-4 py-1 rounded-lg
                        font-semibold transition-all duration-200 text-sm
                        ${calcType === type.id
                          ? 'bg-bg-off-white text-primary-teal shadow-md scale-105 border border-secondary-slate/20'
                          : 'bg-opacity-10 text-white hover:bg-primary-teal/20'}
                      `}
                      aria-label={`Calculate ${type.label}`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>

                {/* Input Area - reduce height */}
                <div className="relative bg-opacity-5 rounded-lg p-1 mb-2 border border-secondary-slate/20 bg-white/5 flex-grow">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="w-full h-full min-h-[120px] p-3 text-xl font-mono rounded-lg focus:ring-2 focus:ring-opacity-50 resize-none bg-white text-text-dark-grey focus:ring-primary-teal/30 placeholder-text-dark-grey/40 border border-secondary-slate/20"
                    placeholder="Enter calculation (e.g., 15'6&quot; + 20'3&quot;)"
                    style={{
                      display: 'block', // Ensure it's a block element
                      opacity: 1,       // Make sure it's visible
                      visibility: 'visible'
                    }}
                  />
                  {input && (
                    <button
                      onClick={handleClearInput}
                      className="absolute top-2 right-2 p-1 rounded-md bg-white/10 hover:bg-white/20 text-primary-teal"
                      aria-label="Clear Input"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  )}
                </div>
                
                {/* Examples Row - more compact */}
                <div className="mb-2 text-white text-opacity-90 text-xs">
                  <div className="flex flex-wrap gap-1">
                    {examples.map((example, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(example)}
                        className="px-2 py-0.5 bg-white/20 rounded text-xs hover:bg-white/30"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>

                {inputError && (
                  <p className="text-red-400 text-xs mb-1">{inputError}</p>
                )}

                {/* Results Area - more compact */}
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-2 p-3 rounded-lg ${
                      result.error
                        ? 'bg-red-500/10 border-2 border-red-500'
                        : 'bg-emerald-500/10 border-2 border-emerald-500'
                    }`}
                  >
                    {result.error ? (
                      <p className="text-red-200 text-lg">{result.error}</p>
                    ) : (
                      <div className="text-3xl font-mono text-white font-bold">
                        {result.formatted}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Calculate Button - more compact */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCalculate}
                  className="py-3 rounded-lg text-lg font-bold shadow-lg transition-all bg-white text-primary-teal border border-primary-teal/30"
                  aria-label="Calculate"
                >
                  Calculate
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Memory Panel */}
          <div className="lg:w-64 rounded-lg shadow-lg overflow-hidden border bg-bg-off-white border-secondary-slate/30"> {/* Narrower panel */}
            <MemoryPanel />
          </div>
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
                  Help - Imperial Measurement Calculator
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