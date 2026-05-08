import { Request, Response } from 'express';
import { z } from 'zod';
import { Review } from '../models/Review';
import { User } from '../models/User';
import { ApiError } from '../utils/apiError';

const createReviewSchema = z.object({
  physio: z.string().min(8),
  booking: z.string().min(8),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
});

const updateReviewSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  comment: z.string().optional(),
});

const refreshPhysioRating = async (physioId: string) => {
  const reviews = await Review.find({ physio: physioId });
  const reviewCount = reviews.length;
  const rating = reviewCount === 0 ? 0 : reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount;
  await User.findByIdAndUpdate(physioId, { rating: Number(rating.toFixed(1)), reviewCount });
};

export const createReview = async (req: Request, res: Response) => {
  const payload = createReviewSchema.parse(req.body);
  const review = await Review.create({ ...payload, patient: req.user?.id });
  await refreshPhysioRating(payload.physio);
  res.status(201).json(review);
};

export const listPhysioReviews = async (req: Request, res: Response) => {
  const reviews = await Review.find({ physio: req.params.physioId }).populate('patient', 'name').sort({ createdAt: -1 });
  res.json(reviews);
};

export const updateReview = async (req: Request, res: Response) => {
  const payload = updateReviewSchema.parse(req.body);
  const review = await Review.findOneAndUpdate({ _id: req.params.id, patient: req.user?.id }, payload, { new: true });
  if (!review) {
    throw new ApiError(404, 'Review not found');
  }
  await refreshPhysioRating(review.physio.toString());
  res.json(review);
};

export const deleteReview = async (req: Request, res: Response) => {
  const review = await Review.findOneAndDelete({ _id: req.params.id, patient: req.user?.id });
  if (!review) {
    throw new ApiError(404, 'Review not found');
  }
  await refreshPhysioRating(review.physio.toString());
  res.status(204).send();
};
