export const PREMIUM_FEATURES = {
  FREE: {
    name: 'Free',
    features: [
      'Basic Construction Calculator',
      'Simple Length Conversions',
      '3 Memory Slots'
    ]
  },
  PRO: {
    name: 'Pro Edition',
    price: 5.99,
    type: 'one-time',
    features: [
      'Advanced Construction Calculator',
      'Pythagorean Calculator',
      'Complex Algebra Solver',
      'All Unit Conversions',
      'Unlimited Memory Slots',
      'Export to PDF/CSV',
      'Offline Mode'
    ]
  },
  CONTRACTOR: {
    name: 'Team Edition',
    price: 5.99,
    type: 'one-time-per-user',
    features: [
      'Everything in Pro Edition',
      'Team Sharing (per user)',
      'Custom Shortcuts',
      'Priority Email Support',
      'Cloud Backup',
      'Advanced Equations Library',
      'Bulk Calculations'
    ]
  }
};
