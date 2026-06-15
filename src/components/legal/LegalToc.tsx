'use client';

import { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  label: string;
}

/** Sticky table-of-contents sidebar for legal pages (lg+). Gold active state via scroll-spy. */
export default function LegalToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Table of contents" className="sticky top-32">
      <p className="mb-4 font-heading text-xs font-bold uppercase tracking-[0.25em] text-navy">
        On This Page
      </p>
      <ul className="space-y-1 border-l-2 border-beige-dark/40">
        {items.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`-ml-[2px] block border-l-2 py-1.5 pl-4 text-[13px] leading-snug transition-colors duration-200 ${
                  isActive
                    ? 'border-gold font-semibold text-gold'
                    : 'border-transparent text-muted hover:text-navy'
                }`}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
