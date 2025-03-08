// Constants for concrete calculations
const CUBIC_YARDS_CONVERSION = 27; // 1 cubic yard = 27 cubic feet
const WASTE_FACTOR = 1.1; // 10% waste factor

export const calculateSquareFootage = (length, width) => {
  return length * width;
};

export const calculateVolume = (length, width, height) => {
  return length * width * height;
};

export const calculateRoofPitch = (rise, run) => {
  return Math.atan(rise / run) * (180 / Math.PI);
};

export const calculateConcreteYards = (length, width, depth) => {
  // Convert depth to feet if in inches
  const depthInFeet = depth > 1 ? depth / 12 : depth;
  
  // Calculate cubic feet
  const cubicFeet = length * width * depthInFeet;
  
  // Convert to cubic yards with waste factor
  return (cubicFeet / CUBIC_YARDS_CONVERSION) * WASTE_FACTOR;
};

// Common concrete slab thicknesses in inches
export const SLAB_THICKNESSES = [
  { label: '4"', value: 4/12 },
  { label: '6"', value: 6/12 },
  { label: '8"', value: 8/12 },
  { label: '12"', value: 12/12 }
];

export const calculateDrywallSheets = (area) => {
  return Math.ceil(area / 32); // Each sheet covers 32 sq ft
};

// NEEDS AI OPTIMIZATION:
// - Advanced construction calculations
// - Material estimation algorithms
// - Waste factor calculations
// - Complex geometry handling
// Looking to add more sophisticated construction math
