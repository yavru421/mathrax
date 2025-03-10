import React from 'react';
import { motion } from 'framer-motion';
import { FiCoffee, FiCode, FiHeart } from 'react-icons/fi';

const AboutPage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl shadow-xl overflow-hidden border bg-bg-off-white border-secondary-slate/30"
      >
        <div className="p-8 bg-gradient-to-r from-primary-teal to-accent-blue">
          <div className="text-white space-y-8">
            {/* App Info */}
            <div className="text-center mb-12">
              <h1 className="text-6xl font-black mb-4">Imperial Measurement Calculator</h1>
              <p className="text-xl text-white/80">Advanced Construction Mathematics</p>
            </div>

            {/* Copyright */}
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4">Copyright & Licensing</h2>
              <p className="mb-4">
                © 2025 John Daniel Dondlinger. All rights reserved.
              </p>
              <p className="text-sm text-white/80">
                This software and its content are protected by copyright law. Unauthorized reproduction, 
                distribution, or modification of this software, in whole or in part, is strictly prohibited.
              </p>
            </div>

            {/* Legal */}
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4">Legal</h2>
              <p className="text-sm text-white/80 mb-4">
                Imperial Measurement Calculator™ and all related software, designs, and content are registered trademarks and intellectual property of 
                Dondlinger General Contracting LLC. All rights reserved.
              </p>
              <p className="text-sm text-white/80">
                This software is protected by United States and international copyright laws. Any unauthorized reproduction, 
                distribution, reverse engineering, or use of this software is strictly prohibited and may result in severe 
                civil and criminal penalties.
              </p>
            </div>

            {/* Created By */}
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4">Created By</h2>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold">Dondlinger General Contracting LLC</h3>
                  <p className="text-white/80">John Daniel Dondlinger</p>
                  <p className="text-white/60 text-sm mt-2">Software Development & Construction Mathematics</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4">Contact</h2>
              <p className="text-white/80">
                For support, business inquiries, or reporting unauthorized use:
              </p>
              <p className="font-mono mt-2">
                dondlingergeneralcontracting@gmail.com
              </p>
            </div>

            {/* Footer */}
            <div className="text-center text-white/60 text-sm pt-8">
              <p className="flex items-center justify-center gap-2">
                Made with <span className="font-mono text-cyan-400">JD's_CPU</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
