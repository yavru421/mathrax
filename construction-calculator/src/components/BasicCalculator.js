import { useState } from 'react';
import { evaluateExpression } from '../utils/mathParser';
import { logCalculation } from '../utils/logger';

const BasicCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const examples = [
    { label: 'Basic Addition', expr: "(15' + 20')" },
    { label: 'Mixed Units', expr: "(10' + 36\")" },
    { label: 'With Fractions', expr: "5' 6 & 1/2\" + 3' 2\"" },
    { label: 'Percentages', expr: "(10' * 25%)" },
    { label: 'Complex', expr: "(5'6\" + 3'2\") * 1.5" }
  ];

  const handleCalculate = async () => {
    try {
      const value = evaluateExpression(input);
      const logEntry = {
        type: 'calculation',
        input: input,
        result: value,
        success: !isNaN(value),
        error: isNaN(value) ? 'Invalid expression' : null
      };

      logCalculation(logEntry).catch(console.warn);

      if (isNaN(value)) {
        setError('Invalid expression');
        setResult(null);
      } else {
        setResult(value);
        setError('');
      }
    } catch (err) {
      const logEntry = {
        type: 'calculation',
        input: input,
        error: err.message,
        success: false
      };
      
      logCalculation(logEntry).catch(console.warn);
      setError('Invalid calculation');
      setResult(null);
    }
  };

  const handleExampleClick = async (expr) => {
    setInput(expr);
    try {
      const value = evaluateExpression(expr);
      const logEntry = {
        type: 'example_calculation',
        input: expr,
        result: value,
        success: !isNaN(value),
        error: isNaN(value) ? 'Invalid expression' : null
      };

      await logCalculation(logEntry);

      if (isNaN(value)) {
        setError('Invalid expression');
        setResult(null);
      } else {
        setResult(value);
        setError('');
      }
    } catch (err) {
      const logEntry = {
        type: 'example_calculation',
        input: expr,
        error: err.message,
        success: false
      };
      
      await logCalculation(logEntry);
      setError('Invalid calculation');
      setResult(null);
    }
  };

  return (
    <div className="flex space-x-6">
      <div className="flex-1 space-y-4">
        <div className="flex flex-col space-y-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 border rounded-lg font-mono text-3xl h-40"
            placeholder="Enter your calculation here..."
          />
        </div>
        
        <button
          onClick={handleCalculate}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 font-semibold"
        >
          Calculate
        </button>

        {error && <p className="text-red-500">{error}</p>}
        
        {result !== null && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-2xl mb-2">Result:</h3>
            <div className="font-mono text-4xl">{result.toFixed(4)}</div>
          </div>
        )}
      </div>

      <div className="w-80 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-bold text-2xl mb-3">Example Calculations</h3>
        <div className="space-y-4 text-lg">
          {examples.map((ex, index) => (
            <div key={index}>
              <p className="font-medium">{ex.label}:</p>
              <button
                onClick={() => handleExampleClick(ex.expr)}
                className="block w-full bg-white p-2 rounded mt-1 text-left font-mono hover:bg-blue-50 transition-colors"
              >
                {ex.expr}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicCalculator;
