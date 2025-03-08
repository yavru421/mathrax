import { useState } from "react";
import { parseFeetInches } from "../utils/conversions";
import { evaluateExpression } from "../utils/mathParser";

const InputField = ({ onValueChange }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setError("");

    try {
      // Handle direct feet-inches input
      if (value.includes("'") || value.includes('"')) {
        const result = parseFeetInches(value);
        if (!isNaN(result)) {
          onValueChange(result);
          return;
        }
      }

      // Handle mathematical expressions
      if (value.includes('(') || value.includes('+') || value.includes('*') || value.includes('%')) {
        const result = evaluateExpression(value);
        if (!isNaN(result)) {
          onValueChange(result);
          return;
        }
      }

      // Handle simple numbers
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        onValueChange(numValue);
      }
    } catch (err) {
      setError("Invalid expression");
    }
  };

  return (
    <div className="flex items-start space-x-4">
      <div className="flex-1">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter measurement"
          className="w-full px-4 py-3 border rounded text-2xl"
        />
        {error && <p className="text-red-500 text-xl mt-1">{error}</p>}
      </div>
      <div className="w-64 text-lg text-gray-600 bg-gray-50 p-3 rounded">
        <p className="font-medium mb-2">Valid formats:</p>
        <ul className="space-y-2">
          <li>• Simple: 15' or 72"</li>
          <li>• Mixed: 5' 6"</li>
          <li>• Fractions: 5' 6 & 1/2"</li>
          <li>• Math: (15' + 20')</li>
          <li>• Complex: (5'6" * 25%)</li>
        </ul>
      </div>
    </div>
  );
};

export default InputField;
