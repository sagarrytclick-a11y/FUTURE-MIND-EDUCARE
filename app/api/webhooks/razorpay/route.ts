import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import crypto from 'crypto';
import { sendPurchaseReceipt } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!signature || !process.env.RAZORPAY_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    if (event.event === 'payment.captured') {
      const { order_id, id: payment_id } = event.payload.payment.entity;

      await connectDB();
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: order_id, status: { $ne: 'SUCCESS' } },
        { status: 'SUCCESS', razorpayPaymentId: payment_id },
        { new: true }
      );

      if (order) {
        await sendPurchaseReceipt({
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          planName: order.planName,
          amountPaid: order.amountPaid,
        });
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
