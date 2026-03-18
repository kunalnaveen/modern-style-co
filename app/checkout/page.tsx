'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';

type PaymentMethod = 'razorpay' | 'cod';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { state, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: '',
  });
  const [payment, setPayment] = useState<PaymentMethod>('cod');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const required = ['name', 'phone', 'address', 'city', 'state', 'pincode'];
    for (const field of required) {
      if (!form[field as keyof typeof form].trim()) {
        toast.error(`Please fill in your ${field}`);
        return false;
      }
    }
    if (form.phone.length < 10) { toast.error('Enter valid phone number'); return false; }
    return true;
  };

  const placeOrder = async () => {
    if (!validateForm()) return;
    if (state.items.length === 0) { toast.error('Your cart is empty'); return; }
    setLoading(true);

    const orderPayload = {
      customer: form,
      items: state.items.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.quantity })),
      total: totalPrice,
      paymentMethod: payment,
    };

    if (payment === 'cod') {
      try {
        const res  = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...orderPayload, status: 'confirmed', paymentStatus: 'pending_cod' }),
        });
        const data = await res.json();
        clearCart();
        router.push(`/order-success?orderId=${data.orderId}`);
      } catch {
        toast.error('Something went wrong. Try again.');
        setLoading(false);
      }
      return;
    }

    // Razorpay flow
    try {
      const rzpRes  = await fetch('/api/orders/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice }),
      });
      const rzpData = await rzpRes.json();

      const script  = document.createElement('script');
      script.src    = 'https://checkout.razorpay.com/v1/checkout.js';
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key:         process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount:      rzpData.amount,
          currency:    'INR',
          name:        'Modern Style Co.',
          description: 'Premium Luxury Products',
          order_id:    rzpData.id,
          prefill:     { name: form.name, email: form.email, contact: form.phone },
          theme:       { color: '#C9A84C' },
          handler: async (response: any) => {
            const verifyRes  = await fetch('/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...orderPayload,
                razorpay: response,
                status: 'confirmed',
                paymentStatus: 'paid',
              }),
            });
            const verifyData = await verifyRes.json();
            clearCart();
            router.push(`/order-success?orderId=${verifyData.orderId}`);
          },
          modal: { ondismiss: () => { setLoading(false); } },
        };
        new window.Razorpay(options).open();
      };
    } catch {
      toast.error('Payment initialization failed. Try COD.');
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 100 }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        <div className="mb-10">
          <p className="text-[10px] tracking-[0.5em] uppercase mb-2" style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}>
            ✦ Final Step
          </p>
          <h1
            className="text-4xl sm:text-5xl font-light"
            style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff' }}
          >
            Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ─── Form ─── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Delivery Info */}
            <div className="p-6" style={{ background: '#0f0f0f', border: '1px solid #1a1a1a' }}>
              <h2
                className="text-lg font-light mb-5 pb-4 border-b"
                style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff', borderColor: '#1a1a1a' }}
              >
                Delivery Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'name',    label: 'Full Name',    type: 'text',  placeholder: 'Rahul Sharma',        colSpan: 1 },
                  { name: 'email',   label: 'Email',        type: 'email', placeholder: 'rahul@gmail.com',     colSpan: 1 },
                  { name: 'phone',   label: 'Phone Number', type: 'tel',   placeholder: '+91 99999 99999',      colSpan: 2 },
                  { name: 'address', label: 'Full Address', type: 'text',  placeholder: 'Flat no, Street, Area', colSpan: 2 },
                  { name: 'city',    label: 'City',         type: 'text',  placeholder: 'Mumbai',               colSpan: 1 },
                  { name: 'state',   label: 'State',        type: 'text',  placeholder: 'Maharashtra',          colSpan: 1 },
                  { name: 'pincode', label: 'Pincode',      type: 'text',  placeholder: '400001',               colSpan: 1 },
                ].map(field => (
                  <div
                    key={field.name}
                    className={field.colSpan === 2 ? 'sm:col-span-2' : ''}
                  >
                    <label
                      className="block text-[10px] tracking-[0.2em] uppercase mb-1.5"
                      style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}
                    >
                      {field.label} <span style={{ color: '#C9A84C' }}>*</span>
                    </label>
                    <input
                      name={field.name}
                      type={field.type}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="input-luxury w-full px-4 py-3 text-sm"
                      style={{
                        background: '#0a0a0a',
                        border: '1px solid #222',
                        color: '#fff',
                        fontFamily: 'Jost, sans-serif',
                        outline: 'none',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="p-6" style={{ background: '#0f0f0f', border: '1px solid #1a1a1a' }}>
              <h2
                className="text-lg font-light mb-5 pb-4 border-b"
                style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff', borderColor: '#1a1a1a' }}
              >
                Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'razorpay' as PaymentMethod,
                    title: 'Online Payment',
                    subtitle: 'UPI, Cards, Net Banking',
                    icon: '💳',
                    badge: 'Recommended',
                  },
                  {
                    id: 'cod' as PaymentMethod,
                    title: 'Cash on Delivery',
                    subtitle: 'Pay when you receive',
                    icon: '🚚',
                    badge: 'Popular',
                  },
                ].map(method => (
                  <button
                    key={method.id}
                    onClick={() => setPayment(method.id)}
                    className="relative flex items-start gap-4 p-4 text-left transition-all duration-200"
                    style={{
                      border: `1px solid ${payment === method.id ? '#C9A84C' : '#222'}`,
                      background: payment === method.id ? 'rgba(201,168,76,0.05)' : 'transparent',
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ borderColor: payment === method.id ? '#C9A84C' : '#333' }}
                    >
                      {payment === method.id && (
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#C9A84C' }} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{method.icon}</span>
                        <span className="text-sm font-medium" style={{ color: '#eee', fontFamily: 'Jost, sans-serif' }}>
                          {method.title}
                        </span>
                        <span
                          className="text-[9px] px-2 py-0.5 tracking-widest uppercase"
                          style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}
                        >
                          {method.badge}
                        </span>
                      </div>
                      <p className="text-xs mt-1" style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}>
                        {method.subtitle}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {payment === 'razorpay' && (
                <div
                  className="mt-4 p-3 text-xs"
                  style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)', color: '#888', fontFamily: 'Jost, sans-serif' }}
                >
                  🔒 Secured by Razorpay · 256-bit SSL · Supports UPI, Paytm, Cards
                </div>
              )}

              {payment === 'cod' && (
                <div
                  className="mt-4 p-3 text-xs"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1a1a1a', color: '#666', fontFamily: 'Jost, sans-serif' }}
                >
                  ✓ COD available across India · Pay in cash when your order arrives
                </div>
              )}
            </div>
          </div>

          {/* ─── Order Summary ─── */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-24 p-6"
              style={{ background: '#0f0f0f', border: '1px solid #1a1a1a' }}
            >
              <h2
                className="text-lg font-light mb-4 pb-4 border-b"
                style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff', borderColor: '#1a1a1a' }}
              >
                Order Summary
              </h2>

              <div className="space-y-3 mb-4 max-h-52 overflow-y-auto pr-1">
                {state.items.map(item => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="relative w-12 h-14 flex-shrink-0 overflow-hidden" style={{ border: '1px solid #1a1a1a' }}>
                      <Image src={item.images[0]} alt={item.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs truncate" style={{ color: '#ccc', fontFamily: 'Jost, sans-serif' }}>{item.name}</p>
                      <p className="text-[11px]" style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}>Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm flex-shrink-0" style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>

              <div className="h-px mb-4" style={{ background: '#1a1a1a' }} />

              <div className="space-y-2 mb-4">
                {[
                  { label: 'Subtotal',  value: `₹${totalPrice.toLocaleString('en-IN')}` },
                  { label: 'Shipping',  value: 'FREE' },
                  { label: 'Payment',   value: payment === 'cod' ? 'Cash on Delivery' : 'Online' },
                ].map(r => (
                  <div key={r.label} className="flex justify-between">
                    <span className="text-xs" style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}>{r.label}</span>
                    <span className="text-xs" style={{ color: '#999', fontFamily: 'Jost, sans-serif' }}>{r.value}</span>
                  </div>
                ))}
              </div>

              <div className="h-px mb-4" style={{ background: '#1a1a1a' }} />
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm tracking-widest uppercase" style={{ color: '#777', fontFamily: 'Jost, sans-serif' }}>Total</span>
                <span className="text-2xl" style={{ color: '#C9A84C', fontFamily: 'Cormorant Garamond, serif' }}>
                  ₹{totalPrice.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={placeOrder}
                disabled={loading}
                className="w-full py-4 text-xs tracking-[0.25em] uppercase font-bold transition-all duration-300 disabled:opacity-60"
                style={{
                  background: loading ? '#888' : 'linear-gradient(135deg, #C9A84C, #E8C96B)',
                  color: '#000',
                  fontFamily: 'Jost, sans-serif',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading
                  ? '⏳ Processing...'
                  : payment === 'cod'
                    ? '📦 Place Order (COD)'
                    : '💳 Pay Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
