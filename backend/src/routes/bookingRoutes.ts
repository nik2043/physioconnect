import { Router } from 'express';
import { cancelBooking, createBooking, getBooking, listBookings, updateBooking } from '../controllers/bookingController';
import { authenticate } from '../middleware/auth';

export const bookingRouter = Router();

bookingRouter.use(authenticate);
bookingRouter.post('/', createBooking);
bookingRouter.get('/', listBookings);
bookingRouter.get('/:id', getBooking);
bookingRouter.patch('/:id', updateBooking);
bookingRouter.delete('/:id', cancelBooking);
