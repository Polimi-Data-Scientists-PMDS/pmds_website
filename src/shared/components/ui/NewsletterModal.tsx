'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import Button from './Button';

const emptySubscribe = () => () => {};

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
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

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
      className="animate-in fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-[500px] flex-col items-center gap-4 rounded-3xl border border-white/10 bg-[#0e0e12] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={onClose}
          aria-label="Close modal"
          variant="ghost"
          size="icon"
        >
          <FaTimes size={16} />
        </Button>

        <div className="flex flex-col gap-2 pb-2">
          <h3 className="text-center type-title text-foreground">{title}</h3>
          <p className="text-center type-body text-foreground-secondary">
            {description}
          </p>
        </div>

        <div className="flex w-full justify-center">
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
