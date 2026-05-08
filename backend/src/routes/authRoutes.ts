import { Router } from 'express';
import { login, profile, register } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

export const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/profile', authenticate, profile);
