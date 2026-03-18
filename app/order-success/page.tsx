'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function OrderSuccessPage() {
  const params  = useSearchParams();
  const orderId = params.get('orderId') || 'MSC-XXXXX';
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: '#080808', paddingTop: 80 }}
    >
      <div
        className="max-w-lg w-full text-center py-16 px-8 transition-all duration-700"
        style={{
          background: '#0f0f0f',
          border: '1px solid rgba(201,168,76,0.2)',
          opacity: show ? 1 : 0,
          transform: show ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        {/* Animated checkmark */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid rgba(201,168,76,0.3)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
          <div
            className="absolute inset-2 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.4)' }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        <p
          className="text-[10px] tracking-[0.5em] uppercase mb-3"
          style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}
        >
          ✦ Order Confirmed
        </p>
        <h1
          className="text-4xl font-light mb-3"
          style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff' }}
        >
          Thank You!
        </h1>
        <p className="text-sm mb-2" style={{ color: '#888', fontFamily: 'Jost, sans-serif', lineHeight: 1.8 }}>
          Your order has been placed successfully.
          <br />
          We'll contact you shortly to confirm delivery.
        </p>

        <div
          className="my-6 py-4 px-6"
          style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)' }}
        >
          <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}>
            Order ID
          </p>
          <p
            className="text-xl"
            style={{
              color: '#C9A84C',
              fontFamily: 'Cormorant Garamond, serif',
              letterSpacing: '0.1em',
            }}
          >
            #{orderId}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: '📦', text: 'Processing Started' },
            { icon: '🚚', text: 'Ships in 1-3 Days' },
            { icon: '🏠', text: 'Delivered in 5-7 Days' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <span className="text-lg block mb-1">{s.icon}</span>
              <p className="text-[10px] tracking-wide" style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}>
                {s.text}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <Link
            href="/shop"
            className="block w-full py-3.5 text-xs tracking-[0.25em] uppercase font-bold"
            style={{
              background: 'linear-gradient(135deg, #C9A84C, #E8C96B)',
              color: '#000',
              fontFamily: 'Jost, sans-serif',
            }}
          >
            Continue Shopping
          </Link>
          <a
            href="https://wa.me/919999999999?text=Hi%21+My+order+ID+is+%23{orderId}+I+have+a+query."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 text-xs tracking-widest uppercase"
            style={{
              background: 'rgba(37,211,102,0.08)',
              border: '1px solid rgba(37,211,102,0.2)',
              color: '#25D366',
              fontFamily: 'Jost, sans-serif',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Track via WhatsApp
          </a>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
