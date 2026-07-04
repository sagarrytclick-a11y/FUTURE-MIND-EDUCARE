import mongoose from 'mongoose';

export interface IOrder {
  customerName: string;
  customerEmail: string;
  customerMobile: string;
  planId: string;
  planName: string;
  amountPaid: number;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    customerName: { type: String, required: true, trim: true },
    customerEmail: { type: String, required: true, trim: true, lowercase: true },
    customerMobile: { type: String, required: true, trim: true },
    planId: { type: String, required: true },
    planName: { type: String, required: true },
    amountPaid: { type: Number, required: true },
    razorpayOrderId: { type: String, required: true, unique: true },
    razorpayPaymentId: { type: String, default: null },
    status: {
      type: String,
      enum: ['PENDING', 'SUCCESS', 'FAILED'],
      default: 'PENDING',
    },
  },
  { timestamps: true }
);

orderSchema.index({ customerEmail: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ razorpayOrderId: 1 });

const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);

export default Order;
