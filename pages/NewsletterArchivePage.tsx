
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, ExternalLink, ArrowRight } from 'lucide-react';
import { useNewsletters } from '../services/hooks';
import NewsletterPopup from '../components/NewsletterPopup';

const NewsletterArchivePage: React.FC = () => {
  const { data: newsletters, loading } = useNewsletters();

  if (loading) return <div className="h-screen flex items-center justify-center dark:text-white">Loading Archive...</div>;

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-slate-50 dark:bg-slate-950 py-20 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl mb-6">
               <Mail size={32} />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Newsletter Archive</h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Catch up on what you missed. Insights, product updates, and web trends delivered monthly.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
         {newsletters.length === 0 ? (
            <div className="text-center text-slate-500">No newsletters found.</div>
         ) : (
            <div className="space-y-6">
               {newsletters.map((issue, idx) => (
                  <motion.div
                     key={issue.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.1 }}
                     className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-shadow group"
                  >
                     <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                           <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                              <Calendar size={14} />
                              <span>{new Date(issue.sentAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                           </div>
                           <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {issue.subject}
                           </h3>
                           <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                              {issue.preview}
                           </p>
                        </div>
                        {issue.contentUrl ? (
                           <a 
                              href={issue.contentUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-slate-700 text-slate-700 dark:text-white rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                           >
                              Read <ExternalLink size={16} />
                           </a>
                        ) : (
                           <span className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-slate-700 text-slate-400 dark:text-slate-500 rounded-lg font-medium cursor-not-allowed">
                              Archived
                           </span>
                        )}
                     </div>
                  </motion.div>
               ))}
            </div>
         )}

         {/* Inline Subscribe Box */}
         <div className="mt-20 bg-blue-600 dark:bg-blue-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
               <h2 className="text-3xl font-bold mb-4">Don't miss the next one</h2>
               <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                  Join 5,000+ subscribers getting the latest tech insights straight to their inbox. No spam, ever.
               </p>
               <button 
                  onClick={() => {
                     // Trigger the existing popup logic by clearing local storage temporarily or just rely on manual trigger if implemented
                     // For now, simpler to just show a disabled button or hint
                     alert("Please check the bottom left of your screen for the subscription popup!");
                  }}
                  className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
               >
                  Subscribe Now <ArrowRight size={18} />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default NewsletterArchivePage;
