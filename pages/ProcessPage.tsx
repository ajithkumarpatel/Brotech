
import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Code, Rocket, BarChart2, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: Search,
    title: "1. Discovery & Strategy",
    description: "We start by diving deep into your business goals, target audience, and competitors. We define the project scope and create a roadmap for success.",
    color: "bg-blue-500"
  },
  {
    icon: PenTool,
    title: "2. UI/UX Design",
    description: "Our designers create wireframes and high-fidelity mockups. We focus on user experience, ensuring the final product is intuitive and beautiful.",
    color: "bg-purple-500"
  },
  {
    icon: Code,
    title: "3. Development",
    description: "We bring the designs to life using modern technologies like React, Tailwind, and Firebase. We write clean, scalable, and secure code.",
    color: "bg-indigo-500"
  },
  {
    icon: Coffee,
    title: "4. Testing & QA",
    description: "Rigorous testing across all devices and browsers. We hunt down bugs and optimize performance to ensure a flawless launch.",
    color: "bg-orange-500"
  },
  {
    icon: Rocket,
    title: "5. Launch",
    description: "We handle the deployment, domain configuration, and final checks. Your digital product goes live to the world.",
    color: "bg-green-500"
  },
  {
    icon: BarChart2,
    title: "6. Growth & Maintenance",
    description: "The journey doesn't end at launch. We provide ongoing support, analytics monitoring, and updates to keep you ahead.",
    color: "bg-pink-500"
  }
];

const ProcessPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-slate-50 dark:bg-slate-950 py-20 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">How We Work</h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              A transparent, proven process that delivers results. From concept to code.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 dark:bg-slate-800 transform md:-translate-x-1/2 hidden md:block"></div>
          
          <div className="space-y-12 md:space-y-24">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  idx % 2 !== 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Icon Circle */}
                <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center shadow-lg text-white text-xl font-bold flex-shrink-0 md:mx-auto">
                   <div className={`absolute inset-0 rounded-full ${step.color} animate-pulse opacity-20`}></div>
                   <div className={`relative w-full h-full rounded-full ${step.color} flex items-center justify-center`}>
                      <step.icon size={28} />
                   </div>
                </div>

                {/* Content Box */}
                <div className="flex-1 text-center md:text-left">
                  <div className={`bg-gray-50 dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-shadow relative ${
                    idx % 2 !== 0 ? 'md:text-right' : ''
                  }`}>
                    {/* Arrow for Desktop */}
                    <div className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-50 dark:bg-slate-800 border-t border-l border-gray-100 dark:border-slate-700 rotate-45 ${
                       idx % 2 !== 0 ? '-right-2 border-b-0 border-l-0 border-t border-r' : '-left-2'
                    }`}></div>

                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Spacer for the other side of the timeline */}
                <div className="flex-1 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-24">
           <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Ready to start step 1?</h2>
           <Link to="/contact" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
             Start Your Journey <Rocket />
           </Link>
        </div>
      </div>
    </div>
  );
};

export default ProcessPage;
