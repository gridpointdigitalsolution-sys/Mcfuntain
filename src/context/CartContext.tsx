'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageFolder: string;
  size: 'small' | 'large';
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (productId: string, size: 'small' | 'large') => void;
  updateQuantity: (productId: string, size: 'small' | 'large', quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  getItemDiscount: (quantity: number) => number;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'mcfuntain-cart';

function getQuantityDiscount(quantity: number): number {
  if (quantity >= 3) return 0.30;
  if (quantity >= 2) return 0.20;
  return 0;
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // Silently ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage on every change (after initial hydration)
  useEffect(() => {
    if (hydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {
        // Storage full or unavailable
      }
    }
  }, [items, hydrated]);

  // Add item (merges quantity if same productId + size already exists)
  const addItem = useCallback(
    (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
      const qty = item.quantity ?? 1;
      setItems((prev) => {
        const idx = prev.findIndex(
          (i) => i.productId === item.productId && i.size === item.size,
        );
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = {
            ...updated[idx],
            quantity: updated[idx].quantity + qty,
          };
          return updated;
        }
        return [
          ...prev,
          {
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: qty,
            imageFolder: item.imageFolder,
            size: item.size,
          },
        ];
      });
    },
    [],
  );

  // Remove item by productId + size
  const removeItem = useCallback(
    (productId: string, size: 'small' | 'large') => {
      setItems((prev) =>
        prev.filter((i) => !(i.productId === productId && i.size === size)),
      );
    },
    [],
  );

  // Update quantity for a specific item; removes if quantity drops to 0
  const updateQuantity = useCallback(
    (productId: string, size: 'small' | 'large', quantity: number) => {
      setItems((prev) => {
        if (quantity <= 0) {
          return prev.filter(
            (i) => !(i.productId === productId && i.size === size),
          );
        }
        return prev.map((i) =>
          i.productId === productId && i.size === size
            ? { ...i, quantity }
            : i,
        );
      });
    },
    [],
  );

  // Clear all items
  const clearCart = useCallback(() => setItems([]), []);

  // Derived totals
  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, i) => {
      const lineTotal = i.price * i.quantity;
      const discount = getQuantityDiscount(i.quantity);
      return sum + lineTotal * (1 - discount);
    }, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      getItemDiscount: getQuantityDiscount,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, getQuantityDiscount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
