import React, { useState } from 'react';
import { useFAQs } from '../services/hooks';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQPage: React.FC = () => {
  const { data: faqs, loading } = useFAQs();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-slate-50 dark:bg-slate-950 py-20 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Everything you need to know about our services and process.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {loading ? (
          <div className="text-center dark:text-slate-400">Loading FAQs...</div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={faq.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex justify-between items-center p-6 bg-white dark:bg-slate-800 text-left hover:bg-gray-50 dark:hover:bg-slate-750 transition-colors"
                >
                  <span className="font-semibold text-slate-900 dark:text-white text-lg">{faq.question}</span>
                  {openId === faq.id ? <Minus className="text-blue-600 dark:text-blue-400" /> : <Plus className="text-gray-400" />}
                </button>
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-gray-50 dark:bg-slate-900 px-6 overflow-hidden"
                    >
                      <p className="py-6 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-gray-100 dark:border-slate-800">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQPage;