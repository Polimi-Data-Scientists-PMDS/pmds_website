'use client';

import { useEffect, useRef } from 'react';

export default function QuantumVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // Smoothed physics coordinates for silky continuous motion
    const state = {
      x: 0,
      y: 0,
      r: 0,
      morph: 0,
      rotX: 0.32,
      rotY: 0.45,
      alpha: 1,
    };

    let targetCoords = {
      x: 0,
      y: 0,
      r: 0,
      morph: 0,
      rotX: 0.32,
      rotY: 0.45,
      alpha: 1,
    };

    // 44 Quantum Probability Nodes on spherical harmonics
    const particleCount = 44;
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      theta: (i / particleCount) * Math.PI,
      phi: i * 2.399963, // Golden angle spiral
      speed: 0.14 + (i % 5) * 0.05,
      size: 1.2 + (i % 3) * 0.7,
      rRatio: 0.92 + (i % 4) * 0.08,
      lobe: i % 2 === 0 ? 1 : -1,
    }));

    const updateAnchorTargets = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isLandscapePhone = h < 550 && w < 1024;
      const isMobile = w < 1024 || h < 550;

      // Locate real DOM layout anchors
      const heroEl = document.getElementById('pmqc-hero-anchor');
      const aboutEl = document.getElementById('pmqc-about-anchor');
      const actEl = document.getElementById('pmqc-activities-anchor');
      const ctaEl = document.getElementById('pmqc-cta-anchor');

      // Helper to get center of element in viewport coordinates
      const getCenter = (el: HTMLElement | null, fallbackX: number, fallbackY: number) => {
        if (!el) return { x: fallbackX, y: fallbackY, top: fallbackY };
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          top: rect.top,
        };
      };

      const heroPos = getCenter(heroEl, isMobile ? w * 0.5 : w * 0.72, h * 0.42);
      const aboutPos = getCenter(aboutEl, isMobile ? w * 0.5 : w * 0.72, h * 1.2);
      const ctaPos = getCenter(ctaEl, w * 0.5, h * 2.5);

      const hasAct = !!actEl;
      const actPos = hasAct
        ? getCenter(actEl, w * 0.5, h * 1.8)
        : null;

      const screenCenterY = h * 0.5;

      let p = 0; // 0: Hero, 1: About, 2: Activities, 3: CTA
      if (aboutPos.y > screenCenterY) {
        // Between Hero and About
        const dist = Math.max(100, aboutPos.y - heroPos.y);
        const t = Math.max(0, Math.min(1, 1 - (aboutPos.y - screenCenterY) / dist));
        const ease = t * t * (3 - 2 * t);
        p = ease;
      } else if (hasAct && actPos && actPos.y > screenCenterY) {
        // Between About and Activities
        const dist = Math.max(100, actPos.y - aboutPos.y);
        const t = Math.max(0, Math.min(1, 1 - (actPos.y - screenCenterY) / dist));
        const ease = t * t * (3 - 2 * t);
        p = 1.0 + ease;
      } else if (hasAct && actPos) {
        // Between Activities and CTA
        const dist = Math.max(100, ctaPos.y - actPos.y);
        const t = Math.max(0, Math.min(1, 1 - (ctaPos.y - screenCenterY) / dist));
        const ease = t * t * (3 - 2 * t);
        p = 2.0 + ease;
      } else {
        // No Activities: directly Between About and CTA
        const dist = Math.max(100, ctaPos.y - aboutPos.y);
        const t = Math.max(0, Math.min(1, 1 - (ctaPos.y - screenCenterY) / dist));
        const ease = t * t * (3 - 2 * t);
        p = 1.0 + ease * 2.0; // scale directly to 3.0
      }

      // Interpolate targets based on continuous milestone p (0.0 to 3.0)
      let destX = heroPos.x;
      let destY = heroPos.y;
      let destR = Math.min(w, h) * (isMobile ? (isLandscapePhone ? 0.38 : 0.35) : 0.22);
      let destMorph = isMobile ? 1.2 : 0.0;
      let destRotX = isMobile ? 0.5 : 0.32;
      let destRotY = isMobile ? 0.8 : 0.45;
      let destAlpha = isMobile ? (isLandscapePhone ? 0.22 : 0.28) : 1.0;

      if (isMobile) {
        // MOBILE / LANDSCAPE: Starts ALREADY destructured as an atmospheric background right from the top!
        // No rigid Bloch sphere, no awkward stacking. Pure soft quantum wave field.
        const startY = isLandscapePhone ? Math.min(h * 0.48, 190) : Math.min(h * 0.36, 260);
        destX = w * 0.5;
        destR = Math.min(w, h) * (isLandscapePhone ? 0.38 : 0.36);
        const heroAlpha = isLandscapePhone ? 0.22 : 0.28;

        if (p <= 1.0) {
          // Hero -> About
          const t = p;
          destY = startY + (aboutPos.y - startY) * t;
          destMorph = 1.2 + t * 0.4; // 1.2 -> 1.6
          destRotX = 0.5 + t * 0.25;
          destRotY = 0.8 + t * 0.8;
          destAlpha = heroAlpha * (1 - t) + 0.20 * t;
        } else if (p <= 2.0) {
          // About -> Activities
          const t = p - 1.0;
          const nextY = actPos ? actPos.y : (aboutPos.y + ctaPos.y) * 0.5;
          destY = aboutPos.y + (nextY - aboutPos.y) * t;
          destMorph = 1.6 + t * 0.6; // 1.6 -> 2.2
          destRotX = 0.75 + t * 0.3;
          destRotY = 1.6 + t * 1.0;
          destAlpha = 0.20 * (1 - t) + 0.18 * t;
        } else {
          // Activities -> CTA
          const t = Math.min(1.0, p - 2.0);
          const prevY = actPos ? actPos.y : (aboutPos.y + ctaPos.y) * 0.5;
          destY = prevY + (ctaPos.y - prevY) * t;
          destR = Math.min(w, h) * (isLandscapePhone ? 0.38 : 0.36) * (1.0 + t * 0.35);
          destMorph = 2.2 + t * 0.8; // 2.2 -> 3.0
          destRotX = 1.05 + t * 0.25;
          destRotY = 2.6 + t * 0.8;
          destAlpha = 0.18 * (1 - t) + (isLandscapePhone ? 0.26 : 0.32) * t;
        }
      } else {
        // DESKTOP: Crisp, defined Bloch sphere on the right in Hero, then smoothly glides and destructures down
        if (p <= 1.0) {
          // Hero -> About
          const t = p;
          destX = heroPos.x + (aboutPos.x - heroPos.x) * t;
          destY = heroPos.y + (aboutPos.y - heroPos.y) * t;
          destR = Math.min(w, h) * 0.22 * (1 + t * 0.1);
          destMorph = t * 1.0; // 0.0 -> 1.0 (Bloch to Wave Superposition)
          destRotX = 0.32 + t * 0.35;
          destRotY = 0.45 + t * 0.95;
          destAlpha = 1.0 * (1 - t) + 0.35 * t;
        } else if (p <= 2.0) {
          // About -> Activities (or halfway to CTA)
          const t = p - 1.0;
          const nextX = actPos ? actPos.x : (aboutPos.x + ctaPos.x) * 0.5;
          const nextY = actPos ? actPos.y : (aboutPos.y + ctaPos.y) * 0.5;
          destX = aboutPos.x + (nextX - aboutPos.x) * t;
          destY = aboutPos.y + (nextY - aboutPos.y) * t;
          destR = Math.min(w, h) * 0.24 * (1.1 - t * 0.05);
          destMorph = 1.0 + t * 1.0; // 1.0 -> 2.0 (Wave to Entangled / Dual Torus)
          destRotX = 0.67 + t * 0.4;
          destRotY = 1.4 + t * 1.2;
          destAlpha = 0.35 * (1 - t) + 0.32 * t;
        } else {
          // Activities -> CTA
          const t = Math.min(1.0, p - 2.0);
          const prevX = actPos ? actPos.x : (aboutPos.x + ctaPos.x) * 0.5;
          const prevY = actPos ? actPos.y : (aboutPos.y + ctaPos.y) * 0.5;
          destX = prevX + (ctaPos.x - prevX) * t;
          destY = prevY + (ctaPos.y - prevY) * t;
          // Expands into a giant portal behind the CTA card!
          destR = Math.min(w, h) * 0.23 * (1.05 + t * 0.65);
          destMorph = 2.0 + t * 1.0; // 2.0 -> 3.0 (Concentric Portal Singularity)
          destRotX = 1.07 + t * 0.3;
          destRotY = 2.6 + t * 1.0;
          destAlpha = 0.32 * (1 - t) + 0.45 * t;
        }
      }

      targetCoords = {
        x: destX,
        y: destY,
        r: destR,
        morph: destMorph,
        rotX: destRotX,
        rotY: destRotY,
        alpha: destAlpha,
      };
    };

    const resize = () => {
      const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
      updateAnchorTargets();

      // Initialize state or instantly align upon screen rotation / large dimension change
      if (
        state.r === 0 ||
        Math.hypot(targetCoords.x - state.x, targetCoords.y - state.y) > 220
      ) {
        state.x = targetCoords.x;
        state.y = targetCoords.y;
        state.r = targetCoords.r;
        state.morph = targetCoords.morph;
        state.rotX = targetCoords.rotX;
        state.rotY = targetCoords.rotY;
        state.alpha = targetCoords.alpha;
      }
    };

    const handleOrientation = () => {
      setTimeout(resize, 60);
      setTimeout(resize, 220);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', handleOrientation);
    window.addEventListener('scroll', updateAnchorTargets, { passive: true });

    const render = () => {
      time += 0.016;

      // Silky smooth exponential damping (lerp) towards anchor targets
      const lerpSpeed = 0.075;
      state.x += (targetCoords.x - state.x) * lerpSpeed;
      state.y += (targetCoords.y - state.y) * lerpSpeed;
      state.r += (targetCoords.r - state.r) * lerpSpeed;
      state.morph += (targetCoords.morph - state.morph) * lerpSpeed;
      state.rotX += (targetCoords.rotX - state.rotX) * lerpSpeed;
      state.rotY += (targetCoords.rotY - state.rotY) * lerpSpeed;
      state.alpha += (targetCoords.alpha - state.alpha) * lerpSpeed;

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      ctx.save();
      ctx.globalAlpha = Math.max(0.04, Math.min(1, state.alpha));

      const cx = state.x;
      const cy = state.y;
      // Organic breathing when steady
      const R = state.r * (1 + Math.sin(time * 1.1) * 0.016);
      const morph = state.morph;
      const rotX = state.rotX + Math.sin(time * 0.35) * 0.08;
      const rotY = time * 0.35 + state.rotY;

      // 3D Projection with depth calculations
      const camDist = 3.3;
      const project = (x: number, y: number, z: number) => {
        // Yaw
        const x1 = x * Math.cos(rotY) + y * Math.sin(rotY);
        const y1 = -x * Math.sin(rotY) + y * Math.cos(rotY);
        const z1 = z;

        // Pitch
        const x2 = x1;
        const y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);

        const pFactor = camDist / (camDist - y2 * 0.85);

        return {
          px: cx + x2 * R * pFactor,
          py: cy - z2 * R * pFactor,
          depth: y2,
        };
      };

      // 1. Soft Ambient Volumetric Backlight Glow
      const glowR = R * 1.4;
      const haloGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, glowR);
      haloGrad.addColorStop(0, 'rgba(6, 182, 212, 0.22)');
      haloGrad.addColorStop(0.35, 'rgba(59, 130, 246, 0.14)');
      haloGrad.addColorStop(0.7, 'rgba(99, 102, 241, 0.04)');
      haloGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
      ctx.fill();

      // 2. Quantum Probability Ripple Wave
      const ripplePhase = (time * 0.3) % 1;
      const rippleR = R * (0.8 + ripplePhase * 0.45);
      const rippleAlpha = (1 - ripplePhase) * 0.18;
      ctx.strokeStyle = `rgba(6, 182, 212, ${rippleAlpha})`;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.arc(cx, cy, rippleR, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Central Quantum Singularity Core
      const corePulse = 1 + Math.sin(time * 2.2) * 0.12;
      const coreR = Math.max(7, 13 * corePulse);
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.35, '#06b6d4');
      coreGrad.addColorStop(0.8, 'rgba(17, 9, 255, 0.35)');
      coreGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();

      // Helper for depth-sorted 3D Ring drawing
      const draw3DRing = (
        transformPoint: (angle: number) => [number, number, number],
        colorFront: string,
        colorBack: string,
        steps = 72,
        dashed = false,
      ) => {
        const segments: {
          p1: { px: number; py: number; depth: number };
          p2: { px: number; py: number; depth: number };
          avgDepth: number;
        }[] = [];

        for (let i = 0; i < steps; i++) {
          const a1 = (i / steps) * Math.PI * 2;
          const a2 = ((i + 1) / steps) * Math.PI * 2;
          const pt1 = transformPoint(a1);
          const pt2 = transformPoint(a2);
          const p1 = project(pt1[0], pt1[1], pt1[2]);
          const p2 = project(pt2[0], pt2[1], pt2[2]);
          segments.push({ p1, p2, avgDepth: (p1.depth + p2.depth) / 2 });
        }

        segments.sort((a, b) => a.avgDepth - b.avgDepth);

        segments.forEach((seg) => {
          ctx.beginPath();
          if (dashed) ctx.setLineDash([3, 4]);
          else ctx.setLineDash([]);

          ctx.moveTo(seg.p1.px, seg.p1.py);
          ctx.lineTo(seg.p2.px, seg.p2.py);

          const isFront = seg.avgDepth > 0;
          ctx.strokeStyle = isFront ? colorFront : colorBack;
          ctx.lineWidth = isFront ? 1.5 : 0.8;
          ctx.stroke();
        });
        ctx.setLineDash([]);
      };

      // --- MORPHING RING 1 (Equator -> Harmonic Waveform -> Entangled Lobe A -> Gyro A) ---
      draw3DRing(
        (a) => {
          const x0 = Math.cos(a);
          const y0 = Math.sin(a);
          const z0 = 0;

          const waveR = 1 + 0.28 * Math.sin(a * 5 - time * 2.2);
          const x1 = waveR * Math.cos(a);
          const y1 = waveR * Math.sin(a);
          const z1 = 0.25 * Math.cos(a * 4 + time * 1.8);

          const x2 = Math.cos(a) * 0.75 + 0.35;
          const y2 = Math.sin(a) * 0.75;
          const z2 = Math.sin(a * 2 + time * 1.5) * 0.3;

          const x3 = Math.cos(a) * 1.15;
          const y3 = Math.sin(a) * 1.15;
          const z3 = Math.sin(a * 3 + time * 1.8) * 0.15;

          let x = x0, y = y0, z = z0;
          if (morph <= 1) {
            const t = morph;
            x = x0 + (x1 - x0) * t;
            y = y0 + (y1 - y0) * t;
            z = z0 + (z1 - z0) * t;
          } else if (morph <= 2) {
            const t = morph - 1;
            x = x1 + (x2 - x1) * t;
            y = y1 + (y2 - y1) * t;
            z = z1 + (z2 - z1) * t;
          } else {
            const t = Math.min(morph - 2, 1);
            x = x2 + (x3 - x2) * t;
            y = y2 + (y3 - y2) * t;
            z = z2 + (z3 - z2) * t;
          }
          return [x, y, z];
        },
        'rgba(6, 182, 212, 0.75)',
        'rgba(6, 182, 212, 0.18)',
        80,
      );

      // --- MORPHING RING 2 (Meridian X-Z -> Vertical Harmonics -> Entangled Lobe B -> Gyro B) ---
      draw3DRing(
        (a) => {
          const x0 = Math.cos(a);
          const y0 = 0;
          const z0 = Math.sin(a);

          const x1 = Math.cos(a) * (1 + 0.2 * Math.sin(a * 4 - time * 2.0));
          const y1 = 0.2 * Math.sin(a * 3 + time * 2.4);
          const z1 = Math.sin(a);

          const x2 = Math.cos(a) * 0.75 - 0.35;
          const y2 = Math.sin(a) * 0.75;
          const z2 = -Math.sin(a * 2 + time * 1.5) * 0.3;

          const cos45 = 0.7071;
          const x3 = Math.cos(a) * 0.9 * cos45;
          const y3 = Math.sin(a) * 0.9;
          const z3 = Math.cos(a) * 0.9 * cos45;

          let x = x0, y = y0, z = z0;
          if (morph <= 1) {
            const t = morph;
            x = x0 + (x1 - x0) * t;
            y = y0 + (y1 - y0) * t;
            z = z0 + (z1 - z0) * t;
          } else if (morph <= 2) {
            const t = morph - 1;
            x = x1 + (x2 - x1) * t;
            y = y1 + (y2 - y1) * t;
            z = z1 + (z2 - z1) * t;
          } else {
            const t = Math.min(morph - 2, 1);
            x = x2 + (x3 - x2) * t;
            y = y2 + (y3 - y2) * t;
            z = z2 + (z3 - z2) * t;
          }
          return [x, y, z];
        },
        'rgba(59, 130, 246, 0.65)',
        'rgba(59, 130, 246, 0.15)',
        80,
        true,
      );

      // --- MORPHING RING 3 (Meridian Y-Z / Gyro C) ---
      draw3DRing(
        (a) => {
          const x0 = 0;
          const y0 = Math.cos(a);
          const z0 = Math.sin(a);

          const x1 = Math.sin(a * 2 + time * 1.8) * 0.3;
          const y1 = Math.cos(a);
          const z1 = Math.sin(a);

          const x2 = Math.sin(a) * 0.4;
          const y2 = Math.cos(a) * 0.4;
          const z2 = Math.sin(a * 2 - time * 1.6) * 0.5;

          const x3 = Math.sin(a + time * 0.8) * 0.65;
          const y3 = 0;
          const z3 = Math.cos(a + time * 0.8) * 0.65;

          let x = x0, y = y0, z = z0;
          if (morph <= 1) {
            const t = morph;
            x = x0 + (x1 - x0) * t;
            y = y0 + (y1 - y0) * t;
            z = z0 + (z1 - z0) * t;
          } else if (morph <= 2) {
            const t = morph - 1;
            x = x1 + (x2 - x1) * t;
            y = y1 + (y2 - y1) * t;
            z = z1 + (z2 - z1) * t;
          } else {
            const t = Math.min(morph - 2, 1);
            x = x2 + (x3 - x2) * t;
            y = y2 + (y3 - y2) * t;
            z = z2 + (z3 - z2) * t;
          }
          return [x, y, z];
        },
        'rgba(99, 102, 241, 0.55)',
        'rgba(99, 102, 241, 0.14)',
        72,
        true,
      );

      // 4. Polar Axis (Desktop only in initial Bloch state)
      const isMobileScreen = w < 1024 || h < 550;
      const axisAlpha = isMobileScreen ? 0 : Math.max(0, 1 - morph * 1.2);
      if (axisAlpha > 0.05) {
        const pTop = project(0, 0, 1.25);
        const pBottom = project(0, 0, -1.25);

        ctx.beginPath();
        ctx.moveTo(pTop.px, pTop.py);
        ctx.lineTo(pBottom.px, pBottom.py);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.22 * axisAlpha})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        ctx.font = 'bold 11px monospace';
        ctx.fillStyle = `rgba(56, 189, 248, ${axisAlpha})`;
        ctx.fillText('|0⟩', pTop.px + 7, pTop.py - 3);
        ctx.fillStyle = `rgba(129, 140, 248, ${axisAlpha})`;
        ctx.fillText('|1⟩', pBottom.px + 7, pBottom.py + 11);
      }

      // 5. Dynamic State Vector |Psi> (Desktop only in initial Bloch state)
      if (!isMobileScreen && morph < 0.9) {
        const curTheta = Math.PI * 0.35 + morph * 0.5 + Math.sin(time * 0.8) * 0.08;
        const curPhi = morph * 1.4 + time * 0.25;
        const vx = Math.sin(curTheta) * Math.cos(curPhi);
        const vy = Math.sin(curTheta) * Math.sin(curPhi);
        const vz = Math.cos(curTheta);

        const tip = project(vx, vy, vz);

        // Vector Arrow
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(tip.px, tip.py);
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2.2;
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Tip Beacon Halo
        ctx.beginPath();
        ctx.arc(tip.px, tip.py, 4.8, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.font = 'bold 11px monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('|ψ⟩', tip.px + 8, tip.py - 4);
      }

      // 6. Depth-sorted Quantum Particle Cloud
      const sortedParticles = particles
        .map((part) => {
          const curPartPhi = part.phi + time * part.speed * 0.45;
          const px = Math.sin(part.theta) * Math.cos(curPartPhi) * part.rRatio;
          const py = Math.sin(part.theta) * Math.sin(curPartPhi) * part.rRatio;
          const pz = Math.cos(part.theta) * part.rRatio;

          // Migrate to dual lobes in entangled stage
          let finalPx = px;
          let finalPy = py;
          if (morph > 1.1 && morph < 2.9) {
            const lobeOffset = part.lobe * 0.35 * Math.min(morph - 1.1, 1);
            finalPx = px * 0.72 + lobeOffset;
            finalPy = py * 0.72;
          }

          const pos = project(finalPx, finalPy, pz);
          return { ...pos, size: part.size };
        })
        .sort((a, b) => a.depth - b.depth);

      sortedParticles.forEach((part) => {
        const isFront = part.depth > 0;
        const partAlpha = isFront ? 0.7 + part.depth * 0.3 : 0.2 + (1 + part.depth) * 0.2;
        ctx.beginPath();
        ctx.arc(part.px, part.py, part.size * (isFront ? 1.2 : 0.7), 0, Math.PI * 2);
        ctx.fillStyle = isFront
          ? `rgba(56, 189, 248, ${partAlpha})`
          : `rgba(99, 102, 241, ${partAlpha * 0.6})`;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = isFront ? 6 : 0;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', updateAnchorTargets);
      window.removeEventListener('resize', resize);
      window.removeEventListener('orientationchange', handleOrientation);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block', width: '100vw', height: '100vh' }}
      />
    </div>
  );
}
