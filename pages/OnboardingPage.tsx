
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, ArrowRight, UploadCloud, Rocket } from 'lucide-react';
import { submitOnboarding } from '../services/hooks';

const OnboardingPage: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    projectType: 'Website Redesign',
    existingWebsite: '',
    goals: '',
    driveLink: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    const result = await submitOnboarding(formData);
    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-slate-900 py-24 text-center text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-4">Project Onboarding Hub</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Welcome aboard! Let's gather everything we need to kick off your project smoothly.
          </p>
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
          
          {status === 'success' ? (
             <div className="p-16 text-center">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                   <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">You're All Set!</h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg mb-8">
                   We have received your project details. Our team is reviewing them and will schedule the kickoff call shortly.
                </p>
                <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl inline-block text-left">
                   <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2"><Rocket size={20} /> Next Steps:</h3>
                   <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
                      <li>Review contract sent to your email</li>
                      <li>Add "hello@brotech.com" to contacts</li>
                      <li>Wait for your project manager's intro</li>
                   </ul>
                </div>
             </div>
          ) : (
             <div className="p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                   
                   {/* Section 1 */}
                   <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                         <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm">1</span>
                         Company Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Company Name</label>
                            <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} />
                         </div>
                         <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Existing Website (Optional)</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" value={formData.existingWebsite} onChange={e => setFormData({...formData, existingWebsite: e.target.value})} />
                         </div>
                      </div>
                   </div>

                   {/* Section 2 */}
                   <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                         <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm">2</span>
                         Primary Contact
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                            <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" value={formData.contactName} onChange={e => setFormData({...formData, contactName: e.target.value})} />
                         </div>
                         <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                            <input required type="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                         </div>
                      </div>
                   </div>

                   {/* Section 3 */}
                   <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                         <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm">3</span>
                         Project Specifics
                      </h3>
                      <div className="space-y-6">
                         <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Primary Goal</label>
                            <textarea required rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Increase sales, Improve brand image..." value={formData.goals} onChange={e => setFormData({...formData, goals: e.target.value})} />
                         </div>
                         <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Assets Link (Google Drive / Dropbox)</label>
                            <div className="flex items-center gap-2">
                               <UploadCloud className="text-slate-400" />
                               <input type="text" className="flex-grow px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" placeholder="Paste link to your logo, images, copy..." value={formData.driveLink} onChange={e => setFormData({...formData, driveLink: e.target.value})} />
                            </div>
                            <p className="text-xs text-slate-500 mt-2">Please ensure the link is set to "Anyone with the link can view".</p>
                         </div>
                      </div>
                   </div>

                   {status === 'error' && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-2">
                         <AlertCircle size={20} /> Submission failed. Please try again.
                      </div>
                   )}

                   <div className="pt-4">
                      <button type="submit" disabled={status === 'submitting'} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-70 flex items-center justify-center gap-2">
                         {status === 'submitting' ? 'Submitting...' : 'Submit Project Details'} <ArrowRight size={20} />
                      </button>
                   </div>

                </form>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
