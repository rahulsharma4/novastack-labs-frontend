import React from 'react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-xs leading-relaxed text-slate-655 dark:text-slate-400">
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-6">Terms & Conditions</h1>
      
      <p className="mb-4"><strong>Effective Date: June 1, 2026</strong></p>
      
      <p className="mb-6">
        Welcome to NovaStack Labs. These Terms and Conditions outline the rules and regulations for the use of our software engineering services and web portal assets.
      </p>

      <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mt-6 mb-3">1. Scope of Services</h2>
      <p className="mb-4">
        NovaStack Labs provides bespoke software development, web applications design, SaaS architectures, cloud deployment, and system maintenance. Specific project scopes, features lists, and delivery timelines are governed by individual Service Level Agreements (SLA).
      </p>

      <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mt-6 mb-3">2. Intellectual Property (IP)</h2>
      <p className="mb-4">
        Upon full payment of all project invoices, NovaStack Labs transfers full ownership, copyrights, and git repository contents directly to the client. NovaStack Labs retains the right to display project visual highlights in our corporate portfolio unless governed by a specific NDA.
      </p>

      <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mt-6 mb-3">3. Payment & Invoicing</h2>
      <p className="mb-4">
        Projects are invoiced in milestone tiers (e.g. 30% discovery, 40% development, 30% deployment) as detailed in the SLA. Late payments exceeding 15 business days may result in system build schedule delays or temporary server environment pauses.
      </p>

      <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mt-6 mb-3">4. Limitation of Liability</h2>
      <p className="mb-4">
        NovaStack Labs is not liable for indirect, incidental, or consequential damages (including lost profits or server outages) arising from client operations post-deployment.
      </p>
    </div>
  );
}
