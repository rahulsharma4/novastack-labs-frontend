'use client';

import React, { useState } from 'react';
import { Check, Info, HelpCircle, ArrowRight, X } from 'lucide-react';

export default function Pricing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', projectDesc: '', budget: '$10,000 - $25,000' });
  const [submitted, setSubmitted] = useState(false);

  const packages = [
    {
      name: 'Starter Suite',
      price: '$15,000',
      desc: 'Ideal for early startups needing custom landing portals or mobile mvps.',
      features: ['Headless website build (Next.js)', '1 custom mobile or web dashboard page', 'Standard PostgreSQL/MongoDB integration', 'Lighthouse optimization check', 'Git source repository handover']
    },
    {
      name: 'Business Suite',
      price: '$35,000',
      desc: 'Perfect for mid-size teams looking to deploy custom SaaS apps or CRM modules.',
      features: ['Full SaaS application with App Router', 'Dynamic tenant database isolation schema', 'Stripe checkout subscription module', 'Docker container setup configs', 'Priority support maintenance (30 days)']
    },
    {
      name: 'Enterprise Hub',
      price: '$75,000+',
      desc: 'Designed for corporate environments requiring secure ERP integrations.',
      features: ['Enterprise ERP system custom-built', 'HIPAA compliance audit security checks', 'Full Vector index AI agent integration', 'VPS load-balancing Nginx orchestration', 'Priority SLA support maintenance (1 year)']
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
      setSubmitted(false);
      setFormData({ name: '', email: '', projectDesc: '', budget: '$10,000 - $25,000' });
    }, 2000);
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[150px] -right-[150px] w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-3xl"></div>
      </div>

      {/* Header section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <span className="text-[10px] font-bold text-emerald-555 uppercase tracking-widest block mb-3">Our Packages</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Transparent Project Pricing</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Select an engineering package matched to your requirements, or book a meeting to compile a custom service proposal.
        </p>
      </section>

      {/* Pricing Cards Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <div
              key={pkg.name}
              className={`p-6 border rounded-3xl bg-slate-50/20 dark:bg-slate-900/20 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                idx === 1
                  ? 'border-indigo-500/80 shadow-indigo-500/10 shadow-lg dark:border-emerald-500/80 dark:shadow-emerald-500/5'
                  : 'border-slate-200 dark:border-slate-850'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">{pkg.name}</h3>
                  {idx === 1 && (
                    <span className="px-2.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-indigo-500/10 dark:bg-emerald-500/10 text-indigo-500 dark:text-emerald-400 border border-indigo-550/20 dark:border-emerald-500/20">Popular</span>
                  )}
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{pkg.price}</span>
                  <span className="text-[10px] text-slate-400 font-medium ml-1">/ project start</span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed mb-6 border-b border-slate-100 dark:border-slate-850 pb-4">
                  {pkg.desc}
                </p>

                <div className="flex flex-col gap-3">
                  {pkg.features.map((f) => (
                    <div key={f} className="flex gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span className="text-[11px] text-slate-755 dark:text-slate-350">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setModalOpen(true)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none ${
                    idx === 1
                      ? 'bg-gradient-to-r from-indigo-500 to-emerald-500 text-white'
                      : 'bg-slate-905 dark:bg-slate-800 text-white dark:hover:bg-slate-700 hover:bg-slate-800'
                  }`}
                >
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Dialog Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Request Custom Project Quote</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>

            {submitted ? (
              <div className="p-12 text-center flex flex-col items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">✓</div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Proposal Request Logged</h4>
                <p className="text-xs text-slate-500">We will review your project details and respond via email within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. rahul@company.com"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">Project Scope Summary</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.projectDesc}
                    onChange={(e) => setFormData({ ...formData, projectDesc: e.target.value })}
                    placeholder="Briefly summarize database integrations, visual requirements, page count..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">Expected Budget Tier</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-202 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                    <option value="$100,000+">$100,000+</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="mt-2 py-3 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Send Proposal Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
