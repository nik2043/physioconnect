import mongoose, { InferSchemaType, Model } from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    physio: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    sessionType: { type: String, enum: ['home', 'online', 'clinic'], required: true },
    symptoms: [{ type: String }],
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
    notes: { type: String, default: '' },
  },
  { timestamps: true },
);

export type BookingDocument = InferSchemaType<typeof bookingSchema> & { _id: mongoose.Types.ObjectId };

export const Booking: Model<BookingDocument> = mongoose.models.Booking || mongoose.model<BookingDocument>('Booking', bookingSchema);
