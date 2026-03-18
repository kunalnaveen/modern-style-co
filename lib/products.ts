import productsData from '@/data/products.json';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  stock: number;
  badge: string;
  trending: boolean;
  description: string;
  images: string[];
  specs: string[];
}

export const products = productsData;

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
}

export function getTrendingProducts(): Product[] {
  return products.filter(p => p.trending);
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 4);
}

export const categories = [
  { id: 'all',         label: 'All Products', icon: '✦' },
  { id: 'watches',     label: 'Watches',       icon: '⌚' },
  { id: 'perfumes',    label: 'Perfumes',      icon: '✿' },
  { id: 'accessories', label: 'Accessories',   icon: '◈' },
];
