import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { z } from 'zod';
import { User } from '../models/User';
import { ApiError } from '../utils/apiError';
import { signToken } from '../utils/jwt';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['patient', 'physio']),
  specialization: z.string().optional(),
  experience: z.number().int().nonnegative().optional(),
  location: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const register = async (req: Request, res: Response) => {
  const payload = registerSchema.parse(req.body);
  const existing = await User.findOne({ email: payload.email });
  if (existing) {
    throw new ApiError(409, 'Email already registered');
  }

  const password = await bcrypt.hash(payload.password, 12);
  const user = await User.create({ ...payload, password });

  const token = signToken({ id: user._id.toString(), role: user.role });
  res.status(201).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      specialization: user.specialization,
      experience: user.experience,
      location: user.location,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const payload = loginSchema.parse(req.body);
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const valid = await bcrypt.compare(payload.password, user.password);
  if (!valid) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = signToken({ id: user._id.toString(), role: user.role });
  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      specialization: user.specialization,
      experience: user.experience,
      location: user.location,
    },
  });
};

export const profile = async (req: Request, res: Response) => {
  const user = await User.findById(req.user?.id).select('-password');
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.json(user);
};
