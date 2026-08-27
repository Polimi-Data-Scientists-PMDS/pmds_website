'use client';

import { useState, useEffect } from 'react';
import { FaTimes, FaRocket } from 'react-icons/fa';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if user hasn't dismissed it
    const dismissed = localStorage.getItem('pmds-recruiting-dismissed');
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  const dismiss = () => {
    setIsVisible(false);
    localStorage.setItem('pmds-recruiting-dismissed', 'true');
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#4b6ffe] to-indigo-600 px-4 py-2 flex items-center justify-center relative z-50 shadow-md">
      <div className="flex items-center gap-2 text-white text-sm font-semibold">
        <FaRocket className="text-white/80" />
        <span>Spring Recruiting is OPEN! Join our team today.</span>
        <a 
          href="https://forms.gle/your-form-link" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="ml-2 underline underline-offset-2 hover:text-white/80 transition-colors"
        >
          Apply Now
        </a>
      </div>
      <button 
        onClick={dismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-1 transition-colors"
        aria-label="Dismiss announcement"
      >
        <FaTimes size={14} />
      </button>
    </div>
  );
}
