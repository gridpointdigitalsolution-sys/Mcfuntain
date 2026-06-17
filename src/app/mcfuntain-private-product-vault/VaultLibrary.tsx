'use client';

/**
 * Private owner vault — interactive manual library.
 * Search · category sidebar · card grid · PDF viewer modal · email-to-prospect.
 * Brand DNA locked: Navy #15233F · Gold #C9A24A · Cream #F8F1E5 · Ink #2D2D2D.
 */

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Search, Leaf, Eye, Download, Share2, X, Copy, Menu, Lock, ExternalLink,
} from 'lucide-react';
import type { VaultItem } from './page';

const NAVY = '#15233F';
const GOLD = '#C9A24A';
const CREAM = '#F8F1E5';
const INK = '#2D2D2D';

const ALL = 'All Products';

export default function VaultLibrary({
  items,
  categories,
}: {
  items: VaultItem[];
  categories: string[];
}) {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState<string>(ALL);
  const [viewer, setViewer] = useState<VaultItem | null>(null);
  const [emailItem, setEmailItem] = useState<VaultItem | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState('');

  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return items.filter((it) => {
      const catOk = activeCat === ALL || it.category === activeCat;
      const qOk = !q || it.search.includes(q);
      return catOk && qOk;
    });
  }, [items, activeCat, q]);

  const counts = useMemo(() => {
    const m: Record<string, number> = { [ALL]: items.length };
    for (const c of categories) m[c] = items.filter((it) => it.category === c).length;
    return m;
  }, [items, categories]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  function showToast(msg: string) {
    setToast(msg);
  }

  async function copyLink(it: VaultItem) {
    const url = `${window.location.origin}${it.pdfPath}`;
    try {
      await navigator.clipboard.writeText(url);
      showToast('Private link copied.');
    } catch {
      showToast('Copy failed — ' + url);
    }
  }

  // Public product-page URL — for sharing the website link alongside a manual.
  async function copySiteLink(it: VaultItem) {
    const url = `${window.location.origin}/shop/${it.productId}`;
    try {
      await navigator.clipboard.writeText(url);
      showToast('Website link copied — ' + url);
    } catch {
      showToast('Copy failed — ' + url);
    }
  }

  return (
    <div style={{ background: CREAM, color: NAVY }} className="min-h-screen font-[Georgia,serif]">
      {/* ---------- HERO ---------- */}
      <header className="border-b border-[#e7ddc7]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-32 sm:pt-36 pb-12 text-center">
          <p className="text-xs font-bold tracking-[0.24em] uppercase font-sans mb-3" style={{ color: GOLD }}>
            Private · Owner Library
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold" style={{ color: NAVY }}>McFuntain Product Manuals</h1>
          <p className="mt-3 italic text-base sm:text-lg text-[#5b6472]">Internal vault — for sharing with prospects only.</p>
          <p className="mt-2 text-xs font-sans text-[#9aa3b2]">{items.length} supplements · Updated June 2026</p>
          <span aria-hidden className="block mt-4 text-lg" style={{ color: GOLD }}>&#9670;</span>
        </div>
      </header>

      {/* ---------- STICKY SEARCH ---------- */}
      <div className="sticky top-0 z-30 border-b border-[#e7ddc7]" style={{ background: CREAM }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-4 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden grid place-items-center h-11 w-11 rounded-lg border border-[#d9cdb0]"
            aria-label="Open categories"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: GOLD }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a product, ingredient, or category…"
              className="w-full rounded-full border border-[#d9cdb0] bg-white pl-10 pr-24 py-3 text-sm font-sans text-[#2D2D2D] focus:outline-none focus:ring-2"
              style={{ outlineColor: GOLD }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-sans font-bold uppercase tracking-wide"
                style={{ color: GOLD }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 pb-3 -mt-1">
          <p className="text-xs font-sans text-[#9aa3b2]">{filtered.length} of {items.length} manuals</p>
        </div>
      </div>

      {/* ---------- MAIN ---------- */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8 flex gap-8">
        {/* sidebar (desktop) */}
        <aside className="hidden lg:block w-[22%] flex-shrink-0">
          <CategoryMenu
            categories={categories}
            counts={counts}
            active={activeCat}
            onSelect={setActiveCat}
          />
        </aside>

        {/* grid */}
        <main className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#e7ddc7] py-20 px-6 text-center">
              <Leaf className="w-8 h-8 mx-auto mb-4" style={{ color: GOLD }} />
              <p className="text-[#5b6472] font-sans max-w-sm mx-auto">
                No manuals match that search. Try a category from the left, or clear your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 min-[760px]:grid-cols-2 min-[1200px]:grid-cols-3 gap-5">
              {filtered.map((it) => (
                <VaultCard
                  key={it.productId}
                  item={it}
                  query={q}
                  onView={() => setViewer(it)}
                  onEmail={() => setEmailItem(it)}
                  onCopy={() => copyLink(it)}
                  onSite={() => copySiteLink(it)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ---------- FOOTER ---------- */}
      <footer className="border-t border-[#e7ddc7] mt-8">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6 flex flex-col sm:flex-row gap-2 justify-between items-center">
          <p className="text-[11px] font-sans font-bold tracking-[0.16em] uppercase" style={{ color: NAVY }}>
            McFuntain Nutraceuticals · Private Owner Vault
          </p>
          <p className="text-[11px] italic text-[#9aa3b2] text-center sm:text-right">
            FDA structure-function disclaimer applies to all manuals. Not for public distribution outside of prospect sales conversations.
          </p>
        </div>
      </footer>

      {/* ---------- MOBILE SIDEBAR ---------- */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
            style={{ background: 'rgba(21,35,63,0.6)' }}
            onClick={() => setSidebarOpen(false)}
          >
            <motion.div
              initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }}
              transition={{ type: 'spring', stiffness: 380, damping: 36 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-0 bottom-0 w-[80%] max-w-xs p-6 overflow-y-auto"
              style={{ background: CREAM }}
            >
              <div className="flex justify-between items-center mb-5">
                <span className="text-xs font-sans font-bold tracking-[0.2em] uppercase" style={{ color: GOLD }}>Categories</span>
                <button onClick={() => setSidebarOpen(false)} aria-label="Close"><X className="w-5 h-5" /></button>
              </div>
              <CategoryMenu
                categories={categories}
                counts={counts}
                active={activeCat}
                onSelect={(c) => { setActiveCat(c); setSidebarOpen(false); }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- PDF VIEWER ---------- */}
      <AnimatePresence>
        {viewer && (
          <ViewerModal item={viewer} onClose={() => setViewer(null)} onEmail={() => { setEmailItem(viewer); setViewer(null); }} onCopy={() => copyLink(viewer)} />
        )}
      </AnimatePresence>

      {/* ---------- EMAIL POPUP ---------- */}
      <AnimatePresence>
        {emailItem && (
          <EmailModal item={emailItem} onClose={() => setEmailItem(null)} onSent={(msg) => { setEmailItem(null); showToast(msg); }} />
        )}
      </AnimatePresence>

      {/* ---------- TOAST ---------- */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[130] rounded-full px-5 py-2.5 text-sm font-sans font-bold shadow-xl"
            style={{ background: NAVY, color: GOLD }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function CategoryMenu({
  categories, counts, active, onSelect,
}: {
  categories: string[];
  counts: Record<string, number>;
  active: string;
  onSelect: (c: string) => void;
}) {
  const all = [ALL, ...categories];
  return (
    <nav className="lg:sticky lg:top-28">
      <p className="text-xs font-sans font-bold tracking-[0.2em] uppercase mb-3" style={{ color: GOLD }}>Categories</p>
      <ul className="space-y-1.5">
        {all.map((c) => {
          const on = c === active;
          return (
            <li key={c}>
              <button
                onClick={() => onSelect(c)}
                className="w-full flex items-center justify-between rounded-lg px-3.5 py-2.5 text-sm font-sans transition-colors border"
                style={on
                  ? { background: NAVY, color: CREAM, borderColor: GOLD }
                  : { background: 'transparent', color: INK, borderColor: 'transparent' }}
              >
                <span className={on ? 'font-bold' : ''}>{c}</span>
                <span className="text-xs" style={{ color: on ? GOLD : '#9aa3b2' }}>{counts[c] ?? 0}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
function highlight(name: string, q: string) {
  if (!q) return name;
  const i = name.toLowerCase().indexOf(q);
  if (i < 0) return name;
  return (
    <>
      {name.slice(0, i)}
      <span style={{ borderBottom: `2px solid ${GOLD}` }}>{name.slice(i, i + q.length)}</span>
      {name.slice(i + q.length)}
    </>
  );
}

function VaultCard({
  item, query, onView, onEmail, onCopy, onSite,
}: {
  item: VaultItem;
  query: string;
  onView: () => void;
  onEmail: () => void;
  onCopy: () => void;
  onSite: () => void;
}) {
  return (
    <article className="bg-white rounded-2xl border border-[#e7ddc7] overflow-hidden flex flex-col shadow-[0_10px_30px_-20px_rgba(21,35,63,0.4)] hover:shadow-[0_18px_44px_-22px_rgba(21,35,63,0.5)] transition-shadow">
      {/* top */}
      <div
        className="relative aspect-square grid place-items-center"
        style={{ background: 'linear-gradient(160deg,#fbf6ea 0%,#f1e7cf 100%)' }}
      >
        <img
          src={`/images/products/${item.productId}/bottle-1.jpg`}
          alt={`${item.name} bottle`}
          loading="lazy"
          className="h-[78%] w-auto object-contain drop-shadow-[0_18px_30px_rgba(21,35,63,0.22)]"
        />
        <span className="absolute top-3 left-3 grid place-items-center h-7 w-7 rounded-full" style={{ background: NAVY }}>
          <Lock className="w-3.5 h-3.5" style={{ color: GOLD }} />
        </span>
      </div>

      {/* body */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[11px] font-sans font-bold tracking-[0.18em] uppercase" style={{ color: GOLD }}>
          {String(item.num).padStart(2, '0')}
        </p>
        <h3 className="mt-1 text-lg leading-snug" style={{ color: NAVY }}>{highlight(item.name, query)}</h3>
        {item.tagline && (
          <p className="mt-1 italic text-sm font-[Georgia,serif] truncate" style={{ color: '#a98a3d' }}>{item.tagline}</p>
        )}
        <span className="block my-3 h-px" style={{ background: '#ece2cb' }} />

        <div className="flex flex-wrap items-center gap-2">
          <CardBtn label="View" onClick={onView}><Eye className="w-4 h-4" /></CardBtn>
          <a
            href={item.pdfPath}
            download={`${item.name} Manual.pdf`}
            title="Download the PDF to your device"
            className="flex items-center gap-1.5 rounded-lg border border-[#e0d5ba] px-3 py-2 text-xs font-sans font-bold uppercase tracking-wide transition-colors"
            style={{ color: NAVY }}
            onMouseEnter={(e) => { e.currentTarget.style.background = NAVY; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = NAVY; }}
          >
            <Download className="w-4 h-4" /> Save
          </a>
          <CardBtn label="Email" onClick={onEmail}><Share2 className="w-4 h-4" /></CardBtn>
          <CardBtn label="Link" onClick={onCopy}><Copy className="w-4 h-4" /></CardBtn>
        </div>

        {/* Website link-back — copy the product's public page URL to share */}
        <button
          onClick={onSite}
          title="Copy this product's website link"
          className="mt-3 flex w-full items-center gap-2 rounded-lg border border-[#e0d5ba] px-3 py-2 text-left transition-colors hover:text-white"
          style={{ color: NAVY }}
          onMouseEnter={(e) => (e.currentTarget.style.background = GOLD)}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          <span className="font-sans text-[11px] font-semibold truncate">mcfuntain.com/shop/{item.productId}</span>
          <Copy className="w-3.5 h-3.5 ml-auto shrink-0 opacity-70" />
        </button>
      </div>

      {/* footer strip */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-[#f0e8d5]">
        <span className="text-[9px] font-sans font-bold uppercase tracking-[0.14em]" style={{ color: NAVY }}>{item.category}</span>
        <span className="text-[11px] italic" style={{ color: GOLD }}>{item.bottle} cap</span>
      </div>
    </article>
  );
}

function CardBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className="flex items-center gap-1.5 rounded-lg border border-[#e0d5ba] px-3 py-2 text-xs font-sans font-bold uppercase tracking-wide transition-colors"
      style={{ color: NAVY }}
      onMouseEnter={(e) => { e.currentTarget.style.background = NAVY; e.currentTarget.style.color = '#fff'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = NAVY; }}
    >
      {children}
      <span>{label}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
function ViewerModal({
  item, onClose, onEmail, onCopy,
}: {
  item: VaultItem;
  onClose: () => void;
  onEmail: () => void;
  onCopy: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6"
      style={{ background: 'rgba(21,35,63,0.85)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 16 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl h-[88vh] bg-white rounded-xl overflow-hidden flex flex-col shadow-2xl"
      >
        <div className="flex items-center justify-between px-5 py-3.5" style={{ background: NAVY }}>
          <h3 className="text-white text-sm sm:text-base font-[Georgia,serif] truncate pr-4">{item.name}</h3>
          <button onClick={onClose} aria-label="Close" className="grid place-items-center h-9 w-9 rounded-full text-white hover:bg-white/15">
            <X className="w-5 h-5" />
          </button>
        </div>
        <iframe src={`${item.pdfPath}#view=FitH`} title={`${item.name} manual`} className="flex-1 w-full bg-[#f4eedd]" />
        <div className="flex flex-wrap justify-end gap-3 px-5 py-3 border-t border-[#ece2cb]" style={{ background: CREAM }}>
          <a href={item.pdfPath} download className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-xs font-sans font-bold uppercase tracking-wide" style={{ borderColor: GOLD, color: NAVY }}>
            <Download className="w-4 h-4" /> Download PDF
          </a>
          <button onClick={onEmail} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-xs font-sans font-bold uppercase tracking-wide" style={{ borderColor: GOLD, color: NAVY }}>
            <Share2 className="w-4 h-4" /> Email to a Prospect
          </button>
          <button onClick={onCopy} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-xs font-sans font-bold uppercase tracking-wide" style={{ borderColor: GOLD, color: NAVY }}>
            <Copy className="w-4 h-4" /> Copy Private Link
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
function EmailModal({
  item, onClose, onSent,
}: {
  item: VaultItem;
  onClose: () => void;
  onSent: (msg: string) => void;
}) {
  const [email, setEmail] = useState('');
  const [attach, setAttach] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/manual-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, productId: item.productId, attach }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        onSent('Sent.');
      } else if (res.status === 503) {
        setError(data.message || 'Email sending is not enabled yet.');
      } else {
        setError(data.error || 'Could not send. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[125] flex items-center justify-center p-4"
      style={{ background: 'rgba(21,35,63,0.7)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, y: 14 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 14 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="flex items-center justify-between px-5 py-3.5" style={{ background: NAVY }}>
          <h3 className="text-white text-sm font-sans font-bold uppercase tracking-wide">Email to a Prospect</h3>
          <button onClick={onClose} aria-label="Close" className="grid place-items-center h-8 w-8 rounded-full text-white hover:bg-white/15"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={submit} className="p-5 font-sans">
          <p className="text-xs text-[#9aa3b2] mb-3">Sending <span className="font-bold" style={{ color: NAVY }}>{item.name}</span></p>
          <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: NAVY }}>Send to</label>
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="prospect@example.com"
            className="w-full rounded-lg border border-[#d9cdb0] px-3.5 py-2.5 text-sm text-[#2D2D2D] focus:outline-none focus:ring-2"
            style={{ outlineColor: GOLD }}
          />
          <label className="mt-4 flex items-center gap-2.5 text-sm text-[#2D2D2D] cursor-pointer">
            <input type="checkbox" checked={attach} onChange={(e) => setAttach(e.target.checked)} className="h-4 w-4 accent-[#C9A24A]" />
            Attach the PDF (large files send as a secure link instead)
          </label>
          {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
          <button
            type="submit" disabled={busy}
            className="mt-5 w-full font-bold uppercase tracking-wide text-sm py-2.5 rounded-lg disabled:opacity-60"
            style={{ background: GOLD, color: NAVY }}
          >
            {busy ? 'Sending…' : 'Send Manual'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
