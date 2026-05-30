'use client';

import React from 'react';
import { MessageSquareCode } from 'lucide-react';

export default function WhatsAppButton() {
  const handleChat = () => {
    // Open WhatsApp link with prefilled consultation text
    const phoneNumber = '+919999999999'; // Dummy number
    const message = encodeURIComponent('Hello NovaStack Labs, I would like to book a free consultation for my software project.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleChat}
      className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping group-hover:animate-none"></div>
      <MessageSquareCode className="h-6 w-6 relative z-10" />
    </button>
  );
}

