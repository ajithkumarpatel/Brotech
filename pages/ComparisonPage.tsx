
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Shield, Zap, Lock, Scaling, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComparisonPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-slate-900 text-white py-20 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Why Go Custom?</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            The truth about the difference between a $500 template and a custom-engineered digital solution.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-6 border-b-2 border-slate-200 dark:border-slate-700 w-1/3"></th>
                <th className="p-6 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-t-xl text-xl font-bold text-blue-700 dark:text-blue-400 text-center w-1/3">
                  Brotech Custom
                </th>
                <th className="p-6 border-b-2 border-slate-200 dark:border-slate-700 text-xl font-bold text-slate-500 dark:text-slate-400 text-center w-1/3">
                  DIY / Builders
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-700 dark:text-slate-300">
              {[
                { label: "Performance & Speed", custom: "Google Core Web Vitals optimized (95+ Score)", diy: "Bloated code, slow loading times" },
                { label: "Security", custom: "Enterprise-grade security & custom auth", diy: "Vulnerable plugins & shared hosting risks" },
                { label: "Scalability", custom: "Unlimited. Grows with your business.", diy: "Limited by platform constraints." },
                { label: "SEO", custom: "Semantic HTML & programmatic SEO control", diy: "Generic tags, hard to rank high" },
                { label: "Ownership", custom: "You own 100% of the code & data.", diy: "Locked into their platform subscription." },
                { label: "Design", custom: "Pixel-perfect to your brand identity.", diy: "Generic templates used by thousands." },
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-6 font-bold">{row.label}</td>
                  <td className="p-6 bg-blue-50/30 dark:bg-blue-900/10 text-center border-x border-blue-100 dark:border-blue-900/30">
                    <div className="flex flex-col items-center gap-2">
                       <Check className="text-green-500" size={28} />
                       <span className="text-sm font-medium">{row.custom}</span>
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <div className="flex flex-col items-center gap-2 opacity-70">
                       <X className="text-red-500" size={28} />
                       <span className="text-sm">{row.diy}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="p-8 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700">
            <Zap className="text-yellow-500 mb-4 h-10 w-10" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Blazing Fast</h3>
            <p className="text-slate-500 dark:text-slate-400">
              We code efficiently using React and modern frameworks, ensuring your site loads instantly. Every second of delay costs you 7% in conversions.
            </p>
          </div>
          <div className="p-8 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700">
            <Lock className="text-blue-500 mb-4 h-10 w-10" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Hack-Proof</h3>
            <p className="text-slate-500 dark:text-slate-400">
              No vulnerable plugins. No SQL injections. We build with security-first architecture to protect your customer data.
            </p>
          </div>
          <div className="p-8 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700">
            <Scaling className="text-purple-500 mb-4 h-10 w-10" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Built to Scale</h3>
            <p className="text-slate-500 dark:text-slate-400">
              Start small, grow huge. Our codebases handle 100 users or 1,000,000 users without needing a rebuild.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Invest in an Asset, Not a Liability.</h2>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
            Start Your Custom Project <ArrowRight />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ComparisonPage;
