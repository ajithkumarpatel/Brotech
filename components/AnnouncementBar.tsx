
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Megaphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnnouncement } from '../services/hooks';

const AnnouncementBar: React.FC = () => {
  const { announcement, loading } = useAnnouncement();
  const [isVisible, setIsVisible] = useState(true);

  // Check if user dismissed this specific announcement content before
  useEffect(() => {
    if (announcement && announcement.text) {
        const dismissed = sessionStorage.getItem(`dismissed_${announcement.text}`);
        if (dismissed) setIsVisible(false);
    }
  }, [announcement]);

  if (loading || !announcement || !announcement.enabled || !isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem(`dismissed_${announcement.text}`, 'true');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white relative z-50"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm font-medium mx-auto sm:mx-0">
                <span className="bg-white/20 p-1 rounded">
                    <Megaphone size={14} />
                </span>
                <span>{announcement.text}</span>
                {announcement.link && (
                    <Link 
                        to={announcement.link} 
                        className="underline decoration-blue-300 hover:text-blue-100 transition-colors ml-1"
                    >
                        {announcement.linkText || "Learn More"} &rarr;
                    </Link>
                )}
            </div>
            <button 
                onClick={handleDismiss}
                className="text-blue-200 hover:text-white transition-colors p-1"
                aria-label="Dismiss announcement"
            >
                <X size={16} />
            </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnnouncementBar;
