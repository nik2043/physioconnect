import mongoose, { InferSchemaType, Model } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['patient', 'physio'], required: true },
    specialization: { type: String, default: '' },
    experience: { type: Number, default: 0 },
    location: { type: String, default: '' },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof userSchema> & { _id: mongoose.Types.ObjectId };

export const User: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);
