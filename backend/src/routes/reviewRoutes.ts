import { Router } from 'express';
import { createReview, deleteReview, listPhysioReviews, updateReview } from '../controllers/reviewController';
import { authenticate } from '../middleware/auth';

export const reviewRouter = Router();

reviewRouter.get('/physio/:physioId', listPhysioReviews);
reviewRouter.post('/', authenticate, createReview);
reviewRouter.patch('/:id', authenticate, updateReview);
reviewRouter.delete('/:id', authenticate, deleteReview);
