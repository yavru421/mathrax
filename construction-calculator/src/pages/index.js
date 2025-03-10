import Head from 'next/head';
import { useState } from 'react';
import { MemoryProvider } from '../contexts/MemoryContext';
import MainCalculator from '../components/MainCalculator';
import AlgebraCalculator from '../components/AlgebraCalculator';
import UnitConverter from '../components/UnitConverter';
import CircleCalculator from '../components/CircleCalculator';
import { usePremiumStatus } from '../hooks/usePremiumStatus';
import { Box, Tabs, Tab, Container } from '@mui/material';
import AnimatedBackground from '../components/AnimatedBackground';
import AboutPage from '../components/AboutPage';

export default function Home() {
  const [activeTab, setActiveTab] = useState('inft');
  const { premiumStatus, activatePremium } = usePremiumStatus();
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
        <title>MATHRAX - Advanced Construction Mathematics</title>
        <meta name="description" content="MATHRAX - Advanced construction and mathematics calculator by John Daniel Dondlinger" />
        <meta name="author" content="John Daniel Dondlinger" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1E40AF" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
      </Head>
      <AnimatedBackground />
      <Box sx={{ 
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Navigation Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white' }}>
          <Container maxWidth="lg">
            <Tabs 
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                '& .MuiTab-root': {
                  fontSize: '1rem',
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 2,
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
        {/* Main Content */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {activeTab === 'inft' && <MainCalculator />}
          {activeTab === 'algebra' && <AlgebraCalculator />}
          {activeTab === 'circle' && <CircleCalculator />}
          {activeTab === 'units' && <UnitConverter />}
          {activeTab === 'about' && <AboutPage />}
          {showPremiumOverlay && (
            <PremiumOverlay 
              feature={premiumFeature}
              onUpgrade={async (tier) => {
                try {
                  await activatePremium(tier);
                  setShowPremiumOverlay(false);
                  handleTabChange(activeTab);
                } catch (err) {
                  console.error('Purchase failed:', err);
                }
              }}
              onClose={() => setShowPremiumOverlay(false)}
            />
          )}
        </Container>
      </Box>
    </MemoryProvider>
  );
}