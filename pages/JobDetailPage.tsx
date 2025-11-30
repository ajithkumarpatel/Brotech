import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCareers, submitJobApplication } from '../services/hooks';
import { ArrowLeft, MapPin, Clock, DollarSign, CheckCircle, UploadCloud, AlertCircle, FileText } from 'lucide-react';

// The Google Apps Script Web App URL provided
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxDyY4yB3bbSACdHyzSrkfAxKyL7-rLY-ZF1Y4ej3OYBZJDUpQMq4_mJZnVIecUC1eBjA/exec";

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: jobs, loading } = useCareers();
  const job = jobs.find(j => j.id === id);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (loading) return <div className="h-screen flex items-center justify-center dark:text-white">Loading...</div>;
  if (!job) return <div className="h-screen flex items-center justify-center dark:text-white">Job not found</div>;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage("Please upload your resume.");
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      // 1. Prepare FormData for Google Apps Script
      const scriptData = new FormData();
      scriptData.append('file', file);
      scriptData.append('name', formData.name);
      scriptData.append('email', formData.email);
      scriptData.append('phone', formData.phone);
      scriptData.append('jobTitle', job.title);
      scriptData.append('message', formData.message);

      // 2. Upload to Google Drive via Apps Script
      // Using mode: 'no-cors' because GAS often blocks cross-origin requests.
      // The request will succeed (uploading the file), but the response will be opaque.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: scriptData,
        mode: 'no-cors' 
      });

      // 3. Save application record to Firestore (for Admin Panel)
      // Since we can't get the file URL back easily from a no-cors request, 
      // we mark the resumeUrl as "Uploaded to Drive".
      const appRes = await submitJobApplication({ 
        jobId: job.id, 
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        resumeUrl: `Uploaded to Google Drive: ${file.name}`
      });

      if (appRes.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setFile(null);
      } else {
        throw new Error("Database save failed");
      }

    } catch (error) {
      console.error("Upload error:", error);
      setStatus('error');
      setErrorMessage("Failed to submit application. Please check your internet connection.");
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/careers" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8">
          <ArrowLeft size={16} className="mr-2" /> Back to Careers
        </Link>
        
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800 p-8 md:p-12 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">{job.title}</h1>
          <div className="flex flex-wrap gap-6 text-slate-600 dark:text-slate-400 mb-8 pb-8 border-b border-gray-100 dark:border-slate-800">
             <span className="flex items-center gap-2"><MapPin size={18} /> {job.location}</span>
             <span className="flex items-center gap-2"><Clock size={18} /> {job.type}</span>
             <span className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold"><DollarSign size={18} /> {job.salary}</span>
          </div>
          
          <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
            <h3 className="text-xl font-bold mb-4">About the Role</h3>
            <p className="whitespace-pre-wrap">{job.description}</p>
          </div>

          {/* Application Form */}
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 md:p-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Apply for this position</h3>
            
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <CheckCircle size={48} className="text-green-500 mb-4" />
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Application Received!</h4>
                <p className="text-slate-500 dark:text-slate-400">Your resume has been uploaded and we will be in touch shortly.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-blue-600 hover:text-blue-500 font-medium"
                >
                  Apply for another role
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                   <input 
                      required
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                   />
                </div>

                {/* Resume File Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Resume (PDF or DOC)</label>
                  <div className={`relative border-2 border-dashed rounded-lg p-6 transition-colors text-center ${
                      file ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'border-gray-300 dark:border-slate-600 hover:border-blue-500'
                  }`}>
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center pointer-events-none">
                      {file ? (
                        <>
                          <FileText size={32} className="text-green-600 dark:text-green-400 mb-2" />
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{file.name}</span>
                          <span className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                        </>
                      ) : (
                        <>
                          <UploadCloud size={32} className="text-slate-400 mb-2" />
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Click to upload or drag and drop</span>
                          <span className="text-xs text-slate-500 mt-1">PDF, DOC, DOCX up to 5MB</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cover Letter / Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? 'Uploading & Submitting...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;