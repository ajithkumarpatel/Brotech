
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useInvoices } from '../services/hooks';

const InvoicesPage: React.FC = () => {
  const { data: invoices, loading } = useInvoices();

  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/portal" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Portal
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Invoices & Billing</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">View payment history and download receipts.</p>
             </div>
             <div className="bg-blue-50 dark:bg-blue-900/30 px-6 py-3 rounded-xl border border-blue-100 dark:border-blue-800">
                <span className="text-sm text-slate-500 dark:text-slate-400 block">Total Outstanding</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">$2,500.00</span>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
           <div className="dark:text-white">Loading Invoices...</div>
        ) : (
           <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
                       <tr>
                          <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide">Invoice</th>
                          <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide">Date</th>
                          <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide">Amount</th>
                          <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide">Status</th>
                          <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                       {invoices.map((invoice, idx) => (
                          <motion.tr 
                             key={invoice.id}
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: idx * 0.05 }}
                             className="hover:bg-gray-50 dark:hover:bg-slate-750 transition-colors"
                          >
                             <td className="px-6 py-4">
                                <div className="font-medium text-slate-900 dark:text-white">{invoice.description}</div>
                                <div className="text-xs text-slate-500">{invoice.invoiceNumber}</div>
                             </td>
                             <td className="px-6 py-4 text-slate-600 dark:text-slate-300 text-sm">
                                {new Date(invoice.date).toLocaleDateString()}
                             </td>
                             <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                                {invoice.amount}
                             </td>
                             <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                                   invoice.status === 'Paid' 
                                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                      : invoice.status === 'Overdue'
                                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                }`}>
                                   {invoice.status === 'Paid' && <CheckCircle size={12} />}
                                   {invoice.status === 'Pending' && <Clock size={12} />}
                                   {invoice.status === 'Overdue' && <AlertCircle size={12} />}
                                   {invoice.status}
                                </span>
                             </td>
                             <td className="px-6 py-4">
                                <a 
                                   href={invoice.downloadUrl || '#'}
                                   className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                                >
                                   <Download size={14} /> Download PDF
                                </a>
                             </td>
                          </motion.tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default InvoicesPage;
