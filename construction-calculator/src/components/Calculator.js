import { useState } from "react";
import InputField from "./InputField";
import ResultDisplay from "./ResultDisplay";
import { calculateSquareFootage, calculateVolume, calculateConcreteYards } from "../utils/formulas";

const SLAB_THICKNESSES = [
  { label: '4"', value: 4/12 },
  { label: '5"', value: 5/12 },
  { label: '6"', value: 6/12 },
];

const Calculator = ({ mode = 'construction' }) => {
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [error, setError] = useState("");
  const [results, setResults] = useState(null);
  const [thickness, setThickness] = useState(4/12); // Default to 4"

  const handleCalculate = () => {
    if (length <= 0 || width <= 0) {
      setError("Length and width must be greater than 0");
      return;
    }

    setError("");
    const squareFootage = calculateSquareFootage(length, width);
    
    if (mode === 'concrete') {
      setResults({
        squareFootage,
        concreteYards: calculateConcreteYards(length, width, thickness)
      });
    } else {
      setResults({
        squareFootage,
        volume: height > 0 ? calculateVolume(length, width, height) : 0
      });
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'concrete':
        return 'Concrete Calculator';
      default:
        return 'Construction Calculator';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">{getTitle()}</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 font-semibold">Length:</label>
            <InputField onValueChange={setLength} />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Width:</label>
            <InputField onValueChange={setWidth} />
          </div>

          {mode === 'concrete' ? (
            <div>
              <label className="block mb-2 font-semibold">Thickness:</label>
              <select 
                className="w-full px-4 py-3 border rounded text-2xl"
                onChange={(e) => setThickness(parseFloat(e.target.value))}
                value={thickness}
              >
                {SLAB_THICKNESSES.map(({ label, value }) => (
                  <option key={label} value={value}>{label}</option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block mb-2 font-semibold">Height (optional):</label>
              <InputField onValueChange={setHeight} />
            </div>
          )}
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button 
          onClick={handleCalculate}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 font-semibold"
        >
          Calculate
        </button>

        {results && (
          <div className="mt-8 space-y-6">
            <h3 className="text-xl font-bold mb-4">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResultDisplay label="Square Footage" value={results.squareFootage} />
              {mode === 'concrete' ? (
                <ResultDisplay label="Concrete Yards" value={results.concreteYards} />
              ) : (
                <ResultDisplay label="Volume" value={results.volume} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
