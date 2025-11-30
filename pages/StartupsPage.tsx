
import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Clock, Shield, ArrowRight, Code, Zap, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStartupPackages, useStartupFAQs } from '../services/hooks';

const StartupsPage: React.FC = () => {
  const { data: packages, loading: loadingPackages } = useStartupPackages();
  const { data: faqs, loading: loadingFAQs } = useStartupFAQs();

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      {/* Hero */}
      <div className="bg-indigo-900 py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-4xl mx-auto px-4"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-800 text-indigo-200 text-xs font-bold uppercase tracking-wide mb-6 border border-indigo-700">
             For Founders
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Launch Your MVP in 4 Weeks</h1>
          <p className="text-xl text-indigo-200 max-w-2xl mx-auto mb-10">
            Stop pitching decks and start getting users. We build scalable Minimum Viable Products for startups ready to disrupt.
          </p>
          <Link 
            to="/contact" 
            state={{ message: "I'm ready to build my MVP." }}
            className="inline-flex items-center gap-2 bg-white text-indigo-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors"
          >
             Start Building <Rocket size={20} />
          </Link>
        </motion.div>
      </div>

      {/* Why Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="p-8 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
              <Clock className="text-indigo-500 mb-4 h-10 w-10" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Rapid Development</h3>
              <p className="text-slate-500 dark:text-slate-400">We use a pre-built SaaS boilerplate to skip the boring stuff (Auth, Payments) and focus on your unique features.</p>
           </div>
           <div className="p-8 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
              <Shield className="text-indigo-500 mb-4 h-10 w-10" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Investor Ready</h3>
              <p className="text-slate-500 dark:text-slate-400">Clean code, documented architecture, and a polished UI that makes VCs take you seriously.</p>
           </div>
           <div className="p-8 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
              <Zap className="text-indigo-500 mb-4 h-10 w-10" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Built to Scale</h3>
              <p className="text-slate-500 dark:text-slate-400">We don't use low-code tools. We write real React/Node code that can handle millions of users later.</p>
           </div>
        </div>
      </div>

      {/* Packages */}
      <div className="bg-slate-50 dark:bg-slate-950 py-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">Startup Packages</h2>
            
            {loadingPackages ? (
               <div className="text-center dark:text-white">Loading Packages...</div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {packages.map((pkg, idx) => (
                     <div 
                        key={pkg.id} 
                        className={`bg-white dark:bg-slate-900 p-8 rounded-2xl border ${pkg.isPopular ? 'border-2 border-indigo-600 shadow-xl relative' : 'border-gray-200 dark:border-slate-700'} flex flex-col`}
                     >
                        {pkg.isPopular && (
                           <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                              Best Value
                           </div>
                        )}
                        <div className="mb-4">
                           <h3 className="text-xl font-bold text-slate-900 dark:text-white">{pkg.name}</h3>
                           <p className="text-slate-500 dark:text-slate-400 text-sm">{pkg.subtitle}</p>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                           {pkg.price} <span className="text-sm font-normal text-slate-500">{pkg.priceSuffix}</span>
                        </div>
                        <ul className="space-y-3 mb-8 flex-grow">
                           {pkg.features.map((feature, i) => (
                              <li key={i} className="flex gap-2 text-sm text-slate-600 dark:text-slate-300">
                                 {idx === 0 ? <Code size={16} /> : idx === 1 ? <Rocket size={16} /> : <Layout size={16} />} 
                                 {feature}
                              </li>
                           ))}
                        </ul>
                        <Link 
                           to="/contact" 
                           state={{ message: `I'm interested in the ${pkg.name} startup package.` }}
                           className={`w-full py-3 rounded-xl font-bold text-center transition-colors ${
                              pkg.isPopular 
                                 ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                                 : 'border border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
                           }`}
                        >
                           {pkg.ctaText || 'Get Started'}
                        </Link>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
      
      {/* Founder FAQ */}
      <div className="max-w-3xl mx-auto px-4 py-20">
         <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Founder FAQ</h2>
         <div className="space-y-6">
            {loadingFAQs ? (
               <div className="text-center dark:text-white">Loading FAQs...</div>
            ) : (
               faqs.map(faq => (
                  <div key={faq.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
                     <h3 className="font-bold text-slate-900 dark:text-white mb-2">{faq.question}</h3>
                     <p className="text-slate-600 dark:text-slate-400">{faq.answer}</p>
                  </div>
               ))
            )}
         </div>
      </div>
    </div>
  );
};

export default StartupsPage;
