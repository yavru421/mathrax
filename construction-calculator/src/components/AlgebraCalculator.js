import React, { useState } from 'react';
import { motion } from 'framer-motion';
import algebra from 'algebra.js';

const AlgebraCalculator = () => {
  const [equation, setEquation] = useState('');
  const [variable, setVariable] = useState('x');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('algebra'); // 'algebra' or 'pythag'
  const [pythagValues, setPythagValues] = useState({ a: '', b: '', c: '' });
  const [pythagResult, setPythagResult] = useState(null);

  const handleSolve = () => {
    try {
      setError('');
      const expr = algebra.parse(equation);
      const solution = expr.solveFor(variable);
      setResult({
        equation: expr.toString(),
        variable,
        solution: solution.toString()
      });
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  const handlePythag = () => {
    try {
      setPythagResult(null);
      const { a, b, c } = pythagValues;
      let result;

      if (!c) { // Finding hypotenuse
        if (!a || !b) throw new Error('Need both sides to find hypotenuse');
        result = {
          type: 'hypotenuse',
          value: Math.sqrt(Math.pow(Number(a), 2) + Math.pow(Number(b), 2)),
          equation: `c = √(${a}² + ${b}²)`
        };
      } else if (!a) { // Finding side a
        if (!b || !c) throw new Error('Need hypotenuse and one side');
        result = {
          type: 'side',
          value: Math.sqrt(Math.pow(Number(c), 2) - Math.pow(Number(b), 2)),
          equation: `a = √(${c}² - ${b}²)`
        };
      } else if (!b) { // Finding side b
        if (!a || !c) throw new Error('Need hypotenuse and one side');
        result = {
          type: 'side',
          value: Math.sqrt(Math.pow(Number(c), 2) - Math.pow(Number(a), 2)),
          equation: `b = √(${c}² - ${a}²)`
        };
      }

      setPythagResult(result);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl shadow-xl overflow-hidden border bg-bg-off-white border-secondary-slate/30"
        >
          {/* Mode Selector */}
          <div className="flex">
            <button
              onClick={() => setMode('algebra')}
              className={`flex-1 py-4 text-lg font-bold transition-all ${
                mode === 'algebra' 
                  ? 'bg-gradient-to-r from-primary-teal to-accent-blue text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Algebra Solver
            </button>
            <button
              onClick={() => setMode('pythag')}
              className={`flex-1 py-4 text-lg font-bold transition-all ${
                mode === 'pythag'
                  ? 'bg-gradient-to-r from-primary-teal to-accent-blue text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Pythagorean
            </button>
          </div>

          <div className="p-8 bg-gradient-to-r from-primary-teal to-accent-blue">
            {mode === 'algebra' ? (
              // Algebra UI
              <div className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Equation</label>
                  <input
                    type="text"
                    value={equation}
                    onChange={(e) => setEquation(e.target.value)}
                    placeholder="e.g., 2x + 3 = 10"
                    className="w-full p-4 text-2xl font-mono rounded-lg border border-secondary-slate/20"
                  />
                </div>
                
                <div>
                  <label className="block text-white mb-2">Solve for Variable</label>
                  <input
                    type="text"
                    value={variable}
                    onChange={(e) => setVariable(e.target.value)}
                    placeholder="e.g., x"
                    className="w-full p-4 text-2xl font-mono rounded-lg border border-secondary-slate/20"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm mt-1">{error}</p>
                )}

                {/* Results Area */}
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-6 rounded-xl bg-emerald-500/10 border-2 border-emerald-500"
                  >
                    <div className="text-white space-y-2">
                      <p>Equation: {result.equation}</p>
                      <p>Solution for {result.variable}: {result.solution}</p>
                    </div>
                  </motion.div>
                )}

                {/* Solve Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSolve}
                  className="w-full mt-6 py-5 rounded-xl text-xl font-bold shadow-lg transition-all bg-white text-primary-teal"
                >
                  Solve
                </motion.button>
              </div>
            ) : (
              // Pythagorean UI
              <div className="space-y-6">
                <div className="relative">
                  <img 
                    src="/triangle.svg" 
                    alt="Right Triangle"
                    className="w-64 mx-auto mb-6"
                  />
                  <div className="grid grid-cols-1 gap-4">
                    {['a', 'b', 'c'].map(side => (
                      <div key={side} className="relative">
                        <label className="block text-white mb-2">
                          {side === 'c' ? 'Hypotenuse (c)' : `Side ${side}`}
                        </label>
                        <input
                          type="number"
                          value={pythagValues[side]}
                          onChange={(e) => setPythagValues(prev => ({
                            ...prev,
                            [side]: e.target.value
                          }))}
                          placeholder={side === 'c' ? "Leave empty to solve" : `Enter side ${side}`}
                          className="w-full p-4 text-2xl font-mono rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/50"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {pythagResult && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-6 rounded-xl bg-emerald-500/10 border-2 border-emerald-500"
                  >
                    <div className="text-white space-y-2">
                      <p className="text-lg">{pythagResult.equation}</p>
                      <p className="text-3xl font-mono">
                        {pythagResult.type === 'hypotenuse' ? 'c' : pythagResult.type === 'side' ? 'side' : ''} 
                        = {pythagResult.value.toFixed(4)}
                      </p>
                    </div>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePythag}
                  className="w-full mt-6 py-5 rounded-xl text-xl font-bold shadow-lg transition-all bg-white/10 border-2 border-white/20 text-white hover:bg-white/20"
                >
                  Calculate
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AlgebraCalculator;
