import type { ReactNode } from 'react';

interface LegalSectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

/** White card section for legal pages — Oswald uppercase heading with gold underline bar. */
export default function LegalSection({ id, title, children }: LegalSectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-36 rounded-2xl border border-beige-dark/30 bg-white p-7 md:p-10 shadow-[0_2px_16px_rgba(27,42,74,0.05)]"
    >
      <h2 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-wide text-navy">
        {title}
      </h2>
      <span className="mt-2.5 mb-5 block h-[3px] w-12 rounded-full bg-gold" aria-hidden />
      <div className="space-y-4 text-[15px] md:text-base leading-[1.85] text-ink/80 [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:pl-6 [&_h3]:font-heading [&_h3]:uppercase [&_h3]:tracking-wide [&_h3]:text-navy [&_h3]:font-bold [&_h3]:text-base [&_h3]:mt-6">
        {children}
      </div>
    </section>
  );
}
