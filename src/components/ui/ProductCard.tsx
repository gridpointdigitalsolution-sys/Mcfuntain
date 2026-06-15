'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, ArrowRight, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  name: string;
  slug: string;
  tagline: string;
  price: string;
  imageFolder: string;
  signatureColor: string;
  series: string;
  /** The numeric small-size price used for adding to cart */
  numericPrice?: number;
  index?: number;
}

export default function ProductCard({
  name,
  slug,
  tagline,
  price,
  imageFolder,
  signatureColor,
  series,
  numericPrice,
  index = 0,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Parse numeric price from the display string if not provided directly
    const parsedPrice =
      numericPrice ?? (parseFloat(price.replace(/[^0-9.]/g, '')) || 0);

    addItem({
      productId: slug,
      name,
      price: parsedPrice,
      imageFolder,
      size: 'small',
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={`/shop/${slug}`} className="group block">
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-[0_20px_60px_-15px_rgba(212,160,23,0.2)] hover:-translate-y-2 transition-all duration-700 border border-beige-dark/30 hover:border-gold/40">
          {/* Series Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-white rounded-full"
              style={{ backgroundColor: signatureColor }}
            >
              {series}
            </span>
          </div>

          {/* Product Image — fills top half edge-to-edge */}
          <div className="relative h-64 sm:h-72 overflow-hidden">
            <Image
              src={`${imageFolder}/bottle-1.jpg`}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
              <span className="inline-flex items-center gap-2 bg-white text-ink px-6 py-2.5 rounded-full text-sm font-semibold">
                View Details <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-5 pt-4">
            <h3 className="font-heading text-xl font-bold text-ink leading-snug group-hover:text-gold-deep transition-colors duration-300">
              {name}
            </h3>
            <p className="mt-1.5 text-base text-muted leading-relaxed line-clamp-2">
              {tagline}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold text-ink">
                {price}
              </span>
              <button
                onClick={handleAddToCart}
                className={`inline-flex items-center justify-center w-11 h-11 rounded-full text-white transition-all duration-300 hover:scale-115 hover:shadow-lg hover:shadow-gold/25 active:scale-95 cursor-pointer ${
                  added ? 'bg-gold-deep' : ''
                }`}
                style={added ? undefined : { backgroundColor: signatureColor }}
                aria-label={`Add ${name} to cart`}
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="w-4.5 h-4.5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="cart"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ShoppingCart className="w-4.5 h-4.5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Bottom accent line */}
          <div
            className="h-1 w-full transition-all duration-500 group-hover:h-1.5"
            style={{ background: `linear-gradient(to right, ${signatureColor}, #D4A017)` }}
          />
        </div>
      </Link>
    </motion.div>
  );
}
