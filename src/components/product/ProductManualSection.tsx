'use client';

/**
 * "Read the Full Product Manual" — public product-page panel.
 * - Open Manual: in-page lightbox PDF viewer (preview, via <iframe>).
 * - Email Me This Manual: lead-magnet popover → POST /api/manual-request.
 * Navy + gold to match the rest of the product page.
 */

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Mail, X, Download } from 'lucide-react';
import { manualByProductId, manualPublicPath } from '@/data/manuals';

const EASE = [0.22, 1, 0.36, 1] as const;

type SendState = 'idle' | 'sending' | 'ok' | 'pending' | 'error';

export default function ProductManualSection({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const manual = manualByProductId(productId);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [state, setState] = useState<SendState>('idle');
  const [message, setMessage] = useState('');

  // Lock scroll + ESC close while the viewer modal is open.
  useEffect(() => {
    if (!viewerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setViewerOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [viewerOpen]);

  if (!manual) return null;
  const pdfPath = manualPublicPath(manual.slug);

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');
    setMessage('');
    try {
      const res = await fetch('/api/manual-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, productId }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setState('ok');
        setMessage('Sent. Check your inbox for the manual.');
      } else if (res.status === 503) {
        setState('pending');
        setMessage(data.message || 'Email delivery is being set up. You can read the manual now with Open Manual.');
      } else {
        setState('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setState('error');
      setMessage('Network error. Please try again.');
    }
  }

  return (
    <section className="py-16 md:py-24 bg-cream border-t border-beige-dark/30">
      <div className="mx-auto max-w-4xl px-5 lg:px-8 text-center">
        <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-gold-deep mb-3">
          Product Manual
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight text-navy">
          Read the Full Product Manual
        </h2>
        <p className="mt-4 text-muted leading-relaxed max-w-2xl mx-auto">
          A complete 12-section guide covering ingredients, dosage, expected progression,
          safety, and lifestyle support.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => setViewerOpen(true)}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gold text-navy font-bold uppercase tracking-wider rounded-full shadow-lg shadow-gold/20 hover:bg-gold-deep hover:text-white transition-all duration-300"
          >
            <BookOpen className="w-5 h-5" />
            Open Manual
          </button>

          <div className="relative">
            <button
              onClick={() => { setPopoverOpen((v) => !v); setState('idle'); setMessage(''); }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 border-2 border-gold text-gold-deep font-bold uppercase tracking-wider rounded-full hover:bg-gold hover:text-navy transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              Email Me This Manual
            </button>

            <AnimatePresence>
              {popoverOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="absolute z-30 left-1/2 -translate-x-1/2 mt-3 w-[320px] max-w-[90vw] bg-white rounded-2xl border border-beige-dark/50 shadow-2xl p-5 text-left"
                >
                  {state === 'ok' ? (
                    <p className="text-sm text-navy font-semibold py-3 text-center">{message}</p>
                  ) : (
                    <form onSubmit={submitEmail}>
                      <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-1.5">
                        Your email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-beige-dark/70 px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/60"
                      />
                      <button
                        type="submit"
                        disabled={state === 'sending'}
                        className="mt-3 w-full bg-navy text-white font-bold uppercase tracking-wide text-sm py-2.5 rounded-lg hover:bg-[#0f1a30] transition-colors disabled:opacity-60"
                      >
                        {state === 'sending' ? 'Sending…' : 'Send Me The Manual'}
                      </button>
                      {message && (
                        <p className={`mt-2.5 text-xs leading-relaxed ${state === 'error' ? 'text-red-600' : 'text-muted'}`}>
                          {message}
                        </p>
                      )}
                      <p className="mt-2.5 text-[11px] italic text-muted leading-relaxed">
                        By submitting your email you agree to receive the manual and occasional
                        McFuntain wellness updates. Unsubscribe anytime.
                      </p>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* PDF viewer lightbox */}
      <AnimatePresence>
        {viewerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6"
            style={{ background: 'rgba(21,35,63,0.85)' }}
            onClick={() => setViewerOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl h-[88vh] bg-white rounded-xl overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between bg-navy px-5 py-3.5">
                <h3 className="font-heading text-white font-bold uppercase tracking-wide text-sm sm:text-base truncate pr-4">
                  {productName} — Manual
                </h3>
                <button
                  onClick={() => setViewerOpen(false)}
                  aria-label="Close manual"
                  className="flex-shrink-0 grid place-items-center h-9 w-9 rounded-full text-white hover:bg-white/15 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <iframe
                src={`${pdfPath}#toolbar=0&navpanes=0`}
                title={`${productName} manual`}
                className="flex-1 w-full bg-beige/30"
              />
              <div className="flex justify-end gap-3 bg-cream px-5 py-3 border-t border-beige-dark/40">
                <a
                  href={pdfPath}
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-gold text-gold-deep font-bold uppercase tracking-wide text-sm rounded-full hover:bg-gold hover:text-navy transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
