import React from 'react';
import { motion } from 'framer-motion';
import { PREMIUM_FEATURES } from '../config/premium';
import { FiCheck, FiLock } from 'react-icons/fi';

const PremiumOverlay = ({ feature, onUpgrade }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-gradient-to-br from-accent-blue/95 to-primary-teal/95 flex items-center justify-center p-4 z-50"
    >
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-primary-teal to-accent-blue text-white text-center">
          <FiLock className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Unlock Premium Features</h2>
          <p className="text-white/80">One-time purchase, lifetime access</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Pro Edition */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-primary-teal mb-2">Pro Edition</h3>
            <div className="text-3xl font-bold mb-6">${PREMIUM_FEATURES.PRO.price}</div>
            <div className="space-y-3 mb-6">
              {PREMIUM_FEATURES.PRO.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-700">
                  <FiCheck className="text-green-500 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onUpgrade('PRO')}
              className="w-full py-3 bg-primary-teal text-white rounded-lg font-bold"
            >
              Buy Pro - ${PREMIUM_FEATURES.PRO.price}
            </motion.button>
          </div>

          {/* Contractor Edition */}
          <div className="bg-gray-50 rounded-xl p-6 border-2 border-primary-teal">
            <div className="inline-block px-3 py-1 bg-primary-teal text-white text-sm rounded-full mb-2">
              BEST VALUE
            </div>
            <h3 className="text-2xl font-bold text-primary-teal mb-2">Contractor Edition</h3>
            <div className="text-3xl font-bold mb-6">${PREMIUM_FEATURES.CONTRACTOR.price}</div>
            <div className="space-y-3 mb-6">
              {PREMIUM_FEATURES.CONTRACTOR.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-700">
                  <FiCheck className="text-green-500 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onUpgrade('CONTRACTOR')}
              className="w-full py-3 bg-gradient-to-r from-primary-teal to-accent-blue text-white rounded-lg font-bold"
            >
              Buy Contractor - ${PREMIUM_FEATURES.CONTRACTOR.price}
            </motion.button>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t text-center">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <span>✓ Lifetime Access</span>
            <span>✓ No Subscription</span>
            <span>✓ Free Updates</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumOverlay;
