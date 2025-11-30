
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Gift, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { submitReferral } from '../services/hooks';

const ReferralPage: React.FC = () => {
  const [formData, setFormData] = useState({
    referrerName: '',
    referrerEmail: '',
    referredClient: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    const result = await submitReferral(formData);
    if (result.success) {
      setStatus('success');
      setFormData({ referrerName: '', referrerEmail: '', referredClient: '', message: '' });
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-indigo-600 dark:bg-indigo-900 py-20 text-center text-white">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
        >
          <h1 className="text-4xl font-bold mb-4">Refer a Client, Get Rewarded</h1>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
            Earn a 10% commission for every new client you send our way. It's our way of saying thanks.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Info Side */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">How it works</h2>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">1</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Submit a Referral</h3>
                <p className="text-slate-600 dark:text-slate-400">Fill out the form with your details and the potential client's information.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">2</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">We Close the Deal</h3>
                <p className="text-slate-600 dark:text-slate-400">Our team contacts the client and handles the project scoping and contract.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">3</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">You Get Paid</h3>
                <p className="text-slate-600 dark:text-slate-400">Once the client pays their deposit, we send you 10% of the project value.</p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-xl border border-gray-100 dark:border-slate-700 mt-8">
               <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400 font-bold">
                  <Gift size={20} />
                  <span>Bonus</span>
               </div>
               <p className="text-sm text-slate-600 dark:text-slate-400">
                 Refer 3 clients in a year and get an additional $500 bonus on top of your commissions!
               </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-slate-700">
             {status === 'success' ? (
                <div className="text-center py-12">
                   <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Referral Submitted!</h3>
                   <p className="text-slate-500 dark:text-slate-400 mb-6">Thanks for trusting us. We'll keep you updated.</p>
                   <button onClick={() => setStatus('idle')} className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                      Submit another
                   </button>
                </div>
             ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Referral Form</h3>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                         <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
                         <input required type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.referrerName} onChange={e => setFormData({...formData, referrerName: e.target.value})} />
                      </div>
                      <div>
                         <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Your Email</label>
                         <input required type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.referrerEmail} onChange={e => setFormData({...formData, referrerEmail: e.target.value})} />
                      </div>
                   </div>

                   <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Client Name / Company</label>
                      <input required type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.referredClient} onChange={e => setFormData({...formData, referredClient: e.target.value})} />
                   </div>

                   <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Notes / Contact Info</label>
                      <textarea required rows={3} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="How should we contact them?" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                   </div>

                   {status === 'error' && (
                      <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                         <AlertCircle size={16} />
                         <span>Submission failed. Please try again.</span>
                      </div>
                   )}

                   <button type="submit" disabled={status === 'submitting'} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
                      {status === 'submitting' ? 'Sending...' : 'Submit Referral'} <ArrowRight size={18} />
                   </button>
                </form>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralPage;
