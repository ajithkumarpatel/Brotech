import React, { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import { subscribeNewsletter } from '../services/hooks';
import { motion, AnimatePresence } from 'framer-motion';

const NewsletterPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Show popup after 10 seconds if not previously dismissed or subscribed
    const hasInteracted = localStorage.getItem('newsletter_interacted');
    if (!hasInteracted) {
      const timer = setTimeout(() => setIsVisible(true), 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('newsletter_interacted', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const result = await subscribeNewsletter(email);
    if (result.success) {
      setStatus('success');
      localStorage.setItem('newsletter_interacted', 'true');
      setTimeout(() => setIsVisible(false), 2000);
    } else {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 z-50 max-w-sm w-full bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-700 p-6 m-4 md:m-0"
        >
          <button onClick={handleClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
              <Mail size={24} />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Join our Newsletter</h3>
          </div>
          
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Get the latest web trends and company updates delivered to your inbox.
          </p>

          {status === 'success' ? (
            <div className="text-green-600 dark:text-green-400 font-medium text-sm py-2">
              Thanks for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input 
                type="email" 
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-70"
              >
                {status === 'loading' ? '...' : 'Join'}
              </button>
            </form>
          )}
          {status === 'error' && <p className="text-red-500 text-xs mt-2">Something went wrong. Try again.</p>}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;