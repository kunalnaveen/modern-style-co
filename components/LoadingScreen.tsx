'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 400);
          return 100;
        }
        return p + 3;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div
      id="loading-screen"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-700 ${progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{ background: '#080808' }}
    >
      {/* Animated rings */}
      <div className="relative w-24 h-24 mb-8">
        <div
          className="absolute inset-0 rounded-full border border-gold"
          style={{
            animation: 'spin 3s linear infinite',
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
          }}
        />
        <div
          className="absolute inset-2 rounded-full border border-gold-light"
          style={{
            animation: 'spin 2s linear infinite reverse',
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            opacity: 0.6,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-display text-gold-gradient">M</span>
        </div>
      </div>

      <h1
        className="font-display text-3xl tracking-[0.3em] text-gold-gradient mb-2 uppercase"
        style={{ fontFamily: 'Cormorant Garamond, serif' }}
      >
        Modern Style Co.
      </h1>
      <p
        className="text-xs tracking-[0.4em] text-muted uppercase mb-10"
        style={{ color: '#555', fontFamily: 'Jost, sans-serif', letterSpacing: '0.35em' }}
      >
        Luxury. Reimagined.
      </p>

      {/* Progress bar */}
      <div className="w-48 h-px bg-[#1a1a1a] relative overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full transition-all duration-100"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #C9A84C, #E8C96B)',
          }}
        />
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .text-gold-gradient {
          background: linear-gradient(135deg, #C9A84C, #E8C96B, #C9A84C);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}
