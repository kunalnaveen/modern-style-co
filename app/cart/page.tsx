'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { state, removeItem, updateQty, totalPrice, totalItems } = useCart();

  if (state.items.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: '#080808', paddingTop: 100 }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ border: '1px solid #1a1a1a' }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>
        <h1
          className="text-3xl font-light mb-3"
          style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff' }}
        >
          Your Cart is Empty
        </h1>
        <p className="text-sm mb-8" style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}>
          Explore our premium collection and add something luxurious.
        </p>
        <Link
          href="/shop"
          className="px-10 py-3.5 text-xs tracking-[0.25em] uppercase font-semibold"
          style={{
            background: 'linear-gradient(135deg, #C9A84C, #E8C96B)',
            color: '#000',
            fontFamily: 'Jost, sans-serif',
          }}
        >
          Shop Now
        </Link>
      </div>
    );
  }

  const shipping = 0;
  const total    = totalPrice + shipping;

  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 100 }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        <div className="mb-10">
          <p className="text-[10px] tracking-[0.5em] uppercase mb-2" style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}>
            ✦ Review Order
          </p>
          <h1
            className="text-4xl sm:text-5xl font-light"
            style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff' }}
          >
            Your Cart ({totalItems})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {state.items.map(item => (
              <div
                key={item.id}
                className="flex gap-4 p-4"
                style={{ background: '#0f0f0f', border: '1px solid #1a1a1a' }}
              >
                <Link href={`/product/${item.id}`} className="relative flex-shrink-0 overflow-hidden" style={{ width: 90, height: 105 }}>
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="90px"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <Link
                      href={`/product/${item.id}`}
                      className="text-sm font-medium hover:text-gold transition-colors truncate pr-4"
                      style={{ color: '#eee', fontFamily: 'Jost, sans-serif' }}
                    >
                      {item.name}
                    </Link>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[10px] tracking-widest uppercase flex-shrink-0 transition-colors hover:text-red-400"
                      style={{ color: '#444', fontFamily: 'Jost, sans-serif' }}
                    >
                      Remove
                    </button>
                  </div>

                  <p className="text-xs mb-1 capitalize" style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}>
                    {item.category}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty control */}
                    <div className="flex items-center" style={{ border: '1px solid #222' }}>
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center transition-colors hover:text-gold"
                        style={{ color: '#666' }}
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm" style={{ color: '#ddd', fontFamily: 'Jost, sans-serif' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center transition-colors hover:text-gold"
                        style={{ color: '#666' }}
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-semibold" style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}>
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                      <p className="text-[11px]" style={{ color: '#444', fontFamily: 'Jost, sans-serif' }}>
                        ₹{item.price.toLocaleString('en-IN')} each
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-24 p-6"
              style={{ background: '#0f0f0f', border: '1px solid #1a1a1a' }}
            >
              <h2
                className="text-xl font-light mb-6 pb-4 border-b"
                style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff', borderColor: '#1a1a1a' }}
              >
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                {[
                  { label: 'Subtotal', value: `₹${totalPrice.toLocaleString('en-IN')}` },
                  { label: 'Shipping', value: 'FREE ✦' },
                  { label: 'You Save', value: `-₹${state.items.reduce((s, i) => s + (i.originalPrice - i.price) * i.quantity, 0).toLocaleString('en-IN')}` },
                ].map(r => (
                  <div key={r.label} className="flex justify-between items-center">
                    <span className="text-xs tracking-wide uppercase" style={{ color: '#666', fontFamily: 'Jost, sans-serif' }}>
                      {r.label}
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        color: r.label === 'You Save' ? '#4caf50' : r.label === 'Shipping' ? '#C9A84C' : '#ccc',
                        fontFamily: 'Jost, sans-serif',
                        fontWeight: 500,
                      }}
                    >
                      {r.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px mb-4" style={{ background: '#1a1a1a' }} />
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm tracking-widest uppercase" style={{ color: '#888', fontFamily: 'Jost, sans-serif' }}>Total</span>
                <span className="text-2xl font-display" style={{ color: '#C9A84C', fontFamily: 'Cormorant Garamond, serif' }}>
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>

              <Link
                href="/checkout"
                className="block w-full text-center py-4 text-xs tracking-[0.3em] uppercase font-bold mb-3 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C, #E8C96B)',
                  color: '#000',
                  fontFamily: 'Jost, sans-serif',
                }}
              >
                Proceed to Checkout →
              </Link>

              <Link
                href="/shop"
                className="block w-full text-center py-3 text-xs tracking-widest uppercase transition-all duration-200"
                style={{ border: '1px solid #1a1a1a', color: '#555', fontFamily: 'Jost, sans-serif' }}
              >
                Continue Shopping
              </Link>

              <p className="text-[10px] text-center mt-4" style={{ color: '#333', fontFamily: 'Jost, sans-serif' }}>
                🔒 Secure Checkout via Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hover\\:text-gold:hover { color: #C9A84C !important; }
        .hover\\:text-red-400:hover { color: #f87171 !important; }
      `}</style>
    </div>
  );
}
