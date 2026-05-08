import { Request, Response } from 'express';
import { z } from 'zod';
import { Booking } from '../models/Booking';
import { ApiError } from '../utils/apiError';

const createBookingSchema = z.object({
  physio: z.string().min(8),
  date: z.coerce.date(),
  sessionType: z.enum(['home', 'online', 'clinic']),
  symptoms: z.array(z.string()).default([]),
  notes: z.string().optional(),
});

const updateBookingSchema = z.object({
  date: z.coerce.date().optional(),
  sessionType: z.enum(['home', 'online', 'clinic']).optional(),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']).optional(),
  notes: z.string().optional(),
});

export const createBooking = async (req: Request, res: Response) => {
  const payload = createBookingSchema.parse(req.body);
  const booking = await Booking.create({ ...payload, patient: req.user?.id });
  res.status(201).json(booking);
};

export const listBookings = async (req: Request, res: Response) => {
  const query = req.user?.role === 'physio' ? { physio: req.user.id } : { patient: req.user?.id };
  const bookings = await Booking.find(query).populate('physio', 'name specialization location').sort({ createdAt: -1 });
  res.json(bookings);
};

export const getBooking = async (req: Request, res: Response) => {
  const booking = await Booking.findById(req.params.id).populate('physio', 'name specialization location');
  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }
  res.json(booking);
};

export const updateBooking = async (req: Request, res: Response) => {
  const payload = updateBookingSchema.parse(req.body);
  const booking = await Booking.findByIdAndUpdate(req.params.id, payload, { new: true });
  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }
  res.json(booking);
};

export const cancelBooking = async (req: Request, res: Response) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }
  res.json(booking);
};
