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
    <div className="animate-in fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm duration-200">
      <div className="relative flex w-full max-w-[500px] flex-col items-center rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 cursor-pointer rounded-full bg-white/5 p-2 text-muted transition-colors hover:bg-white/10 hover:text-foreground"
        >
          <FaTimes size={18} />
        </button>

        <h3 className="mt-4 mb-2 text-center text-2xl font-bold text-foreground">
          Newsletter
        </h3>
        <p className="mb-6 text-center text-sm text-muted">
          Get our latest insights straight to your inbox.
        </p>

        <div className="flex w-full justify-center">
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
