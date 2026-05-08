import { Router } from 'express';
import { analyze, history } from '../controllers/symptomController';
import { authenticate } from '../middleware/auth';

export const symptomRouter = Router();

symptomRouter.post('/analyze', analyze);
symptomRouter.get('/history', authenticate, history);
