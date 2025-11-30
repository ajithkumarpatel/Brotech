
import React from 'react';
import { motion } from 'framer-motion';

const dots = [
  { x: 180, y: 120, delay: 0 },   // North America West
  { x: 250, y: 140, delay: 1.5 }, // North America East
  { x: 440, y: 130, delay: 0.8 }, // Europe
  { x: 460, y: 150, delay: 2.2 }, // Middle East
  { x: 650, y: 220, delay: 1.2 }, // Australia
  { x: 580, y: 160, delay: 0.5 }, // Asia
  { x: 320, y: 320, delay: 1.8 }, // South America
];

const GlobalMap: React.FC = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-[2/1] bg-blue-50 dark:bg-slate-800 rounded-3xl overflow-hidden border border-blue-100 dark:border-slate-700">
      
      {/* Simple SVG World Map Outline */}
      <svg viewBox="0 0 800 400" className="w-full h-full opacity-30 dark:opacity-20 fill-blue-500 dark:fill-blue-400">
        <path d="M150,80 Q200,50 280,100 T350,150 T280,300 T180,350 T100,250 T150,80 Z" /> {/* Rough Americas */}
        <path d="M400,80 Q450,50 550,80 T600,150 T550,250 T450,280 T400,180 Z" /> {/* Rough Eurasia/Africa */}
        <path d="M620,200 Q650,180 700,200 T720,250 T650,280 Z" /> {/* Rough Australia */}
      </svg>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="sr-only">Map showing client locations</p>
      </div>

      {dots.map((dot, i) => (
        <div 
          key={i}
          className="absolute w-4 h-4"
          style={{ top: `${(dot.y / 400) * 100}%`, left: `${(dot.x / 800) * 100}%` }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 2, 2], opacity: [1, 0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: dot.delay }}
            className="absolute inset-0 bg-blue-500 rounded-full"
          />
          <div className="absolute inset-0 w-full h-full bg-blue-600 rounded-full shadow-lg border-2 border-white dark:border-slate-800"></div>
          
          {/* Tooltip on Hover */}
          <div className="opacity-0 hover:opacity-100 transition-opacity absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-slate-900 text-white text-xs rounded whitespace-nowrap z-10 pointer-events-auto">
            Client Project
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-4 py-2 rounded-lg border border-gray-100 dark:border-slate-600 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-lg">
         Serving Clients in 15+ Countries
      </div>
    </div>
  );
};

export default GlobalMap;
