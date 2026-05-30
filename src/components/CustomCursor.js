'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Disable on mobile/touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const mMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const mLeave = () => setHidden(true);
    const mDown = () => setClicked(true);
    const mUp = () => setClicked(false);

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, select, input, textarea, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };

    window.addEventListener('mousemove', mMove);
    document.addEventListener('mouseleave', mLeave);
    window.addEventListener('mousedown', mDown);
    window.addEventListener('mouseup', mUp);

    // Call hover listener assignment
    addHoverListeners();

    // Re-assign on DOM mutations (e.g., dynamic page loading)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', mMove);
      document.removeEventListener('mouseleave', mLeave);
      window.removeEventListener('mousedown', mDown);
      window.removeEventListener('mouseup', mUp);
      observer.disconnect();
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Outer follow circle */}
      <div
        className={`fixed pointer-events-none z-50 rounded-full border border-emerald-500/60 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out hidden md:block ${
          clicked ? 'h-5 w-5 bg-emerald-500/10' : hovered ? 'h-10 w-10 bg-emerald-500/5 border-emerald-400' : 'h-8 w-8'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      {/* Inner dot */}
      <div
        className="fixed pointer-events-none z-50 h-1.5 w-1.5 rounded-full bg-emerald-400 -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}
