import React from 'react';

const LegalLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white dark:bg-slate-900 min-h-screen py-20 transition-colors">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">{title}</h1>
      <div className="prose prose-slate dark:prose-invert">
        {children}
      </div>
    </div>
  </div>
);

export const PrivacyPage: React.FC = () => (
  <LegalLayout title="Privacy Policy">
    <p>Last updated: {new Date().toLocaleDateString()}</p>
    <h3>1. Information We Collect</h3>
    <p>We collect information you provide directly to us, such as when you fill out a form, request a quote, or apply for a job.</p>
    <h3>2. How We Use Information</h3>
    <p>We use the information we collect to provide, maintain, and improve our services.</p>
  </LegalLayout>
);

export const TermsPage: React.FC = () => (
  <LegalLayout title="Terms of Service">
    <p>Last updated: {new Date().toLocaleDateString()}</p>
    <h3>1. Acceptance of Terms</h3>
    <p>By accessing this website, you agree to be bound by these Terms of Service.</p>
    <h3>2. Use License</h3>
    <p>Permission is granted to temporarily download one copy of the materials on Brotech WebSolutions' website for personal, non-commercial transitory viewing only.</p>
  </LegalLayout>
);