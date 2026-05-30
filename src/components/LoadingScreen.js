'use client';

import { useState, useEffect } from 'react';
import Logo from './Logo';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 200);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${
        progress === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-6 max-w-xs w-full px-6">
        {/* Animated logo */}
        <div className="animate-pulse">
          <Logo className="h-16 w-auto" showText={false} />
        </div>

        {/* Brand Text */}
        <div className="text-center">
          <h2 className="text-lg font-bold tracking-widest text-white uppercase">
            NovaStack<span className="text-emerald-500">Labs</span>
          </h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Digital Scale Architect</p>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-full h-[2px] bg-slate-900 rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Counter */}
        <span className="text-xs font-mono text-slate-400 font-semibold">{progress}%</span>
      </div>
    </div>
  );
}
