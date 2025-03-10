import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MemoryProvider } from '../contexts/MemoryContext';
import '../styles/acid-background.css'; // Add the import here

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D9488', // primary-teal
    },
    secondary: {
      main: '#1E40AF', // accent-blue
    },
    background: {
      default: '#F9FAFB',
    },
  },
  typography: {
    fontFamily: '"Inter", "system-ui", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MemoryProvider>
        <Component {...pageProps} />
      </MemoryProvider>
    </ThemeProvider>
  );
}

export default MyApp;
