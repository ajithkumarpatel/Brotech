
import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { PricingTier } from '../types';
import { motion } from 'framer-motion';

const PricingCard: React.FC<{ tier: PricingTier; index?: number }> = ({ tier, index = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={`relative p-8 rounded-3xl border flex flex-col h-full shadow-lg transition-shadow ${
      tier.recommended 
        ? 'border-blue-600 ring-4 ring-blue-50 dark:ring-blue-900/20 bg-white dark:bg-slate-800' 
        : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800'
    }`}>
      {tier.recommended && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
          Most Popular
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{tier.name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-slate-900 dark:text-white">{tier.price}</span>
          {tier.price !== 'Custom' && <span className="text-slate-500 dark:text-slate-400">/project</span>}
        </div>
      </div>

      <div className="flex-grow">
        <ul className="space-y-4 mb-8">
          {tier.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
              <Check size={18} className="mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0" strokeWidth={3} />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link 
        to="/contact"
        state={{ message: `I'm interested in the ${tier.name} pricing tier.` }}
        className={`block w-full py-3 px-6 rounded-xl font-semibold text-center transition-all duration-200 ${
        tier.recommended 
          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-blue-900/30' 
          : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
      }`}>
        Get Started
      </Link>
    </motion.div>
  );
};

export default PricingCard;
