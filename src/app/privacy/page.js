import React from 'react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-6">Privacy Policy</h1>
      
      <p className="mb-4"><strong>Effective Date: June 1, 2026</strong></p>
      
      <p className="mb-6">
        At NovaStack Labs, protecting your corporate and user data is our highest priority. This Privacy Policy details how we collect, process, and protect your information.
      </p>

      <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mt-6 mb-3">1. Information Collection</h2>
      <p className="mb-4">
        We collect name, corporate email address, project descriptions, and expected budgets submitted via our contact forms. We also gather anonymous performance logs via site cookies to measure largest contentful paints and browser load metrics.
      </p>

      <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mt-6 mb-3">2. Data Security Protocols</h2>
      <p className="mb-4">
        All client data is isolated using strict access control lists. We enforce secure SSL channels for all network traffic and host databases in encrypted Atlas clusters behind VPC configurations.
      </p>

      <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mt-6 mb-3">3. Sharing of Information</h2>
      <p className="mb-4">
        NovaStack Labs does not sell or distribute your project details or corporate contact info to third-party marketing companies. Data is shared only with certified cloud providers (AWS, DigitalOcean) required to build and test your apps.
      </p>

      <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mt-6 mb-3">4. Your Rights</h2>
      <p className="mb-4">
        You retain the right to inspect, edit, or delete any active corporate information stored in our contact systems by sending an email request to privacy@novastacklabs.com.
      </p>
    </div>
  );
}

