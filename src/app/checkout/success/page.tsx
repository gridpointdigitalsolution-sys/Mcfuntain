import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Mail, Package } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import { getStripe } from '@/lib/stripe';
import ClearCart from './ClearCart';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Order Confirmed | McFuntain Nutraceuticals',
  description: 'Thank you for your order.',
  robots: { index: false, follow: false },
};

type OrderSummary = {
  paid: boolean;
  email: string | null;
  total: string | null;
  lines: { name: string; quantity: number; amount: string }[];
};

/** Read the real session from Stripe. Never trust the URL alone. */
async function loadOrder(sessionId: string | undefined): Promise<OrderSummary | null> {
  if (!sessionId) return null;
  const stripe = getStripe();
  if (!stripe) return null;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['line_items'] });
    const money = (cents: number | null | undefined) =>
      typeof cents === 'number' ? `$${(cents / 100).toFixed(2)}` : null;

    return {
      paid: session.payment_status === 'paid',
      email: session.customer_details?.email ?? null,
      total: money(session.amount_total),
      lines: (session.line_items?.data ?? []).map((li) => ({
        name: li.description ?? 'Item',
        quantity: li.quantity ?? 1,
        amount: money(li.amount_total) ?? '',
      })),
    };
  } catch {
    return null;
  }
}

export default async function CheckoutSuccessPage(props: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await props.searchParams;
  const order = await loadOrder(sessionId);
  const paid = order?.paid ?? false;

  return (
    <main>
      {paid && <ClearCart />}

      <PageHero
        title={paid ? 'Order Confirmed' : 'Order Received'}
        eyebrow="Thank You"
        subtitle={
          paid
            ? 'Your payment went through and your order is on its way.'
            : 'We are still confirming this payment with our provider.'
        }
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Order Confirmed' }]}
        bottleSlug="longevity-30"
      />

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div className="rounded-2xl border border-beige-dark bg-white p-8 sm:p-10 shadow-[0_20px_50px_-30px_rgba(27,42,74,0.35)]">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="mt-1 h-8 w-8 flex-shrink-0 text-gold" aria-hidden="true" />
              <div>
                <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-navy">
                  {paid ? 'Thank you for your order' : 'Thank you'}
                </h2>
                <p className="mt-2 text-muted">
                  {paid ? (
                    <>
                      A confirmation
                      {order?.email ? (
                        <>
                          {' '}
                          has been sent to <span className="font-semibold text-navy">{order.email}</span>
                        </>
                      ) : (
                        ' has been sent to your email'
                      )}
                      , along with the full product manual for everything you ordered.
                    </>
                  ) : (
                    'If you were charged, your confirmation will arrive by email shortly. Contact us if anything looks wrong.'
                  )}
                </p>
              </div>
            </div>

            {order && order.lines.length > 0 && (
              <div className="mt-8 border-t border-beige-dark pt-6">
                <h3 className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-gold-deep">
                  Your Order
                </h3>
                <ul className="mt-4 space-y-3">
                  {order.lines.map((line, i) => (
                    <li key={`${line.name}-${i}`} className="flex items-baseline justify-between gap-4 text-sm">
                      <span className="text-ink">
                        {line.name}
                        <span className="text-muted"> x {line.quantity}</span>
                      </span>
                      <span className="font-semibold text-navy">{line.amount}</span>
                    </li>
                  ))}
                </ul>
                {order.total && (
                  <div className="mt-4 flex items-baseline justify-between border-t border-beige-dark pt-4">
                    <span className="font-heading text-sm font-bold uppercase tracking-wide text-navy">Total</span>
                    <span className="font-heading text-xl font-bold text-navy">{order.total}</span>
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl bg-beige/60 p-4">
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-deep" aria-hidden="true" />
                <p className="text-sm text-ink">
                  Your product manuals arrive by email. They cover ingredients, dosage, what to expect, and safety.
                </p>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-beige/60 p-4">
                <Package className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-deep" aria-hidden="true" />
                <p className="text-sm text-ink">
                  Orders are packed and dispatched within one to two business days.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-light px-8 py-3 font-heading text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-gold/20 transition-shadow duration-300 hover:shadow-xl"
              >
                Continue Shopping
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-navy/20 px-8 py-3 font-heading text-sm font-bold uppercase tracking-wider text-navy transition-colors duration-300 hover:bg-navy/5"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
