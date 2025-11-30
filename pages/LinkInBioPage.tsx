
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, Mail, Globe, Layout, User } from 'lucide-react';
import { useSiteContent } from '../services/hooks';

const LinkInBioPage: React.FC = () => {
  const { content } = useSiteContent();

  const links = [
    { title: "Visit Website", url: "/", icon: Globe, color: "bg-blue-500" },
    { title: "View Portfolio", url: "/portfolio", icon: Layout, color: "bg-purple-500" },
    { title: "Book a Consultation", url: "/schedule", icon: Calendar, color: "bg-green-500" },
    { title: "Our Services", url: "/services", icon: Briefcase, color: "bg-orange-500" },
    { title: "Contact Us", url: "/contact", icon: Mail, color: "bg-slate-700" },
    { title: "Join Our Team", url: "/careers", icon: User, color: "bg-pink-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col items-center py-12 px-4 transition-colors">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-blue-500/30 mb-4">
            <span className="text-white font-bold text-4xl">B</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Brotech WebSolutions</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">{content?.heroTagline || "Building the Future of the Web"}</p>
        </div>

        {/* Links */}
        <div className="space-y-4">
          {links.map((link, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link 
                to={link.url}
                className="flex items-center p-1 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all border border-gray-100 dark:border-slate-700 group"
              >
                <div className={`w-12 h-12 ${link.color} text-white rounded-lg flex items-center justify-center flex-shrink-0 group-hover:opacity-90 transition-opacity`}>
                   <link.icon size={24} />
                </div>
                <span className="flex-grow text-center font-bold text-slate-800 dark:text-slate-200 pr-12">{link.title}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
            <p className="text-xs text-slate-400">© {new Date().getFullYear()} Brotech WebSolutions</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LinkInBioPage;
