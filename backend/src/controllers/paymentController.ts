import { Request, Response } from 'express';
import { z } from 'zod';
import { Payment } from '../models/Payment';
import { createOrder, verifyPaymentSignature } from '../services/paymentService';
import { ApiError } from '../utils/apiError';

const createOrderSchema = z.object({
  booking: z.string().min(8),
  amount: z.number().positive(),
});

const verifySchema = z.object({
  orderId: z.string().min(3),
  paymentId: z.string().min(3),
  signature: z.string().min(3),
});

export const createPaymentOrder = async (req: Request, res: Response) => {
  const payload = createOrderSchema.parse(req.body);
  const order = await createOrder(payload.amount, `booking_${payload.booking}`);

  const payment = await Payment.create({
    booking: payload.booking,
    patient: req.user?.id,
    amount: payload.amount,
    currency: 'INR',
    razorpayOrderId: order.id,
    status: 'created',
  });

  res.status(201).json({ order, payment });
};

export const verifyPayment = async (req: Request, res: Response) => {
  const payload = verifySchema.parse(req.body);
  const isValid = verifyPaymentSignature(payload.orderId, payload.paymentId, payload.signature);
  if (!isValid) {
    throw new ApiError(400, 'Invalid payment signature');
  }

  const payment = await Payment.findOneAndUpdate(
    { razorpayOrderId: payload.orderId },
    { status: 'paid', razorpayPaymentId: payload.paymentId },
    { new: true },
  );

  if (!payment) {
    throw new ApiError(404, 'Payment not found');
  }

  res.json({ success: true, payment });
};

export const paymentHistory = async (req: Request, res: Response) => {
  const payments = await Payment.find({ patient: req.user?.id }).sort({ createdAt: -1 });
  res.json(payments);
};
