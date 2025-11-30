
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, FileText, Briefcase, HelpCircle, Layers, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useServices, usePosts, useProjects, useFAQs } from '../services/hooks';
import { SearchResult } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Fetch all searchable data
  const { data: services } = useServices();
  const { data: posts } = usePosts();
  const { data: projects } = useProjects();
  const { data: faqs } = useFAQs();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!isOpen) setQuery('');
  }, [isOpen]);

  useEffect(() => {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) {
      setResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];

    // Search Services
    services.forEach(s => {
      if (s.title.toLowerCase().includes(lowerQuery) || s.description.toLowerCase().includes(lowerQuery)) {
        searchResults.push({ id: s.id, title: s.title, description: s.description, type: 'service', url: `/services/${s.id}` });
      }
    });

    // Search Posts
    posts.forEach(p => {
      if (p.title.toLowerCase().includes(lowerQuery) || p.excerpt.toLowerCase().includes(lowerQuery)) {
        searchResults.push({ id: p.id, title: p.title, description: p.excerpt, type: 'blog', url: `/blog/${p.id}` });
      }
    });

    // Search Projects
    projects.forEach(p => {
      if (p.title.toLowerCase().includes(lowerQuery) || p.description.toLowerCase().includes(lowerQuery)) {
        searchResults.push({ id: p.id, title: p.title, description: p.description, type: 'project', url: '/portfolio' });
      }
    });

    // Search FAQs
    faqs.forEach(f => {
      if (f.question.toLowerCase().includes(lowerQuery) || f.answer.toLowerCase().includes(lowerQuery)) {
        searchResults.push({ id: f.id, title: f.question, description: f.answer, type: 'faq', url: '/faq' });
      }
    });

    // Add static pages if they match
    if ('contact'.includes(lowerQuery)) searchResults.push({ id: 'contact', title: 'Contact Us', type: 'page', url: '/contact' });
    if ('about'.includes(lowerQuery)) searchResults.push({ id: 'about', title: 'About Us', type: 'page', url: '/about' });
    if ('careers'.includes(lowerQuery)) searchResults.push({ id: 'careers', title: 'Careers', type: 'page', url: '/careers' });
    if ('pricing'.includes(lowerQuery)) searchResults.push({ id: 'pricing', title: 'Pricing', type: 'page', url: '/pricing' });
    if ('estimator'.includes(lowerQuery)) searchResults.push({ id: 'estimator', title: 'Cost Estimator', type: 'page', url: '/estimator' });

    setResults(searchResults.slice(0, 8)); // Limit results
  }, [query, services, posts, projects, faqs]);

  const handleSelect = (url: string) => {
    navigate(url);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        />

        <div className="flex min-h-screen items-start justify-center p-4 pt-20 text-center sm:p-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative transform overflow-hidden rounded-xl bg-white dark:bg-slate-800 text-left shadow-2xl transition-all sm:w-full sm:max-w-2xl border border-gray-100 dark:border-slate-700"
          >
            <div className="flex items-center border-b border-gray-100 dark:border-slate-700 p-4">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                className="flex-1 border-none bg-transparent px-4 py-2 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-0 outline-none text-lg"
                placeholder="Search pages, services, or articles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {query === '' ? (
                 <div className="py-12 text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Type to search across the entire site.</p>
                 </div>
              ) : results.length === 0 ? (
                 <div className="py-12 text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400">No results found for "{query}"</p>
                 </div>
              ) : (
                <div className="space-y-1">
                  {results.map((result) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      onClick={() => handleSelect(result.url)}
                      className="flex w-full items-start gap-3 rounded-lg p-3 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors text-left group"
                    >
                      <div className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white dark:bg-slate-600 border border-gray-100 dark:border-slate-500 shadow-sm">
                        {result.type === 'service' && <Layers size={16} className="text-blue-500" />}
                        {result.type === 'blog' && <FileText size={16} className="text-green-500" />}
                        {result.type === 'project' && <Briefcase size={16} className="text-purple-500" />}
                        {result.type === 'faq' && <HelpCircle size={16} className="text-orange-500" />}
                        {result.type === 'page' && <ArrowRight size={16} className="text-slate-500" />}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center gap-2">
                            <h4 className="font-medium text-slate-900 dark:text-white truncate">{result.title}</h4>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 border border-slate-200 dark:border-slate-600 px-1.5 rounded">{result.type}</span>
                        </div>
                        {result.description && (
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{result.description}</p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 dark:bg-slate-900 px-4 py-3 text-xs text-slate-500 dark:text-slate-400 border-t border-gray-100 dark:border-slate-700 flex justify-between">
                <span>Press ESC to close</span>
                <span>{results.length} results</span>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default SearchModal;
