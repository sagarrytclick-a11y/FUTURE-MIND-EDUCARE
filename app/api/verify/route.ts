import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import crypto from 'crypto';
import { sendPurchaseReceipt } from '@/lib/email';

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing required payment verification fields' },
        { status: 400 }
      );
    }

    if (!RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Razorpay not configured' },
        { status: 500 }
      );
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    await connectDB();

    if (!isValid) {
      await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: 'FAILED' }
      );

      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    const order = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        status: 'SUCCESS',
        razorpayPaymentId: razorpay_payment_id,
      },
      { new: true }
    );

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    await sendPurchaseReceipt({
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      planName: order.planName,
      amountPaid: order.amountPaid,
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      dbOrderId: order._id,
    });
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
