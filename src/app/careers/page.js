'use client';

import React, { useState } from 'react';
import { jobsData, benefitsData } from '../../data/careersData';
import { Briefcase, MapPin, DollarSign, Clock, X, Paperclip } from 'lucide-react';

export default function Careers() {
  const [activeJob, setActiveJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', resume: '' });

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiBase}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          jobTitle: activeJob?.title || 'General Application'
        })
      });
      if (res.ok) {
        setApplied(true);
        setFormData({ name: '', email: '', resume: '' });
        setTimeout(() => {
          setApplied(false);
          setActiveJob(null);
        }, 3000);
      }
    } catch (err) {
      console.error('Failed to submit application:', err);
    }
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[150px] -right-[150px] w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-3xl"></div>
      </div>

      {/* Header section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-3">Join NovaStack</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Build the Future of Digital Scale</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          We operate as a global remote-first team of senior architects and visual designers. View our open roles and package benefits.
        </p>
      </section>

      {/* Benefits section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-10 border-b border-slate-100 dark:border-slate-900 mb-10">
        <div className="text-center mb-12">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider">Corporate Benefits</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefitsData.map((b) => (
            <div key={b.title} className="p-5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/20 dark:bg-slate-900/10">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">{b.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions Grid */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-4 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider">Open Roles</h2>
        </div>

        <div className="flex flex-col gap-6">
          {jobsData.map((job) => (
            <div
              key={job.id}
              className="p-6 border border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/10 dark:bg-slate-900/5 hover:border-emerald-500/40 transition-colors flex flex-col md:flex-row justify-between gap-6"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{job.title}</h3>
                  <span className="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-500">{job.department}</span>
                </div>

                <div className="flex gap-4 text-[10px] text-slate-400 mb-4 flex-wrap">
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {job.type}</span>
                  <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" /> {job.salary}</span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="shrink-0 flex items-center">
                <button
                  onClick={() => setActiveJob(job)}
                  className="w-full md:w-auto px-6 py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form Modal */}
      {activeJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Application Intake</span>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mt-1">{activeJob.title}</h3>
              </div>
              <button onClick={() => setActiveJob(null)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>

            {applied ? (
              <div className="p-12 text-center flex flex-col items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">✓</div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Application Logged</h4>
                <p className="text-xs text-slate-500">Our HR coordinator will review your profile details and respond back via email.</p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="p-6 flex flex-col gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">Full Name</label>
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
                  <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">Resume Link (PDF / Drive)</label>
                  <input
                    type="url"
                    required
                    value={formData.resume}
                    onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                    placeholder="e.g. https://drive.google.com/..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 py-3 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Send Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

