# 🖤 Modern Style Co. — Luxury E-Commerce Website

> Premium first-copy luxury watches, perfumes & accessories for India's ambitious generation.
> **Luxury Look. Affordable Price. Everyday Confidence.**

---

## ⚡ Quick Start (5 Minutes)

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB Atlas account (free) — or run without DB using in-memory fallback

---

## 🛠 Setup Instructions

### Step 1 — Clone & Install

```bash
# Navigate into the project
cd modern-style-co

# Install all dependencies
npm install
```

### Step 2 — Configure Environment

```bash
# Copy the template
cp .env.local .env.local.bak
```

Edit `.env.local` and fill in your values:

```env
# ─── REQUIRED: MongoDB ─────────────────────────
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/modern-style-co

# ─── REQUIRED: Razorpay ────────────────────────
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXX

# ─── WhatsApp Number (with country code) ───────
NEXT_PUBLIC_WHATSAPP_NUMBER=919999999999

# ─── Site URL ──────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://modernstyleco.in
```

> **Note:** The site works WITHOUT MongoDB and Razorpay for testing.  
> MongoDB missing → orders stored in memory (lost on restart)  
> Razorpay missing → only COD payment works  

### Step 3 — Run Locally

```bash
npm run dev
```

Visit → **http://localhost:3000**

---

## 📄 Pages Overview

| URL | Page | Description |
|-----|------|-------------|
| `/` | Home | Hero, categories, products, social proof |
| `/shop` | Shop | All products, filter by category & price |
| `/product/[id]` | Product | Detail page, gallery, add to cart |
| `/cart` | Cart | Review items, quantities |
| `/checkout` | Checkout | Delivery + Payment (Razorpay / COD) |
| `/order-success` | Success | Confirmation + order ID |
| `/admin` | Admin Panel | Manage products & view orders |

---

## 💳 Payment Setup

### Razorpay (UPI, Cards, NetBanking)

