'use client';

import { useEffect, useRef } from 'react';

// 1. Superposition & Quantum Wave Packet Mini Visualizer
export function SuperpositionWaveMini() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const size = 56;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const render = () => {
      time += 0.04;
      ctx.clearRect(0, 0, size, size);

      const cy = size / 2;

      // Glow behind
      const grad = ctx.createRadialGradient(size / 2, cy, 2, size / 2, cy, 24);
      grad.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(size / 2, cy, 24, 0, Math.PI * 2);
      ctx.fill();

      // Dual interfering quantum wave packet
      ctx.beginPath();
      for (let x = 4; x <= size - 4; x += 2) {
        const normX = (x - size / 2) / (size / 2);
        const envelope = Math.exp(-normX * normX * 3); // Gaussian envelope
        const y = cy + Math.sin(normX * 8 - time * 2.5) * 12 * envelope;
        if (x === 4) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Secondary out-of-phase wave
      ctx.beginPath();
      for (let x = 4; x <= size - 4; x += 2) {
        const normX = (x - size / 2) / (size / 2);
        const envelope = Math.exp(-normX * normX * 3);
        const y = cy + Math.sin(normX * 8 + time * 2.5 + Math.PI) * 9 * envelope;
        if (x === 4) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.5)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Central superposition probability node
      const centerPulse = 1 + Math.sin(time * 3) * 0.3;
      ctx.beginPath();
      ctx.arc(size / 2, cy, 3 * centerPulse, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="w-14 h-14 rounded-2xl bg-[#080808] border border-cyan-500/30 flex items-center justify-center relative overflow-hidden shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
      <canvas ref={canvasRef} style={{ width: 56, height: 56 }} />
    </div>
  );
}

// 2. QML Optimization & Variational Loss Surface Mini Visualizer
export function QmlLandscapeMini() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const size = 56;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    // Trail history of past positions for smooth comet tail
    const trail: { x: number; y: number }[] = [];
    const maxTrail = 14;

    const render = () => {
      time += 0.032;
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2 + 1;

      // Concentric 3D contour rings (variational loss landscape)
      for (let r = 18; r >= 6; r -= 4) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.52, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.14 + (18 - r) * 0.035})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Continuous harmonic parameter exploration (no jumping, smooth periodic orbital)
      const curRadius = 11 + Math.sin(time * 1.6) * 5;
      const angle = time * 2.2;
      const dotX = cx + Math.cos(angle) * curRadius;
      const dotY = cy + Math.sin(angle) * (curRadius * 0.52);

      trail.unshift({ x: dotX, y: dotY });
      if (trail.length > maxTrail) trail.pop();

      // Smooth decaying trail
      if (trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length; i++) {
          ctx.lineTo(trail[i].x, trail[i].y);
        }
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      // Parameter dot (theta)
      ctx.beginPath();
      ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Minimum ground state target (global minimum)
      const minPulse = 1 + Math.sin(time * 2.5) * 0.2;
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5 * minPulse, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#60a5fa';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="w-14 h-14 rounded-2xl bg-[#080808] border border-blue-500/30 flex items-center justify-center relative overflow-hidden shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
      <canvas ref={canvasRef} style={{ width: 56, height: 56 }} />
    </div>
  );
}

// 3. Superconducting Transmon Qubit & Resonator Mini Visualizer
export function TransmonQubitMini() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const size = 56;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const render = () => {
      time += 0.035;
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;

      // Expanding microwave control pulse waves (XY drive)
      for (let i = 0; i < 3; i++) {
        const pulse = (time * 0.7 + i * 0.33) % 1;
        const r = 6 + pulse * 20;
        const alpha = (1 - pulse) * 0.35;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Transmon island cross capacitor plates
      ctx.fillStyle = '#818cf8';
      ctx.shadowColor = '#6366f1';
      ctx.shadowBlur = 6;
      // Horizontal bar
      ctx.fillRect(cx - 9, cy - 2, 18, 4);
      // Vertical bar
      ctx.fillRect(cx - 2, cy - 9, 4, 18);
      ctx.shadowBlur = 0;

      // Josephson junction center core
      const coreFlash = 1 + Math.sin(time * 4) * 0.25;
      ctx.beginPath();
      ctx.arc(cx, cy, 3 * coreFlash, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#a5b4fc';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="w-14 h-14 rounded-2xl bg-[#080808] border border-indigo-500/30 flex items-center justify-center relative overflow-hidden shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
      <canvas ref={canvasRef} style={{ width: 56, height: 56 }} />
    </div>
  );
}

// 4. Entangled Bell Pair & Quantum Spin Mini Visualizer
export function EntangledPairMini() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const size = 56;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const render = () => {
      time += 0.04;
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;
      const orbitR = 14;

      // Two entangled particles orbiting in an elliptical plane
      const p1X = cx + Math.cos(time * 2) * orbitR;
      const p1Y = cy + Math.sin(time * 2) * (orbitR * 0.6);
      const p2X = cx - Math.cos(time * 2) * orbitR;
      const p2Y = cy - Math.sin(time * 2) * (orbitR * 0.6);

      // Shimmering entanglement connection thread
      ctx.beginPath();
      ctx.moveTo(p1X, p1Y);
      const midX = cx + Math.sin(time * 6) * 4;
      const midY = cy + Math.cos(time * 6) * 3;
      ctx.quadraticCurveTo(midX, midY, p2X, p2Y);
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.65)';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Particle 1 (|0> or spin up)
      ctx.beginPath();
      ctx.arc(p1X, p1Y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#06b6d4';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Particle 2 (|1> or spin down)
      ctx.beginPath();
      ctx.arc(p2X, p2Y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#c084fc';
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="w-14 h-14 rounded-2xl bg-[#080808] border border-purple-500/30 flex items-center justify-center relative overflow-hidden shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
      <canvas ref={canvasRef} style={{ width: 56, height: 56 }} />
    </div>
  );
}
