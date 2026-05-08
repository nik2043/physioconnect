import { Router } from 'express';
import { createPaymentOrder, paymentHistory, verifyPayment } from '../controllers/paymentController';
import { authenticate } from '../middleware/auth';

export const paymentRouter = Router();

paymentRouter.use(authenticate);
paymentRouter.post('/create-order', createPaymentOrder);
paymentRouter.post('/verify', verifyPayment);
paymentRouter.get('/history', paymentHistory);
