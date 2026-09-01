'use client';

import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export default function Confetti() {
  useEffect(() => {
    const duration = 2500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#4b6ffe', '#ffffff', '#a3b8ff', '#25D366']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#4b6ffe', '#ffffff', '#a3b8ff', '#25D366']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    // Slight delay so it fires after the page fully renders
    setTimeout(() => {
      frame();
    }, 300);
  }, []);

  return null;
}
