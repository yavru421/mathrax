import Head from 'next/head';
import { useState } from 'react';
import { MemoryProvider } from '../contexts/MemoryContext';
import MainCalculator from '../components/MainCalculator';
import AlgebraCalculator from '../components/AlgebraCalculator';
import CircleCalculator from '../components/CircleCalculator';
import UnitConverter from '../components/UnitConverter';
import { usePremiumStatus } from '../hooks/usePremiumStatus';
import AboutPage from '../components/AboutPage';
import AnimatedBackground from '../components/AnimatedBackground';
import { Box, Tabs, Tab, Container } from '@mui/material';

export default function Home() {
  const [activeTab, setActiveTab] = useState('inft');
  const { premiumStatus } = usePremiumStatus();
  const [showPremiumOverlay, setShowPremiumOverlay] = useState(false);
  const [premiumFeature, setPremiumFeature] = useState('');

  const tabs = [
    { id: 'inft', label: 'In/Ft', premium: false },
    { id: 'algebra', label: 'Algebra', premium: false },
    { id: 'circle', label: 'Circle', premium: false },
    { id: 'units', label: 'Units', premium: false },
    { id: 'about', label: 'About', premium: false }
  ];

  const handleTabChange = (event, newValue) => {
    const tab = tabs.find(t => t.id === newValue);
    if (tab.premium && !premiumStatus.isPro) {
      setPremiumFeature(tab.label);
      setShowPremiumOverlay(true);
      return;
    }
    setActiveTab(newValue);
  };

  return (
    <MemoryProvider>
      <Head>
        <title>Imperial Measurement Calculator - Advanced Construction Mathematics</title>
        <meta name="description" content="Imperial Measurement Calculator - Advanced construction and mathematics calculator" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1E40AF" />
      </Head>
      <AnimatedBackground />
      <Box sx={{ 
        height: '100vh',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        maxHeight: '100vh',
        minHeight: '100vh',
      }}>
        {/* Navigation Tabs - made more compact */}
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider', 
          bgcolor: 'white',
          py: 0.5 // Reduced padding
        }}>
          <Container maxWidth="lg">
            <Tabs 
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                minHeight: '40px', // More compact tabs
                '& .MuiTab-root': {
                  fontSize: '0.85rem',
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 0.75,
                  minHeight: '40px', // More compact tabs
                  minWidth: 'auto'
                }
              }}
            >
              <Tab label="Feet & Inches" value="inft" />
              <Tab label="Algebra" value="algebra" />
              <Tab label="Circle" value="circle" />
              <Tab label="Unit Converter" value="units" />
              <Tab label="About" value="about" />
            </Tabs>
          </Container>
        </Box>
        {/* Main Content - with flex-grow to take available space */}
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Container maxWidth="lg" sx={{ height: '100%', py: 1 }}> {/* Reduced padding */}
            {activeTab === 'inft' && <MainCalculator />}
            {activeTab === 'algebra' && <AlgebraCalculator />}
            {activeTab === 'circle' && <CircleCalculator />}
            {activeTab === 'units' && <UnitConverter />}
            {activeTab === 'about' && <AboutPage />}
            {showPremiumOverlay && (
              <PremiumOverlay 
                feature={premiumFeature}
                onUpgrade={(tier) => {
                  activatePremium(tier);
                  setShowPremiumOverlay(false);
                }}
                onClose={() => setShowPremiumOverlay(false)}
              />
            )}
          </Container>
        </Box>
      </Box>
    </MemoryProvider>
  );
}