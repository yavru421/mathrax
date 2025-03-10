import { create, all } from 'mathjs';

const math = create(all, {
  number: 'number',
  precision: 64
});

// Create debug logger
const debug = (msg, ...args) => console.log(`[MathParser] ${msg}`, ...args);

// Setup units
function setupUnits() {
  try {
    // Only create units if they don't exist
    math.unit('1 ft');
    debug('Units already exist');
  } catch (e) {
    // Units don't exist, create them
    math.createUnit('ft', '0.3048 m');
    math.createUnit('in', '0.0254 m');
    debug('Units created');
  }
}

setupUnits();

// Regular expressions for MATHRAX specific syntax
const feetInchesRegex = /(\d+)\s*(?:ft|')\s*(\d+)\s*(?:in|")/g;
const feetOnlyRegex = /(\d+)\s*(?:ft|')/g;
const inchesOnlyRegex = /(\d+)\s*(?:in|")/g;

function preprocessExpression(expr) {
  debug('Raw input:', expr);
  
  // Basic cleanup
  let processed = expr.trim();
  
  // Convert MATHRAX specific notation to standardized form
  processed = processed.replace(feetInchesRegex, '($1 + $2/12)ft');
  processed = processed.replace(feetOnlyRegex, '$1ft');
  processed = processed.replace(inchesOnlyRegex, '($1/12)ft');
  
  debug('Processed:', processed);
  return processed;
}

export function evaluateExpression(expr, type = 'feet', memories = {}) {
  try {
    const processed = preprocessExpression(expr);
    debug('Evaluating:', processed);
    
    const result = math.evaluate(processed, { ...memories });
    debug('Raw result:', result);
    
    // Convert to number if it's a unit
    if (result?.constructor?.name === 'Unit') {
      return math.unit(result).toNumber('ft');
    }
    
    return Number(result);
  } catch (err) {
    debug('Error:', err.message);
    throw new Error(err.message);
  }
}

export function formatResult(value, type = 'feet') {
  if (value === null || value === undefined || isNaN(value)) {
    return 'Invalid input';
  }

  try {
    const absValue = Math.abs(value);
    const feet = Math.floor(absValue);
    const inches = Math.round((absValue - feet) * 12);
    const sign = value < 0 ? '-' : '';

    // Handle inch rollover
    if (inches === 12) {
      return `${sign}${feet + 1}' 0" (${value.toFixed(2)} ft)`;
    }
    
    return `${sign}${feet}' ${inches}" (${value.toFixed(2)} ft)`;
  } catch (err) {
    debug('Format error:', err);
    return 'Format error';
  }
}