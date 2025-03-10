import { useState, useEffect } from 'react';

export const usePremiumStatus = () => {
  const [premiumStatus, setPremiumStatus] = useState({
    isPro: false,
    isContractor: false,
    usageCount: 0,
    purchaseDate: null
  });

  useEffect(() => {
    // Load premium status from localStorage
    const savedStatus = localStorage.getItem('mathrax_premium');
    if (savedStatus) {
      setPremiumStatus(JSON.parse(savedStatus));
    }
  }, []);

  const activatePremium = (tier) => {
    const newStatus = {
      isPro: tier === 'PRO' || tier === 'CONTRACTOR',
      isContractor: tier === 'CONTRACTOR',
      usageCount: 0,
      purchaseDate: new Date().toISOString()
    };
    setPremiumStatus(newStatus);
    localStorage.setItem('mathrax_premium', JSON.stringify(newStatus));
  };

  const incrementUsage = () => {
    if (premiumStatus.isPro) return true; // Unlimited usage for premium
    
    const newCount = premiumStatus.usageCount + 1;
    if (newCount > 20) return false; // Free tier limit
    
    setPremiumStatus(prev => ({
      ...prev,
      usageCount: newCount
    }));
    return true;
  };

  return { premiumStatus, activatePremium, incrementUsage };
};
