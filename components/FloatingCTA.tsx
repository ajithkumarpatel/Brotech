
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquareText } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingCTA: React.FC = () => {
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 md:hidden"
    >
      <Link 
        to="/contact" 
        className="flex items-center gap-2 bg-slate-900 dark:bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl shadow-blue-900/40 hover:scale-105 transition-transform"
      >
        <MessageSquareText size={18} />
        <span>Get a Free Quote</span>
      </Link>
    </motion.div>
  );
};

export default FloatingCTA;
