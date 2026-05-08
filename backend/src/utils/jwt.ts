import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

export type JwtPayload = {
  id: string;
  role: 'patient' | 'physio';
};

export const signToken = (payload: JwtPayload) =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn as SignOptions['expiresIn'] });

export const verifyToken = (token: string) => jwt.verify(token, env.jwtSecret) as JwtPayload;
