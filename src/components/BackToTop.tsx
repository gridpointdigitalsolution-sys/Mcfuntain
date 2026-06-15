'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
          whileHover={{ scale: 1.12, y: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-40 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-br from-gold via-gold-light to-gold-deep text-white shadow-xl shadow-gold/25 hover:shadow-2xl hover:shadow-gold/40 border border-gold-light/30 cursor-pointer transition-shadow duration-300"
          aria-label="Back to top"
        >
          <ArrowUp size={22} strokeWidth={2.5} />
          {/* Outer glow ring */}
          <span className="absolute inset-0 rounded-full border border-gold/20 scale-[1.15] opacity-60 pointer-events-none" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
