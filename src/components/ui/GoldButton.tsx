'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface GoldButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
}

const variants = {
  primary:
    'bg-gradient-to-r from-gold-deep via-gold to-gold-light text-white shadow-lg shadow-gold/20 hover:shadow-[0_8px_30px_-5px_rgba(212,160,23,0.4)] hover:-translate-y-0.5 active:translate-y-0',
  outline:
    'border-2 border-gold text-gold hover:bg-gold hover:text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/15 active:translate-y-0',
  dark:
    'bg-ink text-white hover:bg-ink-light hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0',
};

const sizes = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-8 py-3.5 text-base',
  lg: 'px-10 py-4.5 text-lg',
};

export default function GoldButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
}: GoldButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2.5 font-medium tracking-wide
    rounded-full transition-all duration-500 ease-out cursor-pointer
    ${variants[variant]} ${sizes[size]} ${className}
  `;

  const content = (
    <>
      {children}
      {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href}>
        <motion.span
          className={`group ${baseClasses}`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {content}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      className={`group ${baseClasses}`}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {content}
    </motion.button>
  );
}
