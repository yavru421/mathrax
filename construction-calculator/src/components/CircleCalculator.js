import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CircleCalculator = () => {
  const [radius, setRadius] = useState('');
  const [diameter, setDiameter] = useState('');
  const [results, setResults] = useState(null);

  const calculate = () => {
    try {
      let r = radius ? parseFloat(radius) : (diameter ? parseFloat(diameter) / 2 : null);
      
      if (!r) {
        throw new Error('Please enter either radius or diameter');
      }

      const results = {
        radius: r,
        diameter: r * 2,
        circumference: 2 * Math.PI * r,
        area: Math.PI * r * r
      };

      setResults(results);
    } catch (err) {
      setResults({ error: err.message });
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
          <div className="p-8 bg-gradient-to-r from-primary-teal to-accent-blue">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-6">
                <div>
                  <label className="block text-white mb-2">Radius</label>
                  <input
                    type="number"
                    value={radius}
                    onChange={(e) => {
                      setRadius(e.target.value);
                      setDiameter(e.target.value ? (parseFloat(e.target.value) * 2).toString() : '');
                    }}
                    placeholder="Enter radius"
                    className="w-full p-4 text-2xl font-mono rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/50"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Diameter</label>
                  <input
                    type="number"
                    value={diameter}
                    onChange={(e) => {
                      setDiameter(e.target.value);
                      setRadius(e.target.value ? (parseFloat(e.target.value) / 2).toString() : '');
                    }}
                    placeholder="Enter diameter"
                    className="w-full p-4 text-2xl font-mono rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/50"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={calculate}
                  className="w-full py-4 rounded-xl text-xl font-bold bg-white text-primary-teal shadow-lg"
                >
                  Calculate
                </motion.button>
              </div>

              {/* Results Section */}
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-white text-xl font-bold mb-4">Results</h3>
                {results ? (
                  results.error ? (
                    <p className="text-red-300">{results.error}</p>
                  ) : (
                    <div className="space-y-4 text-white">
                      <div>
                        <div className="text-white/70 text-sm">Radius</div>
                        <div className="text-2xl font-mono">{results.radius.toFixed(4)} units</div>
                      </div>
                      <div>
                        <div className="text-white/70 text-sm">Diameter</div>
                        <div className="text-2xl font-mono">{results.diameter.toFixed(4)} units</div>
                      </div>
                      <div>
                        <div className="text-white/70 text-sm">Circumference</div>
                        <div className="text-2xl font-mono">{results.circumference.toFixed(4)} units</div>
                      </div>
                      <div>
                        <div className="text-white/70 text-sm">Area</div>
                        <div className="text-2xl font-mono">{results.area.toFixed(4)} sq units</div>
                      </div>
                      <div className="text-xs text-white/50 mt-4">
                        π ≈ {Math.PI.toFixed(6)}
                      </div>
                    </div>
                  )
                ) : (
                  <p className="text-white/50">Enter radius or diameter to calculate</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CircleCalculator;
