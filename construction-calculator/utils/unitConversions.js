export const units = {
    feet: {
        label: 'Feet (ft)',
        symbol: 'ft',
        toBase: 1, // Base unit is feet
    },
    inches: {
        label: 'Inches (in)',
        symbol: 'in',
        toBase: 1/12,
    },
    yards: {
        label: 'Yards (yd)',
        symbol: 'yd',
        toBase: 3,
    },
    meters: {
        label: 'Meters (m)',
        symbol: 'm',
        toBase: 3.28084, // 1 meter = 3.28084 feet
    },
    centimeters: {
        label: 'Centimeters (cm)',
        symbol: 'cm',
        toBase: 3.28084 / 100,
    },
    millimeters: {
        label: 'Millimeters (mm)',
        symbol: 'mm',
        toBase: 3.28084 / 1000,
    },
    sqft: {
        label: 'Square Feet (sq ft)',
        symbol: 'sq ft',
        toBase: 1, // Base unit is sq ft
    },
    sqyd: {
        label: 'Square Yards (sq yd)',
        symbol: 'sq yd',
        toBase: 9, // 1 sq yd = 9 sq ft
    },
    sqm: {
        label: 'Square Meters (sq m)',
        symbol: 'sq m',
        toBase: 10.7639, // 1 sq meter = 10.7639 sq ft
    },
    acres: {
        label: 'Acres',
        symbol: 'acres',
        toBase: 43560, // 1 acre = 43560 sq ft
    },
    hectares: {
        label: 'Hectares',
        symbol: 'hectares',
        toBase: 107639, // 1 hectare = 107639 sq ft
    },
    cuft: {
        label: 'Cubic Feet (cu ft)',
        symbol: 'cu ft',
        toBase: 1, // Base unit is cu ft
    },
    cuyd: {
        label: 'Cubic Yards (cu yd)',
        symbol: 'cu yd',
        toBase: 27, // 1 cu yd = 27 cu ft
    },
    cum: {
        label: 'Cubic Meters (cu m)',
        symbol: 'cu m',
        toBase: 35.3147, // 1 cu meter = 35.3147 cu ft
    },
    liters: {
        label: 'Liters (L)',
        symbol: 'L',
        toBase: 0.0353147, // 1 liter = 0.0353147 cu ft
    },
    gallons: {
        label: 'Gallons (gal)',
        symbol: 'gal',
        toBase: 0.133681, // 1 gallon = 0.133681 cu ft (US liquid gallon)
    },
};
