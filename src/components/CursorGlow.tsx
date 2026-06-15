'use client';

/**
 * CursorGlow — world-class custom mouse effect.
 * A crisp gold dot tracks the pointer instantly while a larger gold ring
 * trails with springy "elastic" lag (the tough, alive feel). The ring grows
 * and brightens over interactive elements (links / buttons / inputs).
 *
 * Desktop fine-pointer only. Auto-disabled for touch + reduced-motion.
 */

import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';

export default function CursorGlow() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false); // pointer is on the page
  const [hot, setHot] = useState(false); // hovering an interactive element

  // raw pointer position
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // dot: tight + quick. ring: looser + springy = elastic trail.
  const dotX = useSpring(x, { stiffness: 1100, damping: 50, mass: 0.4 });
  const dotY = useSpring(y, { stiffness: 1100, damping: 50, mass: 0.4 });
  const ringX = useSpring(x, { stiffness: 200, damping: 22, mass: 0.7 });
  const ringY = useSpring(y, { stiffness: 200, damping: 22, mass: 0.7 });

  useEffect(() => {
    if (reduced) return;
    // only on devices with a precise pointer (mouse / trackpad)
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);

    const interactiveSel = 'a, button, [role="button"], input, textarea, select, label, summary, .cursor-pointer';

    function move(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!active) setActive(true);
      const t = e.target as Element | null;
      setHot(!!t?.closest?.(interactiveSel));
    }
    function leave() {
      setActive(false);
    }

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, [reduced, active, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9998] hidden lg:block"
      style={{ opacity: active ? 1 : 0, transition: 'opacity 0.3s ease' }}
    >
      {/* Outer elastic ring — springy trail, grows over interactive targets */}
      <motion.div
        className="absolute top-0 left-0 rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'screen',
        }}
        animate={{
          width: hot ? 64 : 38,
          height: hot ? 64 : 38,
          borderColor: hot ? 'rgba(229,184,56,0.9)' : 'rgba(212,160,23,0.55)',
          boxShadow: hot
            ? '0 0 28px 4px rgba(212,160,23,0.35)'
            : '0 0 16px 1px rgba(212,160,23,0.18)',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <span className="block h-full w-full rounded-full border-2 border-[inherit]" />
      </motion.div>

      {/* Inner crisp dot — instant tracker */}
      <motion.div
        className="absolute top-0 left-0 rounded-full bg-gold"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 7,
          height: 7,
          mixBlendMode: 'screen',
          boxShadow: '0 0 10px 2px rgba(212,160,23,0.7)',
        }}
        animate={{ scale: hot ? 0.4 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      />
    </div>
  );
}
