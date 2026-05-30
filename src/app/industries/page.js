'use client';

import React from 'react';
import { HeartPulse, Banknote, GraduationCap, ShoppingBag, Truck, Building, Factory, Landmark } from 'lucide-react';

export default function Industries() {
  const industries = [
    { name: 'Healthcare', icon: HeartPulse, desc: 'HIPAA compliant patient booking platforms, EHR indexes, and AI-assisted clinical dashboards.', solution: 'We encrypt database records in transit and rest, guaranteeing 100% data security.' },
    { name: 'Finance & Fintech', icon: Banknote, desc: 'Real-time asset trackers, stock transaction logs, WebSockets streams, and invoice systems.', solution: 'We configure low-latency PostgreSQL indexes to process transactions under 200ms.' },
    { name: 'Education & LMS', icon: GraduationCap, desc: 'Multi-classroom LMS portals, proctored exam sheets, automated results cards, and student calendars.', solution: 'We scale databases to support over 50,000 concurrent students without system downtime.' },
    { name: 'E-commerce', icon: ShoppingBag, desc: 'Headless storefront checkouts, multi-currency cart modules, Stripe gates, and supplier sync tools.', solution: 'We use headless Next.js configurations to reduce mobile cart abandonment rates by 35%.' },
    { name: 'Logistics & IoT', icon: Truck, desc: 'Fleet GPS monitors, fuel consumption gauges, automated route sheets, and dispatch logs.', solution: 'We compile real-time telemetry inputs into clean visual maps to optimize travel runs.' },
    { name: 'Real Estate', icon: Building, desc: 'Broker portals, tenant invoicing logs, active property filters, and appointment schedulers.', solution: 'We sync property inputs across portals to eliminate double booking errors completely.' },
    { name: 'Manufacturing', icon: Factory, desc: 'Industrial IoT monitoring, factory downtime warnings, PLC trackers, and yield reports.', solution: 'We parse live telemetry sensors parameters to flag machine failures before they trigger shutdowns.' },
    { name: 'Government & Legal', icon: Landmark, desc: 'Secure document portals, audit log sheets, digital document indexing, and user access levels.', solution: 'We build strict document search indices to cut retrieval times from minutes to seconds.' }
  ];

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[150px] -right-[150px] w-[450px] h-[450px] rounded-full bg-indigo-500/10 blur-3xl"></div>
      </div>

      {/* Header section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <span className="text-[10px] font-bold text-indigo-550 dark:text-emerald-400 uppercase tracking-widest block mb-3">Target Sectors</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Domain-Specific Software Solutions</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          We combine software engineering expertise with deep domain knowledge to construct platforms that address specific operational friction points.
        </p>
      </section>

      {/* Industries Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="p-6 border border-slate-200 dark:border-slate-850 bg-slate-50/20 dark:bg-slate-900/20 rounded-3xl hover:border-indigo-500/40 transition-colors"
            >
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ind.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-md font-bold text-slate-900 dark:text-white mb-2">{ind.name}</h3>
                  <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed mb-4">{ind.desc}</p>
                  
                  <div className="p-4 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl">
                    <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Our Resolution:</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{ind.solution}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
