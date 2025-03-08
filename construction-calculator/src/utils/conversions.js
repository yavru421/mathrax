const Fraction = require('fraction.js');

/**
 * Parse a feet/inches string into a decimal feet value
 * @param {string} str - String in format like "5' 6"" or "5ft 6in"
 * @returns {number} - Value in decimal feet
 */
export function parseFeetInches(str) {
  // Handle basic cases with only inches
  const inchesOnlyPattern = /^(\d+(?:\.\d+)?)\s*(?:in|")\s*$/;
  const inchesOnlyMatch = str.match(inchesOnlyPattern);
  if (inchesOnlyMatch) {
    return parseFloat(inchesOnlyMatch[1]) / 12;
  }

  // Handle basic cases with only feet
  const feetOnlyPattern = /^(\d+(?:\.\d+)?)\s*(?:ft|')\s*$/;
  const feetOnlyMatch = str.match(feetOnlyPattern);
  if (feetOnlyMatch) {
    return parseFloat(feetOnlyMatch[1]);
  }

  // Handle feet and inches format (e.g., 5' 6")
  const feetInchesPattern = /^(\d+(?:\.\d+)?)\s*(?:ft|')\s*(\d+(?:\.\d+)?)\s*(?:in|")\s*$/;
  const feetInchesMatch = str.match(feetInchesPattern);
  if (feetInchesMatch) {
    return parseFloat(feetInchesMatch[1]) + parseFloat(feetInchesMatch[2]) / 12;
  }

  // Handle additions like "12" + 1'"
  const additionPattern = /(\d+(?:\.\d+)?)\s*(?:in|")\s*\+\s*(\d+(?:\.\d+)?)\s*(?:ft|')/;
  const additionMatch = str.match(additionPattern);
  if (additionMatch) {
    return parseFloat(additionMatch[1]) / 12 + parseFloat(additionMatch[2]);
  }

  // Handle additions like "1' + 12""
  const reversedAdditionPattern = /(\d+(?:\.\d+)?)\s*(?:ft|')\s*\+\s*(\d+(?:\.\d+)?)\s*(?:in|")/;
  const reversedAdditionMatch = str.match(reversedAdditionPattern);
  if (reversedAdditionMatch) {
    return parseFloat(reversedAdditionMatch[1]) + parseFloat(reversedAdditionMatch[2]) / 12;
  }

  throw new Error("Unable to parse feet/inches format");
}

/**
 * Format a decimal feet value to feet and inches notation
 * @param {number} value - Decimal feet value
 * @returns {string} - Formatted string like "5' 6""
 */
export function formatFeetInches(value) {
  // Handle null, undefined, or NaN values
  if (value === null || value === undefined || isNaN(value)) return "Invalid";
  
  try {
    // Handle negative values
    const isNegative = value < 0;
    const absValue = Math.abs(value);
    
    const feet = Math.floor(absValue);
    const inchesExact = (absValue - feet) * 12;
    const inches = Math.round(inchesExact);
    
    // Handle case where inches rounds up to 12
    if (inches === 12) {
      return `${isNegative ? '-' : ''}${feet + 1}' 0"`;
    }
    
    return `${isNegative ? '-' : ''}${feet}' ${inches}"`;
  } catch (err) {
    console.error('Error formatting feet-inches:', err);
    return "Format error";
  }
}

/**
 * Convert a numeric value to the specified unit type
 * @param {number} value - The value to convert
 * @param {string} fromType - The source unit type
 * @param {string} toType - The target unit type
 * @returns {number} - Converted value
 */
export function convertUnits(value, fromType, toType) {
  if (fromType === toType) return value;

  const conversionFactors = {
    feet: {
      inches: 12,
      yards: 1/3,
      meters: 0.3048
    },
    inches: {
      feet: 1/12,
      yards: 1/36,
      meters: 0.0254
    },
    yards: {
      feet: 3,
      inches: 36,
      meters: 0.9144
    },
    meters: {
      feet: 3.28084,
      inches: 39.37,
      yards: 1.09361
    }
  };

  if (conversionFactors[fromType] && conversionFactors[fromType][toType]) {
    return value * conversionFactors[fromType][toType];
  }

  throw new Error(`Unsupported conversion from ${fromType} to ${toType}`);
}
