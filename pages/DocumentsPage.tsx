
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Download, Lock, Calendar } from 'lucide-react';
import { useClientDocuments } from '../services/hooks';

const DocumentsPage: React.FC = () => {
  const { data: documents, loading } = useClientDocuments();

  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/portal" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Portal
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Documents & Contracts</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Securely access your project agreements and files.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
           <div className="dark:text-white">Loading Documents...</div>
        ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc, idx) => (
                 <motion.div 
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
                 >
                    <div className="flex items-start justify-between mb-4">
                       <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                          <FileText size={24} />
                       </div>
                       <div className="bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                          {doc.type}
                       </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{doc.title}</h3>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2">
                       <Calendar size={14} /> {new Date(doc.date).toLocaleDateString()}
                       <span className="mx-1">•</span>
                       <span>{doc.category}</span>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-700">
                       <a 
                          href={doc.downloadUrl}
                          className="w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors text-sm"
                       >
                          <Download size={16} /> Download File
                       </a>
                    </div>
                 </motion.div>
              ))}
           </div>
        )}
        
        {documents.length === 0 && (
           <div className="text-center py-20 text-slate-500">No documents found.</div>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;