1. Create account at [razorpay.com](https://razorpay.com)
2. Go to **Settings → API Keys**
3. Generate Test Keys first
4. Add to `.env.local`:
   ```
   RAZORPAY_KEY_ID=rzp_test_...
   RAZORPAY_KEY_SECRET=...
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
   ```
5. To go live: Switch to Live Keys in Razorpay dashboard

### Cash on Delivery
Works out of the box — no configuration needed.

---

## 🗄 Database Setup (MongoDB Atlas)

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create **Free Cluster** (M0)
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (allow all — for development)
5. Click **Connect → Drivers** → copy connection string
6. Paste into `MONGODB_URI` in `.env.local`

---

## 🛒 How to Add/Edit Products

### Method 1 — Admin Panel (Easiest)
1. Go to `/admin`
2. Password: `admin123` (change in code)
3. Click **"+ Add Product"** tab
4. Fill in product details
5. Submit

### Method 2 — Edit JSON file (Recommended for bulk)
Edit `/data/products.json` directly:

```json
{
  "id": "watch-004",
  "name": "Your Watch Name",
  "category": "watches",
  "price": 1999,
  "originalPrice": 6999,
  "discount": 71,
  "stock": 5,
  "badge": "New Arrival",
  "trending": true,
  "description": "Your luxury description here...",
  "images": ["https://your-image-url.jpg"],
  "specs": ["Stainless Steel", "Water Resistant", "Leather Strap"]
}
```

**Categories:** `watches` | `perfumes` | `accessories`  
**Badges:** `Best Seller` | `Limited Edition` | `Trending` | `New Arrival` | `Hot Deal`

---

## 🚀 Deploy to Vercel (Free)

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit — Modern Style Co."
git branch -M main
git remote add origin https://github.com/yourusername/modern-style-co.git
git push -u origin main
```

### Step 2 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo
3. Click **Deploy** (auto-detects Next.js)

### Step 3 — Add Environment Variables
1. In Vercel dashboard → **Settings → Environment Variables**
2. Add all variables from `.env.local`
3. **Redeploy** the project

### Step 4 — Live URL
Vercel gives you: `https://modern-style-co.vercel.app`

---

## 🌐 Connect Custom Domain

### On Vercel:
1. **Settings → Domains**
2. Add `modernstyleco.in`
3. Copy the DNS records shown

### On your Domain Registrar (GoDaddy / Namecheap):
1. Go to DNS Management
2. Add the **CNAME** or **A record** from Vercel
3. Wait 24-48 hours for propagation

---

## 📱 WhatsApp Integration

Update your WhatsApp number in `.env.local`:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=919751942682
```
Format: Country code + number (no spaces, no +)

The floating WhatsApp button will appear on all pages automatically.

---

## 🎨 Customization

### Change Brand Colors
Edit `tailwind.config.ts` → `colors.gold`:
```ts
gold: {
  DEFAULT: '#C9A84C',  // Main gold
  light:   '#E8C96B',  // Light gold
  dark:    '#A07838',  // Dark gold
}
```

### Change Products
Edit `/data/products.json` — all products are there.

### Change Fonts
Edit `/app/globals.css` → update Google Fonts import.

### Change Admin Password
Edit `/app/admin/page.tsx`:
```ts
if (password === 'your_new_password') { setAuthed(true); }
```

---

## 📂 Project Structure

```
modern-style-co/
├── app/
│   ├── page.tsx              ← Home page
│   ├── shop/page.tsx         ← Shop page
│   ├── product/[id]/page.tsx ← Product detail
│   ├── cart/page.tsx         ← Cart
│   ├── checkout/page.tsx     ← Checkout
│   ├── order-success/page.tsx← Order confirmation
│   ├── admin/page.tsx        ← Admin panel
│   ├── api/
│   │   ├── orders/route.ts         ← Create/get orders
│   │   └── orders/razorpay/route.ts← Razorpay order
│   ├── globals.css           ← Global styles + luxury theme
│   └── layout.tsx            ← Root layout
├── components/
│   ├── Navbar.tsx            ← Navigation
│   ├── Footer.tsx            ← Footer + ticker
│   ├── CartDrawer.tsx        ← Slide-in cart
│   ├── ProductCard.tsx       ← Product card
│   └── LoadingScreen.tsx     ← Luxury loading animation
├── context/
│   └── CartContext.tsx       ← Cart state management
├── data/
│   └── products.json         ← All product data
├── lib/
│   ├── db.ts                 ← MongoDB connection
│   └── products.ts           ← Product utilities
├── .env.local                ← Your secrets (don't commit!)
├── tailwind.config.ts        ← Design tokens
└── next.config.js            ← Next.js config
```

---

## ✨ Features Built

- ✅ Luxury loading screen with animated rings
- ✅ Sticky navbar with scroll effect
- ✅ Hero with parallax & gold particle effects
- ✅ Category showcase with hover animations
- ✅ Product grid with quick-add button
- ✅ Slide-in cart drawer (localStorage persistent)
- ✅ Product detail with image gallery
- ✅ "Only X left" stock urgency
- ✅ Fake strike pricing with % off
- ✅ "Trending Now" + "Best Seller" badges
- ✅ Sticky Buy Now button on product page
- ✅ Full checkout with form validation
- ✅ Razorpay integration (UPI, Cards, Wallets)
- ✅ Cash on Delivery option
- ✅ Order success page with order ID
- ✅ Admin panel (products + orders)
- ✅ WhatsApp floating button
- ✅ Instagram feed section
- ✅ Marquee trust ticker
- ✅ Mobile-first responsive design
- ✅ Dark luxury theme (black + gold)
- ✅ Cormorant Garamond + Jost fonts
- ✅ Smooth animations everywhere

---

## 📞 Support

Need help? WhatsApp the store number or open a GitHub issue.

> Built for **Modern Style Co.** — Making luxury accessible to India's ambitious generation.
body {
  background: #0a0a0a;
  color: #ffffff;
  font-family: Arial, sans-serif;
}

* {
  transition: all 0.3s ease;
}