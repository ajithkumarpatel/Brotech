

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, FileText, MessageSquare, CreditCard, Rocket, Lock } from 'lucide-react';

const ClientPortalPage: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen transition-colors">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 py-12">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
               <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Client Portal</h1>
               <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your projects, payments, and support requests.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-bold text-sm">
               <Lock size={16} /> Secure Area
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
         >
            
            {/* Status Tracker */}
            <Link to="/tracker" className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group">
               <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Activity size={24} />
               </div>
               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Track Project</h3>
               <p className="text-slate-500 dark:text-slate-400">View real-time progress, timeline, and upcoming milestones for your active build.</p>
            </Link>

            {/* Onboarding */}
            <Link to="/onboarding" className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group">
               <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Rocket size={24} />
               </div>
               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">New Project Setup</h3>
               <p className="text-slate-500 dark:text-slate-400">Submit requirements, assets, and kickoff details for a new engagement.</p>
            </Link>

            {/* Support */}
            <Link to="/contact" className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group">
               <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MessageSquare size={24} />
               </div>
               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Priority Support</h3>
               <p className="text-slate-500 dark:text-slate-400">Need a fix or update? Open a priority ticket directly with our dev team.</p>
            </Link>

            {/* Invoices */}
            <Link to="/portal/invoices" className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group">
               <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CreditCard size={24} />
               </div>
               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Billing & Invoices</h3>
               <p className="text-slate-500 dark:text-slate-400">View past invoices, download receipts, and manage your subscription.</p>
            </Link>

            {/* Documents */}
            <Link to="/portal/documents" className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group">
               <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText size={24} />
               </div>
               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Contracts & Docs</h3>
               <p className="text-slate-500 dark:text-slate-400">Access your signed agreements, NDAs, and project scopes.</p>
            </Link>

         </motion.div>
      </div>
    </div>
  );
};

export default ClientPortalPage;
