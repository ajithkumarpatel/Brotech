
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExitIntentModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Check if mouse actually left the window upwards (user going to close tab/address bar)
      if (e.clientY <= 0) {
        const lastShown = localStorage.getItem('exit_intent_last_shown');
        const now = Date.now();
        const twentyMinutes = 20 * 60 * 1000;

        // Show if never shown OR if 20 minutes have passed since last shown
        if (!lastShown || now - parseInt(lastShown, 10) > twentyMinutes) {
          setIsVisible(true);
          localStorage.setItem('exit_intent_last_shown', now.toString());
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsVisible(false)}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
        >
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col md:flex-row">
            <div className="bg-blue-600 p-8 flex items-center justify-center text-white md:w-1/3">
               <Gift size={64} className="animate-bounce" />
            </div>
            <div className="p-8 md:w-2/3">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Wait! Don't leave yet</span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-2 mb-3">Get a Free Web Audit</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                Before you go, would you like us to analyze your current website and send you a free performance report?
              </p>
              
              <div className="flex flex-col gap-3">
                 <Link 
                   to="/contact" 
                   onClick={() => setIsVisible(false)}
                   className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors text-center flex items-center justify-center gap-2"
                 >
                   Yes, Send Me a Report <ArrowRight size={16} />
                 </Link>
                 <button 
                   onClick={() => setIsVisible(false)}
                   className="text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                 >
                   No thanks, I'll browse later
                 </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ExitIntentModal;
