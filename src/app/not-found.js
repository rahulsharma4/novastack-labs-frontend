import React from 'react';
import { ArrowRight, HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300 relative">
      
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-sm flex flex-col items-center gap-6">
        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
          <HelpCircle className="h-3.5 w-3.5" /> Page Not Found
        </span>

        <h1 className="text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">404</h1>

        <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
          The requested system node could not be resolved. The page may have been moved, renamed, or temporarily offline.
        </p>

        <a
          href="/"
          className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-650 hover:to-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-indigo-500/10 flex items-center justify-center gap-1.5"
        >
          Return to Hub <ArrowRight className="h-4 w-4" />
        </a>
      </div>

    </div>
  );
}
