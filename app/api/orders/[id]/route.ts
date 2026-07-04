import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const cleanId = rawId.trim();
    console.log("Looking up order with ID:", cleanId);
    await connectDB();

    const order = await Order.findById(cleanId);

    if (!order) {
      console.log("Order not found in DB for ID:", cleanId);
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Fetch order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
