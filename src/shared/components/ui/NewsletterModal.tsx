'use client';

import { FaTimes } from 'react-icons/fa';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsletterModal({
  isOpen,
  onClose,
}: NewsletterModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-[500px] bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 relative flex flex-col items-center shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="cursor-pointer absolute top-4 right-4 text-muted hover:text-foreground transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full"
        >
          <FaTimes size={18} />
        </button>

        <h3 className="text-2xl font-bold text-foreground mb-2 mt-4 text-center">
          Newsletter
        </h3>
        <p className="text-muted text-sm mb-6 text-center">
          Get our latest insights straight to your inbox.
        </p>

        <div className="w-full flex justify-center">
          <iframe
            src="https://pmds.substack.com/embed?transparent=1&light=1"
            width="100%"
            height="320"
            style={{ border: 0, background: 'transparent' }}
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
