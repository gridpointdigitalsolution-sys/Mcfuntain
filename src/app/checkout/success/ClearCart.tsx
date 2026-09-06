'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';

/**
 * Empties the cart once, after a confirmed payment. Rendered only on the
 * success page, which is reached only with a paid Stripe session.
 */
export default function ClearCart() {
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return null;
}
