import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { products, getTrendingProducts } from '@/lib/products';

export default function HomePage() {
  <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">

  <h1 className="text-xl font-semibold tracking-widest">
    MODERN STYLE CO
    <div className="text-center py-20">

  <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
    Own the Look of Luxury
  </h1>

  <p className="text-gray-400 mt-4 text-lg">
    Premium Watches. Iconic Style. Everyday Confidence.
  </p>

  <button className="mt-6 px-8 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 active:scale-95">
    Shop Now
  </button>

</div>
  </h1>

  <div className="flex gap-6 text-sm text-gray-400">
    <span className="hover:text-white cursor-pointer">Shop</span>
    <span className="hover:text-white cursor-pointer">Cart</span>
  </div>

</div>
  const featured  = products.slice(0, 4);
  const trending  = getTrendingProducts().slice(0, 4);
  const watches   = products.filter(p => p.category === 'watches');

  return (
    <div style={{ background: '#080808' }}>

      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1920&q=85"
            alt="Luxury watch hero"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.7) 50%, rgba(8,8,8,0.85) 100%)' }}
          />
          {/* Gold particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-px h-px rounded-full"
                style={{
                  background: '#C9A84C',
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.1,
                  transform: 'scale(2)',
                  animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Pre-title */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 opacity-50" style={{ background: '#C9A84C' }} />
            <span
              className="text-[11px] tracking-[0.5em] uppercase"
              style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}
            >
              ✦ Premium Collection 2024
            </span>
            <div className="h-px w-16 opacity-50" style={{ background: '#C9A84C' }} />
          </div>

          {/* Main heading */}
          <h1
            className="mb-6 leading-none"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}
          >
            <span
              className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-2"
              style={{ color: '#fff', letterSpacing: '-0.02em' }}
            >
              Own the
            </span>
            <span
              className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl"
              style={{
                background: 'linear-gradient(135deg, #C9A84C 0%, #E8C96B 40%, #f0d890 60%, #C9A84C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% auto',
                animation: 'shimmer 3s linear infinite',
                letterSpacing: '-0.02em',
              }}
            >
              Look of Luxury
            </span>
          </h1>

          <p
            className="text-base sm:text-lg mb-10 max-w-lg mx-auto"
            style={{ color: '#888', fontFamily: 'Jost, sans-serif', fontWeight: 300, lineHeight: 1.8 }}
          >
            Premium watches, perfumes & accessories.
            <br />
            <span style={{ color: '#C9A84C' }}>Luxury look. Affordable price. Everyday confidence.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/shop"
              className="group relative px-10 py-4 text-xs tracking-[0.3em] uppercase font-semibold overflow-hidden transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #C9A84C, #E8C96B)',
                color: '#000',
                fontFamily: 'Jost, sans-serif',
                minWidth: 200,
              }}
            >
              <span className="relative z-10">Shop the Collection</span>
              <span className="absolute inset-0 w-0 group-hover:w-full transition-all duration-500" style={{ background: 'rgba(255,255,255,0.15)' }} />
            </Link>
            <Link
              href="/shop?cat=watches"
              className="px-10 py-4 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 hover:text-gold"
              style={{
                border: '1px solid rgba(201,168,76,0.4)',
                color: '#C9A84C',
                fontFamily: 'Jost, sans-serif',
                minWidth: 200,
                textAlign: 'center',
              }}
            >
              View Watches
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-14 flex items-center justify-center gap-8">
            {[
              { value: '500+', label: 'Happy Customers' },
              { value: '100%', label: 'Secure Payments' },
              { value: 'COD', label: 'Available' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-xl font-display"
                  style={{ color: '#C9A84C', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem' }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-[10px] tracking-widest uppercase mt-1"
                  style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: '#444', fontFamily: 'Jost, sans-serif' }}>Scroll</span>
          <div className="w-px h-12 overflow-hidden" style={{ background: '#1a1a1a' }}>
            <div
              className="w-full"
              style={{
                height: '50%',
                background: '#C9A84C',
                animation: 'scrollLine 1.5s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRUST TICKER
      ═══════════════════════════════════════════ */}
      <div className="py-3 overflow-hidden" style={{ borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', background: '#0a0a0a' }}>
        <div
          className="whitespace-nowrap text-[11px] tracking-[0.3em] uppercase inline-block"
          style={{ color: '#444', fontFamily: 'Jost, sans-serif', animation: 'ticker 25s linear infinite' }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>
              &nbsp;&nbsp;&nbsp;&nbsp;✦ Trusted by 500+ Customers &nbsp;&nbsp;&nbsp;&nbsp;✦ Free Shipping Across India &nbsp;&nbsp;&nbsp;&nbsp;✦ Cash on Delivery &nbsp;&nbsp;&nbsp;&nbsp;✦ Secure Razorpay Checkout &nbsp;&nbsp;&nbsp;&nbsp;✦ Premium Quality Promise
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          CATEGORIES
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}>
              ✦ Explore
            </p>
            <h2
              className="text-4xl sm:text-5xl font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff' }}
            >
              Our Collections
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: 'Watches',
                sublabel: '3 Products',
                href: '/shop?cat=watches',
                image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80',
              },
              {
                label: 'Perfumes',
                sublabel: '2 Products',
                href: '/shop?cat=perfumes',
                image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80',
              },
              {
                label: 'Accessories',
                sublabel: 'Belts, Sunglasses & Shoes',
                href: '/shop?cat=accessories',
                image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80',
              },
            ].map((cat, i) => (
              <Link
                key={i}
                href={cat.href}
                className="group relative overflow-hidden cursor-pointer"
                style={{ aspectRatio: i === 1 ? '1/1.4' : '1/1.2', display: 'block' }}
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(0deg, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.3) 60%, transparent 100%)',
                    opacity: 0.9,
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3
                    className="text-2xl sm:text-3xl font-light mb-1 transition-transform duration-300 group-hover:-translate-y-1"
                    style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff' }}
                  >
                    {cat.label}
                  </h3>
                  <p className="text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}>
                    Shop Now →
                  </p>
                </div>
                <div
                  className="absolute top-4 right-4 px-3 py-1 text-[9px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(201,168,76,0.9)', color: '#000', fontFamily: 'Jost, sans-serif' }}
                >
                  {cat.sublabel}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURED PRODUCTS
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}>
                ✦ Hand-Picked
              </p>
              <h2
                className="text-4xl sm:text-5xl font-light"
                style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff' }}
              >
                Featured Products
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs tracking-[0.2em] uppercase transition-colors hover:text-gold flex items-center gap-2"
              style={{ color: '#555', fontFamily: 'Jost, sans-serif' }}
            >
              View All
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product as any} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BRAND PROMISE BANNER
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 60%)' }}
        />
        <div
          className="absolute top-0 left-0 w-px h-full"
          style={{ background: 'linear-gradient(180deg, transparent, #C9A84C, transparent)' }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="h-px mb-12" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
          <p
            className="text-[11px] tracking-[0.5em] uppercase mb-4"
            style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}
          >
            ✦ Our Promise
          </p>
          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-light leading-tight mb-8"
            style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff' }}
          >
            "Luxury Look.<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #C9A84C, #E8C96B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Affordable Price.
            </span>
            <br />
            Everyday Confidence."
          </h2>
          <p
            className="text-sm mb-10 max-w-md mx-auto leading-relaxed"
            style={{ color: '#666', fontFamily: 'Jost, sans-serif', fontWeight: 300 }}
          >
            We believe everyone deserves to feel premium. Our curated collection brings luxury aesthetics to your everyday life — without the luxury price tag.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            {[
              { icon: '⌚', label: 'Premium Quality' },
              { icon: '📦', label: 'Free Shipping' },
              { icon: '💳', label: 'COD Available' },
              { icon: '✦', label: '500+ Happy Buyers' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-5 py-3"
                style={{ border: '1px solid #1a1a1a', background: 'rgba(201,168,76,0.03)' }}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="text-xs tracking-widest uppercase" style={{ color: '#888', fontFamily: 'Jost, sans-serif' }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <div className="h-px mt-12" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRENDING NOW
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}>
              🔥 Hot Right Now
            </p>
            <h2
              className="text-4xl sm:text-5xl font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff' }}
            >
              Trending Now
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {trending.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          INSTAGRAM / SOCIAL PROOF
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}>
            ✦ Community
          </p>
          <h2
            className="text-4xl font-light mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff' }}
          >
            As Seen on Instagram
          </h2>
          <p className="text-sm mb-10" style={{ color: '#666', fontFamily: 'Jost, sans-serif' }}>
            @modernstyleco · Follow us for daily luxury inspiration
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-10">
            {[
              'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
              'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&q=80',
              'https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&q=80',
              'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80',
              'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&q=80',
              'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&q=80',
            ].map((src, i) => (
              <div key={i} className="group relative overflow-hidden" style={{ aspectRatio: '1' }}>
                <Image
                  src={src}
                  alt="Instagram post"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 33vw, 17vw"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.5)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07..." />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://instagram.com/modernstyleco"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300"
            style={{
              border: '1px solid rgba(201,168,76,0.4)',
              color: '#C9A84C',
              fontFamily: 'Jost, sans-serif',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
            </svg>
            Follow @modernstyleco
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════ */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1920&q=80"
            alt="CTA Background"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(8,8,8,0.88)' }}
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p
            className="text-[11px] tracking-[0.5em] uppercase mb-5"
            style={{ color: '#C9A84C', fontFamily: 'Jost, sans-serif' }}
          >
            ✦ Limited Stock Available
          </p>
          <h2
            className="text-4xl sm:text-6xl font-light mb-6"
            style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff', lineHeight: 1.1 }}
          >
            Your Style.
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #C9A84C, #E8C96B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Elevated.
            </span>
          </h2>
          <p className="text-sm mb-10" style={{ color: '#777', fontFamily: 'Jost, sans-serif', fontWeight: 300, lineHeight: 1.8 }}>
            Join 500+ customers who chose to look premium every day.
            <br />Shop now before stock runs out.
          </p>
          <Link
            href="/shop"
            className="inline-block px-14 py-4 text-xs tracking-[0.3em] uppercase font-bold transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #C9A84C, #E8C96B)',
              color: '#000',
              fontFamily: 'Jost, sans-serif',
            }}
          >
            Shop the Collection →
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes shimmer { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }
        @keyframes ticker  { 0% { transform: translateX(0); }        100% { transform: translateX(-50%); } }
        @keyframes scrollLine { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .hover\\:text-gold:hover { color: #C9A84C !important; }
      `}</style>
    </div>
  );
}
