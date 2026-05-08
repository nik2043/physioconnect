import { Request, Response } from 'express';
import { z } from 'zod';
import { User } from '../models/User';
import { ApiError } from '../utils/apiError';
import { matchPhysios } from '../services/claudeService';

const matchSchema = z.object({
  symptoms: z.array(z.string().min(2)).min(1),
  location: z.string().optional(),
});

export const listPhysios = async (_req: Request, res: Response) => {
  const physios = await User.find({ role: 'physio' }).select('-password').sort({ rating: -1, experience: -1 });
  res.json(physios);
};

export const getPhysio = async (req: Request, res: Response) => {
  const physio = await User.findOne({ _id: req.params.id, role: 'physio' }).select('-password');
  if (!physio) {
    throw new ApiError(404, 'Physiotherapist not found');
  }
  res.json(physio);
};

export const getAvailability = async (req: Request, res: Response) => {
  const physio = await User.findOne({ _id: req.params.id, role: 'physio' }).select('available');
  if (!physio) {
    throw new ApiError(404, 'Physiotherapist not found');
  }
  res.json({ available: physio.available, slots: ['09:00', '11:00', '14:00', '16:00'] });
};

export const smartMatch = async (req: Request, res: Response) => {
  const payload = matchSchema.parse(req.body);
  const matches = await matchPhysios(payload.symptoms, payload.location);
  res.json({ matches });
};
