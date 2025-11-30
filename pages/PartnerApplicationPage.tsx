
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, ArrowRight, Code, Zap, Globe } from 'lucide-react';
import { submitPartnerApplication } from '../services/hooks';

const PartnerApplicationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Frontend Developer',
    portfolioUrl: '',
    hourlyRate: '',
    skills: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    const result = await submitPartnerApplication(formData);
    if (result.success) {
      setStatus('success');
      setFormData({ name: '', email: '', role: 'Frontend Developer', portfolioUrl: '', hourlyRate: '', skills: '' });
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-slate-900 text-white py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
           <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Partner Network</h1>
           <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
             We are always looking for elite freelancers and specialized agencies to help us deliver world-class projects.
           </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-10">
         <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden flex flex-col md:flex-row">
            
            {/* Sidebar Info */}
            <div className="bg-gray-50 dark:bg-slate-900 p-8 md:w-1/3 border-r border-gray-100 dark:border-slate-700">
               <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Why join us?</h3>
               <ul className="space-y-6">
                  <li className="flex gap-3">
                     <Globe className="text-blue-600 flex-shrink-0" size={24} />
                     <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Remote First</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Work from anywhere in the world.</p>
                     </div>
                  </li>
                  <li className="flex gap-3">
                     <Zap className="text-yellow-500 flex-shrink-0" size={24} />
                     <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Consistent Work</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Access a steady stream of agency overflow projects.</p>
                     </div>
                  </li>
                  <li className="flex gap-3">
                     <Code className="text-purple-500 flex-shrink-0" size={24} />
                     <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Modern Stack</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">We work with React, Next.js, and Firebase.</p>
                     </div>
                  </li>
               </ul>
            </div>

            {/* Form */}
            <div className="p-8 md:w-2/3">
               {status === 'success' ? (
                  <div className="text-center py-12">
                     <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                     <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Application Received</h3>
                     <p className="text-slate-500 dark:text-slate-400">
                        We have added you to our talent database. We will contact you when a relevant project matches your skills.
                     </p>
                     <button onClick={() => setStatus('idle')} className="mt-6 text-blue-600 font-bold hover:underline">Submit Another</button>
                  </div>
               ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                     <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Apply Now</h2>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                           <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                           <input required type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                           <input required type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                        </div>
                     </div>

                     <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Primary Role</label>
                        <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                           <option>Frontend Developer</option>
                           <option>Backend Developer</option>
                           <option>UI/UX Designer</option>
                           <option>Full Stack Developer</option>
                           <option>Copywriter</option>
                           <option>SEO Specialist</option>
                        </select>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                           <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Portfolio / GitHub URL</label>
                           <input required type="url" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" value={formData.portfolioUrl} onChange={e => setFormData({...formData, portfolioUrl: e.target.value})} />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Hourly Rate ($USD)</label>
                           <input required type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. $50-80" value={formData.hourlyRate} onChange={e => setFormData({...formData, hourlyRate: e.target.value})} />
                        </div>
                     </div>

                     <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Top Skills (Comma separated)</label>
                        <textarea required rows={3} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. React, Node.js, Tailwind, Figma..." value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} />
                     </div>

                     {status === 'error' && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center gap-2 text-sm">
                           <AlertCircle size={16} /> Submission failed. Please try again.
                        </div>
                     )}

                     <button type="submit" disabled={status === 'submitting'} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
                        {status === 'submitting' ? 'Submitting...' : 'Apply to Network'} <ArrowRight size={18} />
                     </button>
                  </form>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default PartnerApplicationPage;
