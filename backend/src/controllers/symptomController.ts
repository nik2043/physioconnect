import { Request, Response } from 'express';
import { z } from 'zod';
import { analyzeSymptoms, matchPhysios } from '../services/claudeService';

const symptomSchema = z.object({
  symptoms: z.array(z.string().min(2)).min(1),
  location: z.string().optional(),
});

export const analyze = async (req: Request, res: Response) => {
  const payload = symptomSchema.parse(req.body);
  const [analysis, matches] = await Promise.all([
    analyzeSymptoms(payload.symptoms),
    matchPhysios(payload.symptoms, payload.location),
  ]);

  res.json({ analysis, matches });
};

export const history = async (_req: Request, res: Response) => {
  res.json([]);
};
