// =============================================================================
// McFuntain Nutraceuticals — FDA/DSHEA Supplement Disclaimer
// Reusable server component (no 'use client', no hooks).
// Navy + gold only. Elegant, trustworthy — not alarming.
// =============================================================================

interface DisclaimerProps {
  variant?: 'full' | 'compact';
  className?: string;
}

const FULL_TEXT =
  'These statements have not been evaluated by the Food and Drug Administration. McFuntain Nutraceuticals products are not intended to diagnose, treat, cure, or prevent any disease. The information provided on this site is for educational purposes only and is not a substitute for professional medical advice. Always consult your physician or a qualified healthcare provider before starting any new supplement, especially if you are pregnant, nursing, taking medication, or have a medical condition.';

const COMPACT_TEXT =
  'These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before use.';

export default function Disclaimer({
  variant = 'full',
  className = '',
}: DisclaimerProps) {
  if (variant === 'compact') {
    return (
      <p
        className={`text-xs text-muted leading-relaxed border-l-2 border-gold/50 pl-3 ${className}`}
      >
        <span className="font-heading font-semibold uppercase tracking-wide text-ink/70">
          Disclaimer:{' '}
        </span>
        {COMPACT_TEXT}
      </p>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-beige-dark/40 border-l-4 border-l-gold bg-beige/60 p-6 sm:p-7 ${className}`}
    >
      <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep">
        Important Health Disclaimer
      </p>
      <p className="mt-3 text-sm text-muted leading-relaxed">{FULL_TEXT}</p>
    </div>
  );
}
