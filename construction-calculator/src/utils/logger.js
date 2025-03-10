const MAX_LOG_ENTRIES = 1000;
const LOG_KEY = 'calculator_history';

export const logCalculation = async (entry) => {
  try {
    // Add timestamp to entry
    const logEntry = {
      ...entry,
      timestamp: new Date().toISOString()
    };

    // Get existing logs
    const existingLogs = JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
    
    // Add new entry and limit size
    const updatedLogs = [logEntry, ...existingLogs].slice(0, MAX_LOG_ENTRIES);
    
    // Save back to localStorage
    localStorage.setItem(LOG_KEY, JSON.stringify(updatedLogs));
    
    return true;
  } catch (error) {
    console.warn('Failed to log calculation:', error);
    return false;
  }
};

export const getCalculationHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
  } catch (error) {
    console.warn('Failed to retrieve calculation history:', error);
    return [];
  }
};

export const clearCalculationHistory = () => {
  try {
    localStorage.removeItem(LOG_KEY);
    return true;
  } catch (error) {
    console.warn('Failed to clear calculation history:', error);
    return false;
  }
};
