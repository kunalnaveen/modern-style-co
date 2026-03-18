'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function CartDrawer() {
  const { state, removeItem, updateQty, toggleCart, totalPrice, totalItems } = useCart();

  return (
    <>
      {/* Overlay */}
      {state.isOpen && (
        <div
          className="fixed inset-0 z-[998] bg-black/70 backdrop-blur-sm"
          onClick={toggleCart}
        />
      )}

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-md z-[999] flex flex-col"
        style={{
          background: '#0F0F0F',
          borderLeft: '1px solid rgba(201,168,76,0.2)',
          transform: state.isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.25,0.8,0.25,1)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#1a1a1a' }}>
          <div>
            <h2 className="text-xl font-display tracking-widest" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A84C' }}>
              Your Cart
            </h2>
            <p className="text-xs mt-0.5" style={{ color: '#666', fontFamily: 'Jost, sans-serif', letterSpacing: '0.1em' }}>
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button onClick={toggleCart} className="p-2 transition-colors hover:text-gold" style={{ color: '#666' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6">
              <div className="w-16 h-16 rounded-full border border-[#222] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </div>
              <p className="text-sm text-center" style={{ color: '#666', fontFamily: 'Jost, sans-serif' }}>
                Your cart is empty.<br />Add something luxurious.
              </p>
              <Link href="/shop" onClick={toggleCart} className="btn-gold px-6 py-2.5 text-xs">
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="px-4 space-y-3">
              {state.items.map(item => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded"
                  style={{ background: '#141414', border: '1px solid #1e1e1e' }}
                >
                  <div className="w-16 h-16 relative flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: '#eee', fontFamily: 'Jost, sans-serif' }}>
                      {item.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}>
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-sm rounded transition-colors"
                          style={{ background: '#1a1a1a', color: '#999', border: '1px solid #222' }}
                        >
                          −
                        </button>
                        <span className="text-xs w-4 text-center" style={{ color: '#ddd' }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-sm rounded transition-colors"
                          style={{ background: '#1a1a1a', color: '#999', border: '1px solid #222' }}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs transition-colors hover:text-red-400"
                        style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="p-6 border-t" style={{ borderColor: '#1a1a1a' }}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm" style={{ color: '#888', fontFamily: 'Jost, sans-serif', letterSpacing: '0.05em' }}>
                SUBTOTAL
              </span>
              <span className="text-xl font-display" style={{ color: '#C9A84C', fontFamily: 'Cormorant Garamond, serif' }}>
                ₹{totalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-xs mb-4 text-center" style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}>
              Free shipping on all orders ✦ COD available
            </p>
            <Link
              href="/checkout"
              onClick={toggleCart}
              className="btn-gold w-full py-3.5 text-center text-xs tracking-widest flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/cart"
              onClick={toggleCart}
              className="block text-center text-xs mt-3 transition-colors hover:text-gold"
              style={{ color: '#555', fontFamily: 'Jost, sans-serif', letterSpacing: '0.1em' }}
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>

      <style>{`
        .btn-gold {
          background: linear-gradient(135deg, #C9A84C 0%, #E8C96B 50%, #C9A84C 100%);
          color: #000;
          font-family: Jost, sans-serif;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .btn-gold:hover { box-shadow: 0 0 20px rgba(201,168,76,0.4); }
        .hover\\:text-gold:hover { color: #C9A84C !important; }
      `}</style>
    </>
  );
}
