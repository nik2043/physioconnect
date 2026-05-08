import { Router } from 'express';
import { getAvailability, getPhysio, listPhysios, smartMatch } from '../controllers/physioController';

export const physioRouter = Router();

physioRouter.get('/', listPhysios);
physioRouter.get('/:id', getPhysio);
physioRouter.get('/:id/availability', getAvailability);
physioRouter.post('/match', smartMatch);
