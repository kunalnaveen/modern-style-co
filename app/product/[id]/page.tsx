'use client';

import { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { getProductById, products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import toast from 'react-hot-toast';

export default function ProductPage() {
  const params  = useParams();
  const product = getProductById(params.id as string);

  const [activeImg, setActiveImg]   = useState(0);
  const [qty, setQty]               = useState(1);
  const { addItem }                 = useCart();

  if (!product) return notFound();

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    toast.success(`${qty}× ${product.name} added to cart ✦`);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    window.location.href = '/checkout';
  };

  const savings = product.originalPrice - product.price;

  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 90 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] tracking-widest uppercase mb-10" style={{ color: '#444', fontFamily: 'Jost, sans-serif' }}>
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>›</span>
          <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <span>›</span>
          <Link href={`/shop?cat=${product.category}`} className="hover:text-gold transition-colors capitalize">{product.category}</Link>
          <span>›</span>
          <span style={{ color: '#C9A84C' }}>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">

          {/* ── Images ── */}
          <div>
            {/* Main image */}
            <div
              className="relative overflow-hidden mb-3"
              style={{ aspectRatio: '4/5', background: '#111', border: '1px solid #1a1a1a' }}
            >
              <Image
                src={product.images[activeImg]}
                alt={product.name}
                fill
                className="object-cover transition-all duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />

              {/* Badge */}
              <span
                className="absolute top-4 left-4 text-[10px] tracking-widest uppercase px-3 py-1.5"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C, #E8C96B)',
                  color: '#000',
                  fontFamily: 'Jost, sans-serif',
                  fontWeight: 700,
                }}
              >
                {product.badge}
              </span>

              {product.stock <= 4 && (
                <div
                  className="absolute bottom-0 left-0 right-0 py-2 text-center text-xs font-semibold tracking-widest uppercase"
                  style={{ background: 'rgba(201,168,76,0.9)', color: '#000', fontFamily: 'Jost, sans-serif' }}
                >
                  ⚡ Only {product.stock} Left in Stock!
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="relative overflow-hidden transition-all duration-200"
                    style={{
                      width: 70,
                      height: 80,
                      border: `1px solid ${activeImg === i ? '#C9A84C' : '#1a1a1a'}`,
                      opacity: activeImg === i ? 1 : 0.6,
                    }}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info ── */}
          <div className="flex flex-col">
            <p
              className="text-[10px] tracking-[0.4em] uppercase mb-2"
              style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}
            >
              {product.category}
            </p>

            <h1
              className="text-3xl sm:text-4xl font-light mb-4"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff', lineHeight: 1.15 }}
            >
              {product.name}
            </h1>

            {/* Rating mock */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= 4 ? '#C9A84C' : 'none'} stroke="#C9A84C" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="text-xs" style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}>
                4.8 (127 reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-2">
              <span
                className="text-4xl font-semibold"
                style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}
              >
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span
                className="text-lg line-through"
                style={{ color: '#333', fontFamily: 'Jost, sans-serif' }}
              >
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span
                className="text-sm font-bold px-2 py-0.5"
                style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}
              >
                {product.discount}% OFF
              </span>
            </div>
            <p className="text-xs mb-6" style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}>
              You save ₹{savings.toLocaleString('en-IN')} on this order
            </p>

            <div className="h-px mb-6" style={{ background: '#1a1a1a' }} />

            {/* Description */}
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: '#888', fontFamily: 'Jost, sans-serif', lineHeight: 1.9 }}
            >
              {product.description}
            </p>

            {/* Specs */}
            <div className="mb-8">
              <h3
                className="text-xs tracking-[0.3em] uppercase mb-3"
                style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}
              >
                Product Details
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.specs?.map((spec, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-3 py-1.5 tracking-wide"
                    style={{
                      background: '#0f0f0f',
                      border: '1px solid #1e1e1e',
                      color: '#777',
                      fontFamily: 'Jost, sans-serif',
                    }}
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Qty + Cart */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="flex items-center"
                style={{ border: '1px solid #222', background: '#0f0f0f' }}
              >
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-12 flex items-center justify-center text-lg transition-colors hover:text-gold"
                  style={{ color: '#777' }}
                >
                  −
                </button>
                <span
                  className="w-10 text-center text-sm font-medium"
                  style={{ color: '#fff', fontFamily: 'Jost, sans-serif' }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                  className="w-10 h-12 flex items-center justify-center text-lg transition-colors hover:text-gold"
                  style={{ color: '#777' }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 h-12 text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300"
                style={{
                  background: 'transparent',
                  border: '1px solid #C9A84C',
                  color: '#C9A84C',
                  fontFamily: 'Jost, sans-serif',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLButtonElement).style.background = 'rgba(201,168,76,0.1)';
                }}
                onMouseLeave={e => {
                  (e.target as HTMLButtonElement).style.background = 'transparent';
                }}
              >
                Add to Cart
              </button>
            </div>

            {/* Buy Now — sticky feel */}
            <button
              onClick={handleBuyNow}
              className="w-full h-14 text-xs tracking-[0.3em] uppercase font-bold transition-all duration-300 mb-6"
              style={{
                background: 'linear-gradient(135deg, #C9A84C 0%, #E8C96B 50%, #C9A84C 100%)',
                backgroundSize: '200% auto',
                color: '#000',
                fontFamily: 'Jost, sans-serif',
                animation: 'shimmerBtn 3s linear infinite',
              }}
            >
              ⚡ Buy Now — ₹{(product.price * qty).toLocaleString('en-IN')}
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: '🚚', text: 'Free Shipping' },
                { icon: '💳', text: 'COD Available' },
                { icon: '✦', text: 'Secure Payment' },
              ].map((b, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1 py-3 text-center"
                  style={{ border: '1px solid #1a1a1a', background: '#0a0a0a' }}
                >
                  <span className="text-base">{b.icon}</span>
                  <span className="text-[10px] tracking-wide uppercase" style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}>
                    {b.text}
                  </span>
                </div>
              ))}
            </div>

            {/* WhatsApp order */}
            <a
              href={`https://wa.me/919999999999?text=Hi%21+I+want+to+order+${encodeURIComponent(product.name)}+(₹${product.price})&qty=${qty}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 mt-3 text-xs tracking-widest uppercase transition-all duration-200"
              style={{
                background: 'rgba(37,211,102,0.1)',
                border: '1px solid rgba(37,211,102,0.25)',
                color: '#25D366',
                fontFamily: 'Jost, sans-serif',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order via WhatsApp
            </a>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <div className="text-center mb-10">
              <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, #1a1a1a, transparent)' }} />
              <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}>
                ✦ You May Also Like
              </p>
              <h2
                className="text-3xl font-light"
                style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff' }}
              >
                Related Products
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .hover\\:text-gold:hover { color: #C9A84C !important; }
        @keyframes shimmerBtn {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}
