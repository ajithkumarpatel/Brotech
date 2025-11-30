

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, Ghost, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWhiteLabelSteps } from '../services/hooks';

const WhiteLabelPage: React.FC = () => {
  const { data: steps, loading } = useWhiteLabelSteps();

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-slate-900 text-white py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
           <span className="inline-block py-1 px-3 rounded-full bg-blue-600/20 text-blue-300 text-xs font-bold uppercase tracking-wide mb-6 border border-blue-600/30">
             For Agencies
           </span>
           <h1 className="text-4xl md:text-5xl font-bold mb-6">Scale Your Agency <br/> Without the Overhead</h1>
           <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
             We provide invisible, white-label development services for marketing agencies, design studios, and consultants.
           </p>
           <Link to="/contact" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors">
              Apply as Partner <ArrowRight />
           </Link>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <Ghost size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">100% Invisible</h3>
              <p className="text-slate-600 dark:text-slate-400">
                We work under your brand. We use your email domain, join your Slack, and attend meetings as "your" developers. Your client never knows we exist.
              </p>
           </div>
           <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <DollarSign size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Wholesale Pricing</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Access our discounted agency rates. You markup our services by 50-100% and keep the profit margin without doing the coding.
              </p>
           </div>
           <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <Briefcase size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">No Hiring Headaches</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Stop worrying about payroll, benefits, or developers quitting mid-project. We are your on-demand engineering department.
              </p>
           </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-slate-950 py-20">
         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">How It Works</h2>
            
            {loading ? (
               <div className="text-center dark:text-white">Loading Process...</div>
            ) : (
               <div className="space-y-8">
                  {steps.map(step => (
                     <div key={step.id} className="flex gap-6 items-start">
                        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold flex-shrink-0">
                           {step.stepNumber}
                        </div>
                        <div>
                           <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                           <p className="text-slate-600 dark:text-slate-400">{step.description}</p>
                        </div>
                     </div>
                  ))}
               </div>
            )}

         </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
         <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Our Partner Guarantee</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
               <CheckCircle className="text-green-500" />
               <span className="font-medium text-slate-800 dark:text-slate-200">Strict NDA Protection</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
               <CheckCircle className="text-green-500" />
               <span className="font-medium text-slate-800 dark:text-slate-200">Non-Compete Clause</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
               <CheckCircle className="text-green-500" />
               <span className="font-medium text-slate-800 dark:text-slate-200">Fixed Price Quotes</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
               <CheckCircle className="text-green-500" />
               <span className="font-medium text-slate-800 dark:text-slate-200">12-Month Bug Warranty</span>
            </div>
         </div>
         <div className="mt-12">
            <Link to="/contact" className="inline-block bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity">
               Get Partner Rates
            </Link>
         </div>
      </div>
    </div>
  );
};

export default WhiteLabelPage;