import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';
import { ApiError } from '../utils/apiError';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: 'patient' | 'physio' };
    }
  }
}

export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    throw new ApiError(401, 'Unauthorized');
  }

  const token = authHeader.slice(7);
  req.user = verifyToken(token);
  next();
};

export const authorize = (...roles: Array<'patient' | 'physio'>) => (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user || !roles.includes(req.user.role)) {
    throw new ApiError(403, 'Forbidden');
  }
  next();
};
