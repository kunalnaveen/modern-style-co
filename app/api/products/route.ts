import { NextRequest, NextResponse } from 'next/server';
import productsData from '@/data/products.json';

const productsStore = [...productsData] as any[];

export async function GET() {
  return NextResponse.json({ products: productsStore });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    productsStore.push(body);
    return NextResponse.json({ success: true, product: body }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}
