'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 z-45 p-3 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white shadow-lg backdrop-blur-md hover:bg-slate-800 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
      aria-label="Back to Top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
