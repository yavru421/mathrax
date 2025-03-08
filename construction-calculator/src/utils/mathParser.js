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
    math.createUnit('ft', '0.3048 m');
    math.createUnit('in', '0.0254 m');
    debug('Units created');
  } catch (e) {
    debug('Units exist:', e.message);
  }
}

setupUnits();

function preprocessExpression(expr) {
  debug('Raw input:', expr);
  
  // Basic cleanup
  let processed = expr.trim();
  
  // Convert all units to ft for calculation
  processed = processed.replace(/(\d+)\s*ft\s+(\d+)\s*in/g, '($1 + $2/12)ft');
  processed = processed.replace(/(\d+)\s*in/g, '($1/12)ft');
  
  debug('Processed:', processed);
  return processed;
}

export function evaluateExpression(expr, type = 'feet', memories = {}) {
  try {
    const processed = preprocessExpression(expr);
    debug('Evaluating:', processed);
    
    const result = math.evaluate(processed, { memory: memories });
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

export function formatResult(value) {
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
      return `${sign}${feet + 1}ft 0in (${value.toFixed(2)} ft)`;
    }
    
    return `${sign}${feet}ft ${inches}in (${value.toFixed(2)} ft)`;
  } catch (err) {
    debug('Format error:', err);
    return 'Format error';
  }
}