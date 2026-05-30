'use client';

import React from 'react';
import { Search, Map, Eye, Code, ShieldCheck, Cloud, Settings } from 'lucide-react';

export default function Process() {
  const steps = [
    { title: 'Discovery', desc: 'We audit your active workflows, map system inputs, outline data integrations, and identify system friction points.', icon: Search },
    { title: 'Planning', desc: 'We select database models (e.g. MongoDB, PostgreSQL), compile tech stacks, write API specs, and construct user journey guides.', icon: Map },
    { title: 'UI/UX Design', desc: 'We design high-fidelity interactive wireframes in Figma to match visual standards, outlining micro-interactions and cursors.', icon: Eye },
    { title: 'Development', desc: 'We write modular, scale-ready JavaScript backend services and Next.js frontend pages integrated with database hooks.', icon: Code },
    { title: 'Testing', desc: 'We run end-to-end integration checks, verify CORS pipelines, perform database stress trials, and check mobile layouts.', icon: ShieldCheck },
    { title: 'Cloud Deployment', desc: 'We package the apps inside Docker, setup PM2 managers on VPS servers, map reverse proxies (Nginx), and deploy.', icon: Cloud },
    { title: 'Maintenance', desc: 'We monitor server uptime 24/7, perform database optimization queries, and install security package patches.', icon: Settings }
  ];

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[150px] -right-[150px] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-indigo-500/10 to-emerald-500/10 blur-3xl"></div>
      </div>

      {/* Header section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <span className="text-[10px] font-bold text-indigo-550 dark:text-emerald-400 uppercase tracking-widest block mb-3">Our Lifecycle</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Engineering Delivery Process</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          How we take digital concepts from technical discovery through to secure edge hosting VPS deployment.
        </p>
      </section>

      {/* Process list */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-12 mb-20">
        <div className="flex flex-col gap-10">
          {steps.map((step, idx) => (
            <div key={step.title} className="flex gap-6 relative group">
              {/* Timeline Connector Line */}
              {idx !== steps.length - 1 && (
                <div className="absolute top-10 left-5 bottom-[-40px] w-[1px] bg-slate-200 dark:bg-slate-850"></div>
              )}
              
              {/* Step indicator */}
              <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 text-slate-900 dark:text-white font-bold text-xs relative z-10 group-hover:border-emerald-500 transition-colors">
                {idx + 1}
              </div>

              {/* Step detail card */}
              <div className="flex-1 p-5 border border-slate-205 dark:border-slate-850 rounded-2xl bg-slate-50/30 dark:bg-slate-900/10 flex flex-col sm:flex-row gap-4 items-start group-hover:border-indigo-500/30 transition-colors">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950 text-indigo-500 dark:text-emerald-400">
                  <step.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">{step.title}</h3>
                  <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
