import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center px-4 transition-colors">
      <div className="text-center max-w-lg">
        <div className="text-9xl font-extrabold text-blue-100 dark:text-blue-900/30">404</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-12 sm:mt-0">
          <div className="relative">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-blue-500/50 animate-bounce">
              <span className="text-4xl">🤖</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-4">Page Not Found</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg">
          Oops! It looks like the digital path you're looking for doesn't exist.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors">
            <Home size={18} /> Go Home
          </Link>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white px-8 py-3 rounded-full font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            Report Issue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;