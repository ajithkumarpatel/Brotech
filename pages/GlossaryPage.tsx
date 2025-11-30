
import React, { useState } from 'react';
import { useGlossary } from '../services/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Book } from 'lucide-react';

const GlossaryPage: React.FC = () => {
  const { data: terms, loading } = useGlossary();
  const [filter, setFilter] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('All');

  const alphabet = ['All', ...Array.from(new Set(terms.map(t => t.term.charAt(0).toUpperCase()))).sort()];

  const filteredTerms = terms.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(filter.toLowerCase()) || 
                          item.definition.toLowerCase().includes(filter.toLowerCase());
    const matchesLetter = selectedLetter === 'All' || item.term.charAt(0).toUpperCase() === selectedLetter;
    
    return matchesSearch && matchesLetter;
  }).sort((a, b) => a.term.localeCompare(b.term));

  if (loading) return <div className="h-screen flex items-center justify-center dark:text-white">Loading Glossary...</div>;

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-slate-50 dark:bg-slate-950 py-20 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
               <Book size={32} />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Web Glossary</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Confused by tech jargon? Browse our comprehensive dictionary of web development, design, and marketing terms.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Search & Filter */}
        <div className="mb-12 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search for a term (e.g., API, DNS, React)..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none shadow-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {alphabet.map(letter => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                   selectedLetter === letter 
                     ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                     : 'bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <AnimatePresence>
             {filteredTerms.length > 0 ? (
               filteredTerms.map((item) => (
                 <motion.div
                   layout
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   key={item.id}
                   className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-all"
                 >
                   <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.term}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                        {item.category}
                      </span>
                   </div>
                   <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                     {item.definition}
                   </p>
                 </motion.div>
               ))
             ) : (
               <div className="col-span-full text-center py-20 text-slate-400">
                  <p className="text-lg">No terms found matching your search.</p>
               </div>
             )}
           </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default GlossaryPage;
