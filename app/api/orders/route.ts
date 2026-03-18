import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// In-memory store as fallback (replace with MongoDB in production)
const ordersStore: any[] = [];

export async function POST(req: NextRequest) {
  try {
    const body    = await req.json();
    const orderId = `MSC-${uuidv4().slice(0, 8).toUpperCase()}`;

    const order = {
      orderId,
      ...body,
      createdAt: new Date().toISOString(),
    };

    // Try MongoDB if available
    try {
      const dbConnect = (await import('@/lib/db')).default;
      await dbConnect();
      const { default: mongoose } = await import('mongoose');

      const OrderSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
      const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
      const saved = await Order.create(order);

      return NextResponse.json({ success: true, orderId: saved.orderId }, { status: 201 });
    } catch (dbErr) {
      // Fallback to in-memory
      ordersStore.push(order);
      return NextResponse.json({ success: true, orderId }, { status: 201 });
    }
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const dbConnect = (await import('@/lib/db')).default;
    await dbConnect();
    const { default: mongoose } = await import('mongoose');

    const OrderSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
    const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
    const orders = await Order.find({}).sort({ createdAt: -1 }).limit(100);

    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ orders: ordersStore });
  }
}
