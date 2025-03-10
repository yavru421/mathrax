import { formatFeetInches } from "../utils/conversions";

const ResultDisplay = ({ label, value }) => {
  const getUnit = (label) => {
    if (label.includes("Square")) return "sq ft";
    if (label.includes("Volume")) return "cu ft";
    if (label.includes("Concrete")) return "cu yd";
    return "";
  };

  const formatDecimal = (value, label) => {
    if (label.includes("Concrete")) {
      return value.toFixed(2);
    }
    return value.toFixed(1);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="font-bold text-2xl mb-4">{label}</h3>
      <div className="grid grid-cols-1 gap-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-xl">Decimal:</span>
          <span className="font-mono text-2xl">
            {formatDecimal(value, label)} {getUnit(label)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-xl">Imperial:</span>
          <span className="font-mono text-2xl">{formatFeetInches(value)}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
