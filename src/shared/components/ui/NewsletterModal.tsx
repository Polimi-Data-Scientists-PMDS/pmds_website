'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  embedUrl?: string;
}

export default function NewsletterModal({
  isOpen,
  onClose,
  title = 'Newsletter',
  description = 'Get our latest insights straight to your inbox.',
  embedUrl = 'https://pmds.substack.com/embed?transparent=1&light=1',
}: NewsletterModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[500px] bg-[#0e0e12] border border-white/10 rounded-3xl p-6 relative flex flex-col items-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="cursor-pointer absolute top-4 right-4 text-muted hover:text-foreground transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full"
        >
          <FaTimes size={16} />
        </button>

        <h3 className="text-2xl font-bold text-foreground mb-2 mt-4 text-center">
          {title}
        </h3>
        <p className="text-muted text-sm mb-6 text-center">
          {description}
        </p>

        <div className="w-full flex justify-center">
          <iframe
            src={embedUrl}
            width="100%"
            height="320"
            style={{ border: 0, background: 'transparent' }}
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
      </div>
    </div>,
    document.body,
  );
}
