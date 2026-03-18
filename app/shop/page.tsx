'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { products, categories, Product } from '@/lib/products';

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹999', min: 0, max: 999 },
  { label: '₹999 – ₹1,999', min: 999, max: 1999 },
  { label: '₹2,000 & Above', min: 2000, max: Infinity },
];

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Biggest Discount', value: 'discount' },
];

export default function ShopPage() {
  const searchParams  = useSearchParams();
  const catParam      = searchParams.get('cat') || 'all';

  const [activeCategory, setActiveCategory] = useState(catParam);
  const [priceRange,     setPriceRange]      = useState(0);
  const [sortBy,         setSortBy]          = useState('featured');
  const [filtered,       setFiltered]        = useState<Product[]>(products);

  useEffect(() => {
    setActiveCategory(catParam);
  }, [catParam]);

  useEffect(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Price filter
    const range = PRICE_RANGES[priceRange];
    result = result.filter(p => p.price >= range.min && p.price <= range.max);

    // Sort
    switch (sortBy) {
      case 'price_asc':  result.sort((a, b) => a.price - b.price); break;
      case 'price_desc': result.sort((a, b) => b.price - a.price); break;
      case 'discount':   result.sort((a, b) => b.discount - a.discount); break;
    }

    setFiltered(result);
  }, [activeCategory, priceRange, sortBy]);

  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 100 }}>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.5em] uppercase mb-3" style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}>
            ✦ Premium Collection
          </p>
          <h1
            className="text-5xl sm:text-6xl font-light"
            style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff' }}
          >
            Shop All
          </h1>
          <div className="h-px w-24 mx-auto mt-4" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 flex-wrap justify-center mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-5 py-2 text-xs tracking-widest uppercase transition-all duration-200"
              style={{
                fontFamily: 'Jost, sans-serif',
                background:   activeCategory === cat.id ? 'linear-gradient(135deg, #C9A84C, #E8C96B)' : 'transparent',
                color:        activeCategory === cat.id ? '#000' : '#777',
                border:       `1px solid ${activeCategory === cat.id ? '#C9A84C' : '#222'}`,
                fontWeight:   activeCategory === cat.id ? 600 : 400,
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Filters Row */}
        <div
          className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between p-4"
          style={{ background: '#0f0f0f', border: '1px solid #1a1a1a' }}
        >
          <div className="flex gap-3 flex-wrap">
            {PRICE_RANGES.map((r, i) => (
              <button
                key={i}
                onClick={() => setPriceRange(i)}
                className="text-[11px] px-3 py-1.5 transition-all duration-200 tracking-wide"
                style={{
                  fontFamily: 'Jost, sans-serif',
                  background: priceRange === i ? 'rgba(201,168,76,0.15)' : 'transparent',
                  color:      priceRange === i ? '#C9A84C' : '#555',
                  border:     `1px solid ${priceRange === i ? 'rgba(201,168,76,0.4)' : 'transparent'}`,
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] tracking-widest uppercase" style={{ color: '#444', fontFamily: 'Jost, sans-serif' }}>Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-xs py-1.5 px-3 outline-none cursor-pointer"
              style={{
                background: '#141414',
                border: '1px solid #222',
                color: '#aaa',
                fontFamily: 'Jost, sans-serif',
              }}
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <p className="text-xs" style={{ color: '#444', fontFamily: 'Jost, sans-serif' }}>
            {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-3xl font-display mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#333' }}>
              No products found
            </p>
            <p className="text-sm" style={{ color: '#444', fontFamily: 'Jost, sans-serif' }}>
              Try a different filter combination
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
