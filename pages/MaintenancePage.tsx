
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Server, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: "Basic Care",
    price: "$99",
    period: "/month",
    description: "Essential security and backups for small business sites.",
    features: [
      "Daily Cloud Backups",
      "24/7 Uptime Monitoring",
      "Monthly Software Updates",
      "Security Scans",
      "1 Hour Content Edits"
    ]
  },
  {
    name: "Professional",
    price: "$249",
    period: "/month",
    recommended: true,
    description: "Performance optimization and priority support for growing businesses.",
    features: [
      "Everything in Basic",
      "Weekly Performance Audits",
      "Database Optimization",
      "Priority Email Support",
      "3 Hours Content Edits",
      "Monthly Analytics Report"
    ]
  },
  {
    name: "Enterprise",
    price: "$599",
    period: "/month",
    description: "Full-service management for mission-critical applications.",
    features: [
      "Everything in Professional",
      "Real-time Security Guard",
      "Dedicated Account Manager",
      "Unlimited Content Edits",
      "Slack Channel Access",
      "CI/CD Pipeline Management"
    ]
  }
];

const MaintenancePage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-slate-50 dark:bg-slate-950 py-20 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Website Care Plans</h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Protect your investment. We handle the updates, backups, and security so you can focus on your business.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative p-8 rounded-2xl border flex flex-col h-full ${
                plan.recommended 
                  ? 'border-blue-600 bg-white dark:bg-slate-800 ring-4 ring-blue-50 dark:ring-blue-900/20 shadow-xl' 
                  : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm'
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 h-10">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                  <span className="text-slate-500 dark:text-slate-400">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 text-sm">
                    <Check size={18} className="mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                to="/contact" 
                state={{ message: `I'm interested in the ${plan.name} maintenance plan.` }}
                className={`w-full py-3 rounded-xl font-bold text-center transition-colors ${
                  plan.recommended
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                Choose {plan.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Value Props */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg">
                    <Server size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Sleep Soundly</h3>
                    <p className="text-slate-500 text-sm">Daily off-site backups mean your data is never lost, no matter what happens.</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                    <ShieldCheck size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Ironclad Security</h3>
                    <p className="text-slate-500 text-sm">We patch vulnerabilities before hackers can exploit them.</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg">
                    <Clock size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Save Time</h3>
                    <p className="text-slate-500 text-sm">Don't waste hours fighting with plugins. Send us an email, and we'll fix it.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
