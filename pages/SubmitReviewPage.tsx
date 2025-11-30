
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, CheckCircle, AlertCircle, UploadCloud } from 'lucide-react';
import { submitTestimonial } from '../services/hooks';

const SubmitReviewPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
    imageUrl: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    const result = await submitTestimonial(formData);
    if (result.success) {
      setStatus('success');
      setFormData({ name: '', role: '', company: '', content: '', rating: 5, imageUrl: '' });
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-slate-50 dark:bg-slate-950 py-20 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Share Your Experience</h1>
            <p className="text-xl text-slate-500 dark:text-slate-400">
              We loved working with you. Help us grow by sharing your feedback with the world.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-slate-700">
           
           {status === 'success' ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                 <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} />
                 </div>
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Thank You!</h2>
                 <p className="text-slate-500 dark:text-slate-400 mb-8">
                    Your review has been submitted successfully. It will appear on our Wall of Love after a quick moderation check.
                 </p>
                 <button onClick={() => setStatus('idle')} className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                    Submit another review
                 </button>
              </motion.div>
           ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                 
                 <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Rating</label>
                    <div className="flex gap-2">
                       {[1,2,3,4,5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFormData({...formData, rating: star})}
                            className="focus:outline-none transition-transform hover:scale-110"
                          >
                             <Star 
                               size={32} 
                               className={star <= formData.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-slate-600"} 
                             />
                          </button>
                       ))}
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                       <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                       <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Job Title</label>
                       <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. CEO" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Company Name</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
                 </div>

                 <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Profile Photo URL (Optional)</label>
                    <div className="flex items-center gap-2">
                       <UploadCloud className="text-slate-400" />
                       <input type="text" className="flex-grow px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://linkedin.com/image.jpg" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Your Review</label>
                    <textarea required rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" placeholder="What was it like working with us?" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
                 </div>

                 {status === 'error' && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-2">
                       <AlertCircle size={20} /> Something went wrong. Please try again.
                    </div>
                 )}

                 <button type="submit" disabled={status === 'submitting'} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-70 flex items-center justify-center gap-2">
                    {status === 'submitting' ? 'Submitting...' : 'Submit Review'} <Send size={18} />
                 </button>
              </form>
           )}
        </div>
      </div>
    </div>
  );
};

export default SubmitReviewPage;
