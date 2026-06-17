'use client';

import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

const NAVY = '#15233F';
const GOLD = '#C9A24A';
const CREAM = '#F8F1E5';

export default function VaultGate({ notConfigured = false }: { notConfigured?: boolean }) {
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/vault-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passphrase }),
      });
      if (res.ok) {
        window.location.reload();
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Incorrect passphrase.');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main
      style={{ background: CREAM, color: NAVY }}
      className="min-h-screen flex items-center justify-center px-5 font-[Georgia,serif]"
    >
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#e7ddc7] shadow-[0_30px_70px_-30px_rgba(21,35,63,0.35)] p-9 sm:p-11 text-center">
        <span
          className="inline-grid place-items-center h-14 w-14 rounded-full mb-6"
          style={{ background: NAVY }}
        >
          <Lock className="w-6 h-6" style={{ color: GOLD }} />
        </span>
        <p
          className="text-[11px] font-bold tracking-[0.22em] uppercase mb-3 font-sans"
          style={{ color: GOLD }}
        >
          Private · Owner Library
        </p>
        <h1 className="text-2xl mb-2">McFuntain Product Manuals</h1>
        <p className="text-sm text-[#2D2D2D] mb-7 font-sans">
          This area is restricted. Enter the owner passphrase to continue.
        </p>

        {notConfigured && (
          <p className="text-xs text-[#8a6d1f] bg-[#fbf3dd] border border-[#e7d8a8] rounded-lg px-3.5 py-2.5 mb-5 font-sans leading-relaxed text-left">
            Setup required: set the <code>MCFUNTAIN_LIBRARY_KEY</code> environment
            variable in Vercel, then redeploy. Until then the vault stays locked.
          </p>
        )}

        <form onSubmit={submit} className="text-left">
          <label className="block text-xs font-bold uppercase tracking-wide mb-1.5 font-sans">
            Passphrase
          </label>
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              autoFocus
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              className="w-full rounded-lg border border-[#d9cdb0] px-4 py-3 pr-12 text-sm text-[#2D2D2D] font-sans focus:outline-none focus:ring-2"
              style={{ outlineColor: GOLD }}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? 'Hide password' : 'Show password'}
              title={show ? 'Hide password' : 'Show password'}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 grid place-items-center h-8 w-8 rounded-md hover:bg-[#f1e7cf]"
              style={{ color: NAVY }}
            >
              {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <p className="mt-2 text-xs font-sans" style={{ color: '#8a7a55' }}>
            {show ? 'Showing what you typed — tap the eye to hide.' : 'Tap the eye to preview what you type.'}
          </p>
          {error && <p className="mt-2 text-sm text-red-600 font-sans">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="mt-5 w-full font-bold uppercase tracking-wide text-sm py-3 rounded-lg font-sans disabled:opacity-60 transition-opacity"
            style={{ background: GOLD, color: NAVY }}
          >
            {busy ? 'Verifying…' : 'Enter Vault'}
          </button>
        </form>
      </div>
    </main>
  );
}
