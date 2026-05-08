import Anthropic from '@anthropic-ai/sdk';
import { env } from '../config/env';
import { User } from '../models/User';

const anthropic = env.anthropicApiKey ? new Anthropic({ apiKey: env.anthropicApiKey }) : null;

export const analyzeSymptoms = async (symptoms: string[]) => {
  if (!anthropic) {
    return {
      summary: 'AI key not configured. Using fallback analysis.',
      recommendations: ['Book an assessment with a physiotherapist for a personalized plan.'],
      urgency: 'medium',
    };
  }

  const prompt = `You are a physiotherapy triage assistant. Analyze symptoms: ${symptoms.join(', ')}. Return concise JSON with keys summary, recommendations(array), urgency(low|medium|high).`;

  const response = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 500,
    temperature: 0.1,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0] && 'text' in response.content[0] ? response.content[0].text : '';
  try {
    return JSON.parse(text);
  } catch {
    return {
      summary: text || 'Unable to parse AI response.',
      recommendations: ['Please consult a physiotherapist.'],
      urgency: 'medium',
    };
  }
};

export const matchPhysios = async (symptoms: string[], location?: string) => {
  const regex = new RegExp(symptoms.join('|'), 'i');
  return User.find({
    role: 'physio',
    available: true,
    ...(location ? { location: { $regex: location, $options: 'i' } } : {}),
    $or: [{ specialization: { $regex: regex } }, { name: { $regex: regex } }],
  })
    .select('-password')
    .sort({ rating: -1, experience: -1 })
    .limit(10);
};
