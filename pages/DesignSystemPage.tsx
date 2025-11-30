

import React from 'react';
import { motion } from 'framer-motion';
import { useDesignColors } from '../services/hooks';

const DesignSystemPage: React.FC = () => {
  const { data: colors, loading } = useDesignColors();

  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Design System</h1>
          <p className="text-xl text-slate-500 dark:text-slate-400">
            A living guide to the visual language and components of the Brotech WebSolutions brand.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Typography */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 pb-2 border-b border-gray-200 dark:border-slate-800">Typography</h2>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-200 dark:border-slate-800 space-y-8">
             <div>
                <span className="text-xs text-slate-400 font-mono mb-2 block">Heading 1 / Inter Bold</span>
                <h1 className="text-5xl font-bold text-slate-900 dark:text-white">The quick brown fox</h1>
             </div>
             <div>
                <span className="text-xs text-slate-400 font-mono mb-2 block">Heading 2 / Inter Bold</span>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Jumps over the lazy dog</h2>
             </div>
             <div>
                <span className="text-xs text-slate-400 font-mono mb-2 block">Heading 3 / Inter Semibold</span>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Pack my box with five dozen liquor jugs</h3>
             </div>
             <div>
                <span className="text-xs text-slate-400 font-mono mb-2 block">Body Text / Inter Regular</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
             </div>
          </div>
        </section>

        {/* Colors */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 pb-2 border-b border-gray-200 dark:border-slate-800">Color Palette</h2>
          
          {loading ? (
             <div className="dark:text-white">Loading colors...</div>
          ) : (
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {colors.map(color => (
                   <div key={color.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-800 flex items-center gap-4">
                      {/* Use hex for inline style to support dynamic DB colors, fallback to bgClass if provided */}
                      <div className="w-12 h-12 rounded-lg shadow-sm" style={{ backgroundColor: color.hex }}></div>
                      <div>
                         <div className="font-bold text-slate-900 dark:text-white text-sm">{color.name}</div>
                         <div className="text-xs text-slate-500 font-mono">{color.hex}</div>
                      </div>
                   </div>
                ))}
             </div>
          )}
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 pb-2 border-b border-gray-200 dark:border-slate-800">Buttons</h2>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-200 dark:border-slate-800 flex flex-wrap gap-4 items-center">
             <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">Primary Button</button>
             <button className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Secondary Button</button>
             <button className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl font-bold hover:border-slate-800 dark:hover:border-white transition-colors">Outline Button</button>
             <button className="text-blue-600 dark:text-blue-400 font-bold hover:underline px-4">Text Link</button>
          </div>
        </section>

        {/* Form Elements */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 pb-2 border-b border-gray-200 dark:border-slate-800">Form Elements</h2>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Input Field</label>
                <input type="text" placeholder="Placeholder text..." className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" />
             </div>
             <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Select Dropdown</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none">
                   <option>Option 1</option>
                   <option>Option 2</option>
                   <option>Option 3</option>
                </select>
             </div>
             <div className="flex items-center gap-3">
                <input type="checkbox" checked readOnly className="w-5 h-5 text-blue-600 rounded" />
                <label className="text-slate-700 dark:text-slate-300">Checkbox Active</label>
             </div>
             <div className="flex items-center gap-3">
                <input type="radio" checked readOnly className="w-5 h-5 text-blue-600" />
                <label className="text-slate-700 dark:text-slate-300">Radio Active</label>
             </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default DesignSystemPage;