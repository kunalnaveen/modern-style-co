import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
      {/* Ticker */}
      <div
        className="py-2.5 overflow-hidden border-b"
        style={{ background: 'rgba(201,168,76,0.05)', borderColor: 'rgba(201,168,76,0.15)' }}
      >
        <div className="ticker-content text-[11px] tracking-[0.3em] uppercase whitespace-nowrap" style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>
              &nbsp;&nbsp;&nbsp;&nbsp;✦ Free Shipping On All Orders &nbsp;&nbsp;&nbsp;&nbsp;✦ Cash On Delivery Available &nbsp;&nbsp;&nbsp;&nbsp;✦ 500+ Happy Customers &nbsp;&nbsp;&nbsp;&nbsp;✦ Premium Quality Guaranteed &nbsp;&nbsp;&nbsp;&nbsp;✦ Secure Payments Via Razorpay
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h2
              className="text-3xl font-display tracking-widest mb-2 uppercase"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                background: 'linear-gradient(135deg, #C9A84C, #E8C96B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Modern Style Co.
            </h2>
            <p className="text-[10px] tracking-[0.4em] uppercase mb-5" style={{ color: '#444', fontFamily: 'Jost, sans-serif' }}>
              Luxury. Reimagined.
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#555', fontFamily: 'Jost, sans-serif', maxWidth: 300 }}>
              Premium first-copy luxury watches, perfumes, and accessories for the ambitious generation. Look expensive without paying the price.
            </p>
            {/* Social links */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border transition-all duration-300 hover:border-gold hover:text-gold"
                style={{ borderColor: '#222', color: '#555' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border transition-all duration-300 hover:border-gold hover:text-gold"
                style={{ borderColor: '#222', color: '#555' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: '#666', fontFamily: 'Jost, sans-serif' }}>
              Shop
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/shop', label: 'All Products' },
                { href: '/shop?cat=watches', label: 'Watches' },
                { href: '/shop?cat=perfumes', label: 'Perfumes' },
                { href: '/shop?cat=accessories', label: 'Accessories' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors hover:text-gold" style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: '#666', fontFamily: 'Jost, sans-serif' }}>
              Support
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/shipping', label: 'Shipping Policy' },
                { href: '/returns', label: 'Returns & Refunds' },
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/contact', label: 'Contact Us' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors hover:text-gold" style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h4 className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#666', fontFamily: 'Jost, sans-serif' }}>
                We Accept
              </h4>
              <div className="flex gap-2 flex-wrap">
                {['UPI', 'Card', 'COD', 'NetBanking'].map(p => (
                  <span
                    key={p}
                    className="text-[9px] px-2 py-1 border tracking-widest"
                    style={{ borderColor: '#222', color: '#555', fontFamily: 'Jost, sans-serif' }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: '#1a1a1a' }}>
          <p className="text-xs" style={{ color: '#333', fontFamily: 'Jost, sans-serif', letterSpacing: '0.1em' }}>
            © 2024 Modern Style Co. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: '#2a2a2a', fontFamily: 'Jost, sans-serif', letterSpacing: '0.1em' }}>
            Luxury Look. Affordable Price. Everyday Confidence. ✦
          </p>
        </div>
      </div>

      <style>{`
        .ticker-content {
          display: inline-block;
          animation: ticker 40s linear infinite;
        }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .hover\\:text-gold:hover { color: #C9A84C !important; }
        .hover\\:border-gold:hover { border-color: #C9A84C !important; }
      `}</style>
    </footer>
  );
}
