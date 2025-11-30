
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Sun, Moon, Calculator, Calendar, Search, LogIn } from 'lucide-react';
import { useSiteContent } from '../services/hooks';
import { useTheme } from '../context/ThemeContext';
import ChatWidget from './ChatWidget';
import NewsletterPopup from './NewsletterPopup';
import AnnouncementBar from './AnnouncementBar';
import SearchModal from './SearchModal';
import CookieConsent from './CookieConsent';
import ExitIntentModal from './ExitIntentModal';
import ScrollToTop from './ScrollToTop';
import FloatingCTA from './FloatingCTA';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { content } = useSiteContent();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isActive = (path: string) => 
    location.pathname === path 
      ? "text-blue-600 dark:text-blue-400 font-semibold" 
      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400";

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <AnnouncementBar />
      <NewsletterPopup />
      <CookieConsent />
      <ExitIntentModal />
      <ScrollToTop />
      <FloatingCTA />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2" onClick={closeMenu}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">Brotech<span className="text-blue-600 dark:text-blue-400">Web</span></span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden xl:flex space-x-6 items-center text-sm font-medium">
              <Link to="/" className={isActive('/')}>Home</Link>
              <Link to="/services" className={isActive('/services')}>Services</Link>
              <Link to="/portfolio" className={isActive('/portfolio')}>Portfolio</Link>
              <Link to="/pricing" className={isActive('/pricing')}>Pricing</Link>
              <Link to="/about" className={isActive('/about')}>About</Link>
              <Link to="/blog" className={isActive('/blog')}>Blog</Link>
              <Link to="/contact" className={isActive('/contact')}>Contact</Link>
              <Link to="/estimator" className="text-green-600 dark:text-green-400 font-semibold hover:text-green-700 flex items-center gap-1">
                <Calculator size={16} /> Estimator
              </Link>
              <Link to="/technologies" className={isActive('/technologies')}>Tech Stack</Link>
            </div>

            {/* Right Side Icons & CTA */}
            <div className="hidden md:flex items-center gap-4">
               <button onClick={() => setIsSearchOpen(true)} className="p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                 <Search size={20} />
               </button>
               <button onClick={toggleTheme} className="p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                 {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
               </button>
               <Link to="/schedule" className="hidden lg:flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                 <Calendar size={18} /> Book Call
               </Link>
               <Link to="/portal" className="hidden lg:flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                 <LogIn size={18} /> Portal
               </Link>
               <Link to="/contact" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg shadow-slate-900/20">
                 Get Quote
               </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
               <button onClick={toggleTheme} className="text-slate-500 dark:text-slate-400">
                 {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
               </button>
               <button onClick={toggleMenu} className="text-slate-900 dark:text-white">
                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
               </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 absolute w-full left-0 shadow-xl">
            <div className="px-4 pt-4 pb-6 space-y-2">
              <Link to="/" onClick={closeMenu} className="block py-3 px-4 text-slate-600 dark:text-slate-300 font-medium hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg">Home</Link>
              <Link to="/services" onClick={closeMenu} className="block py-3 px-4 text-slate-600 dark:text-slate-300 font-medium hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg">Services</Link>
              <Link to="/portfolio" onClick={closeMenu} className="block py-3 px-4 text-slate-600 dark:text-slate-300 font-medium hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg">Portfolio</Link>
              <Link to="/pricing" onClick={closeMenu} className="block py-3 px-4 text-slate-600 dark:text-slate-300 font-medium hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg">Pricing</Link>
              <Link to="/about" onClick={closeMenu} className="block py-3 px-4 text-slate-600 dark:text-slate-300 font-medium hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg">About</Link>
              <Link to="/blog" onClick={closeMenu} className="block py-3 px-4 text-slate-600 dark:text-slate-300 font-medium hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg">Blog</Link>
              <Link to="/contact" onClick={closeMenu} className="block py-3 px-4 text-slate-600 dark:text-slate-300 font-medium hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg">Contact</Link>
              <Link to="/estimator" onClick={closeMenu} className="block py-3 px-4 text-green-600 dark:text-green-400 font-bold hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg">Cost Estimator</Link>
              <Link to="/portal" onClick={closeMenu} className="block py-3 px-4 text-slate-600 dark:text-slate-300 font-medium hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg">Client Portal</Link>
              <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                 <Link to="/contact" onClick={closeMenu} className="block w-full text-center bg-blue-600 text-white py-3 rounded-xl font-bold">Get a Quote</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      <ChatWidget />

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 pt-16 pb-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">Brotech<span className="text-blue-600 dark:text-blue-400">Web</span></span>
              </Link>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                {content?.heroSubtitle || "Building the Future of the Web"}
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-colors"><Linkedin size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-400 hover:text-white transition-colors"><Twitter size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-800 hover:text-white transition-colors"><Facebook size={18} /></a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-6">Company</h4>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><Link to="/team" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Our Team</Link></li>
                <li><Link to="/careers" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Careers</Link></li>
                <li><Link to="/partners/join" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Partner Program</Link></li>
                <li><Link to="/referral" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Referral Program</Link></li>
                <li><Link to="/press-kit" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Press Kit</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-6">Resources</h4>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li><Link to="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</Link></li>
                <li><Link to="/portfolio" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Case Studies</Link></li>
                <li><Link to="/glossary" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Web Glossary</Link></li>
                <li><Link to="/events" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Events & Webinars</Link></li>
                <li><Link to="/resources" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Downloads Library</Link></li>
                <li><Link to="/roi-calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">ROI Calculator</Link></li>
                <li><Link to="/tools/timeline" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Timeline Generator</Link></li>
                <li><Link to="/status" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> System Status</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-6">Contact</h4>
              <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-3">
                  <Mail size={18} className="text-blue-600 dark:text-blue-400 mt-0.5" />
                  <span>{content?.contactEmail}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={18} className="text-blue-600 dark:text-blue-400 mt-0.5" />
                  <span>{content?.contactPhone}</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-blue-600 dark:text-blue-400 mt-0.5" />
                  <span>{content?.contactAddress}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500 dark:text-slate-500">
              © {new Date().getFullYear()} Brotech WebSolutions. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-slate-500 dark:text-slate-500">
              <Link to="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/sitemap" className="hover:text-slate-900 dark:hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
