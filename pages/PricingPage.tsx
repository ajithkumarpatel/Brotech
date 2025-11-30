import React from 'react';
import { usePricing } from '../services/hooks';
import PricingCard from '../components/PricingCard';
import { motion } from 'framer-motion';

const PricingPage: React.FC = () => {
  const { data: pricing, loading } = usePricing();

  if (loading) return <div className="h-96 flex items-center justify-center text-blue-600 dark:text-blue-400">Loading Pricing...</div>;

  // Sort: Put recommended in middle if 3 items, or handled via grid order if strictly visual.
  // For simplicity, we just map them.
  const sortedPricing = [...pricing].sort((a, b) => (a.price > b.price ? 1 : -1));

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="bg-white dark:bg-slate-900 pb-20 pt-24 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Choose the plan that fits your business needs. No hidden fees.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {sortedPricing.map((tier, idx) => (
            <PricingCard key={tier.id} tier={tier} index={idx} />
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <p className="text-slate-600 dark:text-slate-400">
            Need a custom enterprise solution? <a href="mailto:sales@brotech.com" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Contact our sales team</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;