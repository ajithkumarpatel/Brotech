import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { requestMeeting } from '../services/hooks';
import { motion } from 'framer-motion';

const SchedulePage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'General Inquiry',
    preferredDate: '',
    preferredTime: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    const result = await requestMeeting(formData);
    if (result.success) {
      setStatus('success');
      setFormData({ name: '', email: '', topic: 'General Inquiry', preferredDate: '', preferredTime: '' });
    } else {
      setStatus('error');
    }
  };

  const topics = [
    "General Inquiry",
    "New Project Proposal",
    "Technical Support",
    "Partnership Opportunity",
    "Career / Job Application"
  ];

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-slate-50 dark:bg-slate-950 py-20 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Schedule a Consultation</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Book a time to speak with one of our experts. We look forward to hearing about your project.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 dark:bg-green-900/20 p-8 rounded-2xl text-center border border-green-100 dark:border-green-800"
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Request Received!</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              We have received your meeting request. A team member will confirm the time via email shortly.
            </p>
            <button 
              onClick={() => setStatus('idle')}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Book another meeting
            </button>
          </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            onSubmit={handleSubmit} 
            className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <span className="flex items-center gap-2"><User size={16} /> Name</span>
                </label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <span className="flex items-center gap-2"><Mail size={16} /> Email</span>
                </label>
                <input 
                  type="email" 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                <span className="flex items-center gap-2"><MessageSquare size={16} /> Topic</span>
              </label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none appearance-none"
                value={formData.topic}
                onChange={(e) => setFormData({...formData, topic: e.target.value})}
              >
                {topics.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <span className="flex items-center gap-2"><Calendar size={16} /> Preferred Date</span>
                </label>
                <input 
                  type="date" 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" 
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <span className="flex items-center gap-2"><Clock size={16} /> Preferred Time</span>
                </label>
                <input 
                  type="time" 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" 
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                />
              </div>
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <AlertCircle size={16} />
                <span>Failed to submit request. Please try again.</span>
              </div>
            )}

            <button 
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-70"
            >
              {status === 'submitting' ? 'Submitting...' : 'Confirm Request'}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;