'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { totalItems, toggleCart } = useCart();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        style={{
          background: scrolled
            ? 'rgba(8,8,8,0.95)'
            : 'linear-gradient(180deg, rgba(8,8,8,0.8) 0%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start group">
            <span
              className="text-xl sm:text-2xl font-display tracking-widest text-gold-gradient uppercase"
              style={{ fontFamily: 'Cormorant Garamond, serif', lineHeight: 1 }}
            >
              Modern Style
            </span>
            <span
              className="text-[9px] tracking-[0.45em] uppercase"
              style={{ color: '#888', fontFamily: 'Jost, sans-serif', marginTop: 2 }}
            >
              Co. ✦ Est. 2024
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { href: '/', label: 'Home' },
              { href: '/shop', label: 'Shop' },
              { href: '/shop?cat=watches', label: 'Watches' },
              { href: '/shop?cat=perfumes', label: 'Perfumes' },
              { href: '/shop?cat=accessories', label: 'Accessories' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-widest uppercase transition-colors duration-200 hover:text-gold"
                style={{ color: '#aaa', fontFamily: 'Jost, sans-serif', letterSpacing: '0.15em' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleCart}
              className="relative flex items-center gap-2 px-4 py-2 btn-gold text-[11px] tracking-widest"
              style={{ borderRadius: 0 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              Cart
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
                  style={{ background: '#C9A84C', color: '#000' }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="block w-5 h-px transition-all duration-300"
                  style={{
                    background: '#C9A84C',
                    transform: menuOpen
                      ? i === 0 ? 'rotate(45deg) translateY(6px)' : i === 2 ? 'rotate(-45deg) translateY(-6px)' : 'scaleX(0)'
                      : 'none',
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-400"
          style={{
            maxHeight: menuOpen ? '400px' : '0',
            background: 'rgba(8,8,8,0.98)',
            borderTop: menuOpen ? '1px solid rgba(201,168,76,0.2)' : 'none',
          }}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {[
              { href: '/', label: 'Home' },
              { href: '/shop', label: 'All Products' },
              { href: '/shop?cat=watches', label: 'Watches' },
              { href: '/shop?cat=perfumes', label: 'Perfumes' },
              { href: '/shop?cat=accessories', label: 'Accessories' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-widest uppercase py-2 border-b"
                style={{
                  color: '#ccc',
                  borderColor: '#1a1a1a',
                  fontFamily: 'Jost, sans-serif',
                  letterSpacing: '0.15em',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <style>{`
        .text-gold-gradient {
          background: linear-gradient(135deg, #C9A84C, #E8C96B, #C9A84C);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .text-gold { color: #C9A84C !important; }
        .btn-gold {
          background: linear-gradient(135deg, #C9A84C 0%, #E8C96B 50%, #C9A84C 100%);
          color: #000;
          font-family: Jost, sans-serif;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .btn-gold:hover { box-shadow: 0 0 20px rgba(201,168,76,0.4); transform: translateY(-1px); }
      `}</style>
    </>
  );
}
