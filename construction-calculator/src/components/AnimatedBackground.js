import React, { useEffect, useState } from 'react';

const SYMBOLS = ['∑', '∫', '√', 'π', '±', '∞', '∂', 'Δ', '÷', '×'];

const AnimatedBackground = () => {
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    const createSymbol = () => {
      const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      const left = Math.random() * window.innerWidth;
      const delay = Math.random() * 2;
      const size = 20 + Math.random() * 60;
      const duration = 10 + Math.random() * 20;
      
      return {
        id: Math.random(),
        symbol,
        style: {
          left: `${left}px`,
          animationDelay: `${delay}s`,
          fontSize: `${size}px`,
          animationDuration: `${duration}s`
        }
      };
    };

    // Create initial symbols
    const initialSymbols = Array(20).fill(null).map(createSymbol);
    setSymbols(initialSymbols);

    // Add new symbols periodically
    const interval = setInterval(() => {
      setSymbols(prev => [...prev.slice(-19), createSymbol()]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {symbols.map(({ id, symbol, style }) => (
          <div key={id} className="math-symbol" style={style}>
            {symbol}
          </div>
        ))}
      </div>
      <div className="brand-text" style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(-20deg)', // Less rotation
        textTransform: 'uppercase',
        fontFamily: 'monospace'
      }}>
        MATHRAX
        <div style={{
          fontSize: '32px', // Bigger byline
          opacity: '0.9', // More visible
          marginTop: '20px',
          letterSpacing: '2px',
          fontWeight: 'bold',
          textShadow: '0 0 20px rgba(255, 255, 255, 0.3)' // Glow effect
        }}>
          by John Daniel Dondlinger 2025
        </div>
      </div>
    </>
  );
};

export default AnimatedBackground;
