import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import convert from 'convert-units';

const UnitConverter = () => {
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('ft');
  const [toUnit, setToUnit] = useState('m');
  const [result, setResult] = useState(null);
  const [category, setCategory] = useState('length');
  const [availableUnits, setAvailableUnits] = useState([]);

  const categories = [
    { id: 'length', label: 'Length' },
    { id: 'area', label: 'Area' },
    { id: 'volume', label: 'Volume' },
    { id: 'mass', label: 'Mass' },
    { id: 'temperature', label: 'Temperature' },
  ];

  useEffect(() => {
    const units = convert().possibilities(category);
    setAvailableUnits(units);
    if (units.length > 0) {
      setFromUnit(units[0]);
      setToUnit(units[1] || units[0]);
    }
  }, [category]);

  const handleConvert = () => {
    try {
      const result = convert(parseFloat(value)).from(fromUnit).to(toUnit);
      setResult({
        value: result,
        formatted: `${result.toFixed(4)} ${toUnit}`
      });
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  const getUnitDescription = (unit) => {
    try {
      const desc = convert().describe(unit);
      return `${desc.abbr} - ${desc.measure}`;
    } catch {
      return unit;
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
            {/* Category Selector */}
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`
                    px-6 py-3 rounded-xl font-semibold transition-all text-base
                    ${category === cat.id
                      ? 'bg-bg-off-white text-primary-teal shadow-md scale-105 border border-secondary-slate/20'
                      : 'bg-white/10 text-white hover:bg-primary-teal/20'
                    }
                  `}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Converter Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-white mb-2">Value</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full p-4 text-2xl font-mono rounded-lg border border-secondary-slate/20"
                />
              </div>

              <div>
                <label className="block text-white mb-2">From</label>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full p-4 text-xl font-mono rounded-lg border border-secondary-slate/20"
                >
                  {availableUnits.map(unit => (
                    <option key={unit} value={unit}>
                      {getUnitDescription(unit)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white mb-2">To</label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full p-4 text-xl font-mono rounded-lg border border-secondary-slate/20"
                >
                  {availableUnits.map(unit => (
                    <option key={unit} value={unit}>
                      {getUnitDescription(unit)}
                    </option>
                  ))}
                </select>
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

            {/* Convert Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConvert}
              className="w-full mt-6 py-5 rounded-xl text-xl font-bold shadow-lg transition-all bg-white text-primary-teal"
            >
              Convert
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UnitConverter;
