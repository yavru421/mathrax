import React, { useEffect, useState } from 'react';

const SYMBOLS = ['∑', '∫', '√', 'π', '±', '∞', '∂', 'Δ', '÷', '×'];

const AnimatedBackground = () => {
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    const createSymbol = () => {
      const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      const left = Math.random() * window.innerWidth;
      const delay = Math.random() * 2;
      const size = 20 + Math.random() * 40; // Reduced max size
      const duration = 10 + Math.random() * 20;
      
      return {
        id: Math.random(),
        symbol,
        style: {
          left: `${left}px`,
          bottom: `${Math.random() * 10 + 5}px`, // Position from bottom
          animationDelay: `${delay}s`,
          fontSize: `${size}px`,
          animationDuration: `${duration}s`,
          position: 'absolute' // Each symbol is absolutely positioned
        }
      };
    };

    // Create initial symbols
    const initialSymbols = Array(12).fill(null).map(createSymbol);
    setSymbols(initialSymbols);

    // Add new symbols periodically
    const interval = setInterval(() => {
      setSymbols(prev => [...prev.slice(-11), createSymbol()]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background branding */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(-5deg)',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.05,
        textTransform: 'uppercase',
        fontFamily: 'monospace'
      }}>
        <div style={{
          fontSize: '80px', // Smaller font for longer name
          fontWeight: 'bold',
          letterSpacing: '-2px',
          textAlign: 'center'
        }}>
          Imperial Measurement
        </div>
        <div style={{
          fontSize: '60px',
          marginTop: '10px',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          Calculator
        </div>
      </div>
      
      {/* Math symbols container - positioned at bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden"
        style={{ pointerEvents: 'none' }}
      >
        {symbols.map(({ id, symbol, style }) => (
          <div 
            key={id} 
            className="text-opacity-30 text-white"
            style={{
              ...style,
              animation: 'none', // Remove floating animation
              opacity: 0.2
            }}
          >
            {symbol}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
