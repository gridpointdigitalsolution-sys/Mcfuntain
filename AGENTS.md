<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# ⚠ The real handover lives one folder up

This file only carries the Next.js rule above. **Everything else about this project is in the parent
folder**, `McFuntain web/`:

- `../RESUME.md` — read first: current status, hard rules, the one open launch blocker.
- `../CLAUDE.md` — full handover. Start at its `# ⛳ CURRENT STATE` banner; the file is chronological
  and its older sections describe states that no longer apply.

Three things not to learn the hard way:

1. **The store at https://www.mcfuntain.com is LIVE and takes real money.** Stripe, Resend email,
   order confirmations, prices, SEO and GA4 all work. Do not break them.
2. **`git` and `gh` do not run on this machine** (as of 2026-10-03) even though `PATH` lists them.
   Use the git GitHub Desktop bundles, from the Bash tool — see `../RESUME.md` §4.
3. **Known silent traps** (empty `/shop` body from `useSearchParams`, child `openGraph` dropping the
   share image, `priceCart()` reading the wrong catalogue) are listed at the end of `../CLAUDE.md`.
