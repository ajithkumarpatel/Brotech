
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="max-w-7xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 p-6 md:flex items-center justify-between gap-6">
            <div className="flex items-start gap-4 mb-4 md:mb-0">
               <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                 <Cookie size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-slate-900 dark:text-white mb-1">We value your privacy</h3>
                 <p className="text-sm text-slate-500 dark:text-slate-400">
                   We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                   <a href="/privacy" className="text-blue-600 dark:text-blue-400 ml-1 hover:underline">Read Policy</a>
                 </p>
               </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleDecline}
                className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors font-medium text-sm whitespace-nowrap"
              >
                Decline
              </button>
              <button 
                onClick={handleAccept}
                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium text-sm whitespace-nowrap shadow-lg shadow-blue-500/30"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
