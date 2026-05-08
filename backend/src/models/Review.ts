import mongoose, { InferSchemaType, Model } from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    physio: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, default: '' },
  },
  { timestamps: true },
);

export type ReviewDocument = InferSchemaType<typeof reviewSchema> & { _id: mongoose.Types.ObjectId };

export const Review: Model<ReviewDocument> = mongoose.models.Review || mongoose.model<ReviewDocument>('Review', reviewSchema);
