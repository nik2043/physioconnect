import mongoose, { InferSchemaType, Model } from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String, default: '' },
    status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
  },
  { timestamps: true },
);

export type PaymentDocument = InferSchemaType<typeof paymentSchema> & { _id: mongoose.Types.ObjectId };

export const Payment: Model<PaymentDocument> = mongoose.models.Payment || mongoose.model<PaymentDocument>('Payment', paymentSchema);
