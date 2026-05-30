'use client';

import React, { useState } from 'react';
import { Mail, PhoneCall, Calendar, MapPin, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiBase}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (err) {
      console.error('Failed to submit contact:', err);
    }
  };

  const [selectedDate, setSelectedDate] = useState({ day: 'Wed', num: 3 });
  const [selectedSlot, setSelectedSlot] = useState('11:30 AM');
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail) return;
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiBase}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bookingName,
          email: bookingEmail,
          subject: 'Consultation Call Booking',
          message: `Consultation call scheduled for ${selectedDate.day}, June ${selectedDate.num} (2026) at ${selectedSlot}`
        })
      });
      if (res.ok) {
        setBookingSubmitted(true);
        setBookingName('');
        setBookingEmail('');
        setTimeout(() => setBookingSubmitted(false), 5000);
      }
    } catch (err) {
      console.error('Failed to submit booking:', err);
    }
  };

  const dates = [
    { day: 'Mon', num: 1 },
    { day: 'Tue', num: 2 },
    { day: 'Wed', num: 3 },
    { day: 'Thu', num: 4 },
    { day: 'Fri', num: 5 }
  ];

  const slots = ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'];

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[150px] -right-[150px] w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-3xl"></div>
      </div>

      {/* Header section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-3">Reach Out</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Let&rsquo;s Build Together</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Book a direct workspace consultation or submit an inquiry using our secure form below.
        </p>
      </section>

      {/* Form and Calendar Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-6 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Panel: Contact Form */}
          <div className="p-6 border border-slate-200 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/10 rounded-3xl">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">Send a Message</h2>
            
            {submitted ? (
              <div className="p-12 text-center flex flex-col items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">✓</div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Message Logged</h4>
                <p className="text-xs text-slate-500">We have recorded your details and will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. rahul@company.com"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Custom SaaS Development"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Outline your project scope, timeline requirements, database size..."
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 py-3 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.99]"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Right Panel: Calendar Scheduling Booking */}
          <div className="p-6 border border-slate-200 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/10 rounded-3xl flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-emerald-500" /> Book Consultation Call
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                Pick a slot to discuss system integrations directly with our Chief Architect Elena Rostova.
              </p>

              {/* Date pickers */}
              <div className="mb-6">
                <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400 mb-2">Select Date (June 2026)</span>
                <div className="grid grid-cols-5 gap-2 text-center text-xs">
                  {dates.map((d) => (
                    <button
                      key={d.num}
                      type="button"
                      onClick={() => setSelectedDate(d)}
                      className={`p-3 border rounded-xl flex flex-col items-center gap-1 transition-all ${
                        selectedDate.num === d.num
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 font-bold'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-950'
                      }`}
                    >
                      <span className="block text-[9px] text-slate-400 uppercase font-semibold">{d.day}</span>
                      <span className="block font-bold">{d.num}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots pickers */}
              <div className="mb-6">
                <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400 mb-2">Available Slots</span>
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  {slots.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSlot(s)}
                      className={`py-2 px-3 border rounded-xl font-bold transition-all ${
                        selectedSlot === s
                          ? 'border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-450'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-950'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Consultation Contact Input Form */}
            <div className="mt-4 p-4 bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-2xl flex flex-col gap-3">
              {bookingSubmitted ? (
                <div className="py-6 text-center flex flex-col items-center gap-1">
                  <CheckCircle className="h-6 w-6 text-emerald-500" />
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-900 dark:text-white mt-1">Slot Reserved!</span>
                  <p className="text-[10px] text-slate-500">Elena will meet you on {selectedDate.day}, June {selectedDate.num} at {selectedSlot}.</p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="flex flex-col gap-3">
                  <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400">Your Booking Info</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      placeholder="Name"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="email"
                      required
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-650 hover:to-emerald-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-1"
                  >
                    Confirm Consultation Slot
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

