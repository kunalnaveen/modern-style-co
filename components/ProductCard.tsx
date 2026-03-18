'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/products';
import toast from 'react-hot-toast';

interface Props {
  product: Product;
  index?: number;
}

const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  'Best Seller':     { bg: '#C9A84C', text: '#000' },
  'Limited Edition': { bg: '#fff', text: '#000' },
  'Trending':        { bg: 'rgba(201,168,76,0.15)', text: '#C9A84C' },
  'New Arrival':     { bg: 'transparent', text: '#C9A84C' },
  'Hot Deal':        { bg: '#ef4444', text: '#fff' },
};

export default function ProductCard({ product, index = 0 }: Props) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart ✦`, { duration: 2000 });
  };

  const badgeStyle = BADGE_COLORS[product.badge] ?? { bg: '#C9A84C', text: '#000' };

  return (
    <div
      className="product-card group cursor-pointer"
      style={{
        animationDelay: `${index * 0.08}s`,
        animationFillMode: 'both',
      }}
    >
      <Link href={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '4/5', background: '#111' }}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 25vw"
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 60%)' }}
          />

          {/* Badge */}
          <span
            className="absolute top-3 left-3 badge text-[10px]"
            style={{
              background: badgeStyle.bg,
              color: badgeStyle.text,
              border: product.badge === 'New Arrival' ? '1px solid #C9A84C' : 'none',
              letterSpacing: '0.12em',
              fontFamily: 'Jost, sans-serif',
              padding: '3px 8px',
            }}
          >
            {product.badge}
          </span>

          {/* Trending tag */}
          {product.trending && (
            <span
              className="absolute top-3 right-3 text-[9px] px-2 py-1"
              style={{ background: 'rgba(0,0,0,0.7)', color: '#C9A84C', letterSpacing: '0.1em', fontFamily: 'Jost, sans-serif' }}
            >
              🔥 HOT
            </span>
          )}

          {/* Stock warning */}
          {product.stock <= 4 && (
            <div
              className="absolute bottom-0 left-0 right-0 py-1.5 text-center text-[10px] tracking-wider transition-all duration-300 translate-y-full group-hover:translate-y-0"
              style={{ background: 'rgba(201,168,76,0.9)', color: '#000', fontFamily: 'Jost, sans-serif', fontWeight: 600 }}
            >
              Only {product.stock} left!
            </div>
          )}

          {/* Quick add button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-8 left-4 right-4 py-2.5 text-[11px] tracking-widest font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
            style={{
              background: 'linear-gradient(135deg, #C9A84C, #E8C96B)',
              color: '#000',
              fontFamily: 'Jost, sans-serif',
              letterSpacing: '0.15em',
            }}
          >
            QUICK ADD
          </button>
        </div>

        {/* Info */}
        <div className="p-4">
          <p
            className="text-[10px] tracking-widest uppercase mb-1"
            style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}
          >
            {product.category}
          </p>
          <h3
            className="text-sm font-medium mb-2 group-hover:text-gold transition-colors truncate"
            style={{ color: '#eee', fontFamily: 'Jost, sans-serif' }}
          >
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span
              className="text-base font-semibold"
              style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}
            >
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span
              className="text-xs line-through"
              style={{ color: '#444', fontFamily: 'Jost, sans-serif' }}
            >
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
            <span
              className="text-[10px] ml-auto font-semibold"
              style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}
            >
              {product.discount}% OFF
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
