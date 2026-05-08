import crypto from 'crypto';
import Razorpay from 'razorpay';
import { env } from '../config/env';
import { ApiError } from '../utils/apiError';

const razorpay = env.razorpayKeyId && env.razorpayKeySecret
  ? new Razorpay({ key_id: env.razorpayKeyId, key_secret: env.razorpayKeySecret })
  : null;

export const createOrder = async (amount: number, receipt: string) => {
  if (!razorpay) {
    return { id: `mock_order_${Date.now()}`, amount, currency: 'INR' };
  }

  return razorpay.orders.create({
    amount: Math.round(amount * 100),
    currency: 'INR',
    receipt,
  });
};

export const verifyPaymentSignature = (orderId: string, paymentId: string, signature: string) => {
  if (!env.razorpayKeySecret) {
    throw new ApiError(400, 'Razorpay secret missing');
  }

  const generated = crypto
    .createHmac('sha256', env.razorpayKeySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generated === signature;
};
