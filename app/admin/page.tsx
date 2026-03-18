'use client';

import { useState, useEffect } from 'react';
import { products as localProducts } from '@/lib/products';
import Image from 'next/image';

type Tab = 'products' | 'orders' | 'add';

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_HINT || 'admin123';

export default function AdminPage() {
  const [authed,    setAuthed]    = useState(false);
  const [password,  setPassword]  = useState('');
  const [tab,       setTab]       = useState<Tab>('products');
  const [orders,    setOrders]    = useState<any[]>([]);
  const [loading,   setLoading]   = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', category: 'watches', price: '', originalPrice: '',
    stock: '', badge: 'Best Seller', description: '', imageUrl: '',
  });

  const handleLogin = () => {
    if (password === 'admin123') { setAuthed(true); }
    else alert('Wrong password');
  };

  useEffect(() => {
    if (authed && tab === 'orders') fetchOrders();
  }, [authed, tab]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res  = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data.orders || []);
    } catch { setOrders([]); }
    finally  { setLoading(false); }
  };

  const handleAddProduct = async () => {
    try {
      const res  = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProduct,
          price:         Number(newProduct.price),
          originalPrice: Number(newProduct.originalPrice),
          stock:         Number(newProduct.stock),
          discount:      Math.round((1 - Number(newProduct.price) / Number(newProduct.originalPrice)) * 100),
          images:        [newProduct.imageUrl],
          trending:      false,
          specs:         [],
          id:            `prod-${Date.now()}`,
        }),
      });
      if (res.ok) { alert('Product added!'); setTab('products'); }
    } catch { alert('Failed to add product'); }
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#080808' }}>
        <div
          className="w-full max-w-sm p-8"
          style={{ background: '#0f0f0f', border: '1px solid rgba(201,168,76,0.2)' }}
        >
          <h1
            className="text-2xl font-light text-center mb-6"
            style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff' }}
          >
            Admin Access
          </h1>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="w-full px-4 py-3 text-sm mb-4 outline-none"
            style={{
              background: '#0a0a0a', border: '1px solid #222',
              color: '#fff', fontFamily: 'Jost, sans-serif',
            }}
          />
          <button
            onClick={handleLogin}
            className="w-full py-3 text-xs tracking-[0.25em] uppercase font-bold"
            style={{
              background: 'linear-gradient(135deg, #C9A84C, #E8C96B)',
              color: '#000', fontFamily: 'Jost, sans-serif',
            }}
          >
            Login
          </button>
          <p className="text-xs text-center mt-3" style={{ color: '#333', fontFamily: 'Jost, sans-serif' }}>
            Default password: admin123 · Change in .env
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 80 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase mb-1" style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}>
              ✦ Dashboard
            </p>
            <h1
              className="text-3xl font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff' }}
            >
              Admin Panel
            </h1>
          </div>
          <button
            onClick={() => setAuthed(false)}
            className="text-xs tracking-widest uppercase px-4 py-2"
            style={{ border: '1px solid #222', color: '#666', fontFamily: 'Jost, sans-serif' }}
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Products', value: localProducts.length },
            { label: 'Total Orders',   value: orders.length },
            { label: 'Revenue',        value: '₹' + orders.reduce((s, o) => s + (o.total || 0), 0).toLocaleString('en-IN') },
            { label: 'Stock Alerts',   value: localProducts.filter(p => p.stock <= 3).length },
          ].map(stat => (
            <div
              key={stat.label}
              className="p-5"
              style={{ background: '#0f0f0f', border: '1px solid #1a1a1a' }}
            >
              <p className="text-2xl font-display mb-1" style={{ color: '#C9A84C', fontFamily: 'Cormorant Garamond, serif' }}>
                {stat.value}
              </p>
              <p className="text-xs tracking-widest uppercase" style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          {(['products', 'orders', 'add'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-5 py-2 text-xs tracking-widest uppercase transition-all duration-200"
              style={{
                fontFamily: 'Jost, sans-serif',
                background: tab === t ? 'linear-gradient(135deg, #C9A84C, #E8C96B)' : 'transparent',
                color:      tab === t ? '#000' : '#666',
                border:     `1px solid ${tab === t ? '#C9A84C' : '#1a1a1a'}`,
                fontWeight: tab === t ? 600 : 400,
              }}
            >
              {t === 'add' ? '+ Add Product' : t}
            </button>
          ))}
        </div>

        {/* Products Tab */}
        {tab === 'products' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {localProducts.map(p => (
              <div
                key={p.id}
                className="p-4"
                style={{ background: '#0f0f0f', border: '1px solid #1a1a1a' }}
              >
                <div className="relative mb-3 overflow-hidden" style={{ aspectRatio: '1', background: '#111' }}>
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="200px" />
                </div>
                <p className="text-sm font-medium mb-1 truncate" style={{ color: '#eee', fontFamily: 'Jost, sans-serif' }}>{p.name}</p>
                <p className="text-xs mb-2 capitalize" style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}>{p.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}>₹{p.price.toLocaleString('en-IN')}</span>
                  <span
                    className="text-[10px] px-2 py-0.5"
                    style={{
                      background: p.stock <= 3 ? 'rgba(239,68,68,0.15)' : 'rgba(201,168,76,0.1)',
                      color: p.stock <= 3 ? '#ef4444' : '#C9A84C',
                      fontFamily: 'Jost, sans-serif',
                    }}
                  >
                    Stock: {p.stock}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Orders Tab */}
        {tab === 'orders' && (
          <div>
            {loading ? (
              <div className="text-center py-10" style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}>Loading orders...</div>
            ) : orders.length === 0 ? (
              <div className="text-center py-10" style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}>
                No orders yet.<br />
                <span className="text-xs" style={{ color: '#333' }}>Orders will appear here after customers place them.</span>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order, i) => (
                  <div
                    key={i}
                    className="p-5 flex flex-col sm:flex-row gap-4 justify-between"
                    style={{ background: '#0f0f0f', border: '1px solid #1a1a1a' }}
                  >
                    <div>
                      <p className="text-xs font-semibold mb-1" style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif', letterSpacing: '0.1em' }}>
                        #{order.orderId || order._id?.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-sm" style={{ color: '#eee', fontFamily: 'Jost, sans-serif' }}>
                        {order.customer?.name}
                      </p>
                      <p className="text-xs" style={{ color: '#666', fontFamily: 'Jost, sans-serif' }}>
                        {order.customer?.phone} · {order.customer?.city}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg" style={{ color: '#C9A84C', fontFamily: 'Cormorant Garamond, serif' }}>
                        ₹{order.total?.toLocaleString('en-IN')}
                      </p>
                      <div className="flex gap-2 justify-end mt-1">
                        <span
                          className="text-[10px] px-2 py-0.5 tracking-wide"
                          style={{
                            background: order.paymentStatus === 'paid' ? 'rgba(74,222,128,0.1)' : 'rgba(201,168,76,0.1)',
                            color: order.paymentStatus === 'paid' ? '#4ade80' : '#C9A84C',
                            fontFamily: 'Jost, sans-serif',
                          }}
                        >
                          {order.paymentStatus === 'paid' ? '✓ Paid' : 'COD'}
                        </span>
                        <span
                          className="text-[10px] px-2 py-0.5 tracking-wide capitalize"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            color: '#888',
                            fontFamily: 'Jost, sans-serif',
                          }}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add Product Tab */}
        {tab === 'add' && (
          <div className="max-w-lg">
            <div className="p-6" style={{ background: '#0f0f0f', border: '1px solid #1a1a1a' }}>
              <h2 className="text-xl font-light mb-5" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff' }}>
                Add New Product
              </h2>
              <div className="space-y-4">
                {[
                  { name: 'name',          label: 'Product Name',     type: 'text',   placeholder: 'Rolex Submariner Black' },
                  { name: 'price',         label: 'Selling Price (₹)',type: 'number', placeholder: '1999' },
                  { name: 'originalPrice', label: 'Original MRP (₹)', type: 'number', placeholder: '6499' },
                  { name: 'stock',         label: 'Stock Quantity',   type: 'number', placeholder: '5' },
                  { name: 'imageUrl',      label: 'Image URL',        type: 'text',   placeholder: 'https://...' },
                  { name: 'description',   label: 'Description',      type: 'text',   placeholder: 'Luxury watch...' },
                ].map(field => (
                  <div key={field.name}>
                    <label className="block text-[10px] tracking-widest uppercase mb-1.5" style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={newProduct[field.name as keyof typeof newProduct]}
                      onChange={e => setNewProduct(p => ({ ...p, [field.name]: e.target.value }))}
                      className="w-full px-4 py-2.5 text-sm outline-none"
                      style={{ background: '#0a0a0a', border: '1px solid #222', color: '#fff', fontFamily: 'Jost, sans-serif' }}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-[10px] tracking-widest uppercase mb-1.5" style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}>
                    Category
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))}
                    className="w-full px-4 py-2.5 text-sm outline-none"
                    style={{ background: '#0a0a0a', border: '1px solid #222', color: '#fff', fontFamily: 'Jost, sans-serif' }}
                  >
                    <option value="watches">Watches</option>
                    <option value="perfumes">Perfumes</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <button
                  onClick={handleAddProduct}
                  className="w-full py-3.5 text-xs tracking-[0.25em] uppercase font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #C9A84C, #E8C96B)',
                    color: '#000', fontFamily: 'Jost, sans-serif',
                  }}
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
