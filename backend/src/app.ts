import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { errorHandler, notFound } from './middleware/errorHandler';
import { authRouter } from './routes/authRoutes';
import { bookingRouter } from './routes/bookingRoutes';
import { paymentRouter } from './routes/paymentRoutes';
import { physioRouter } from './routes/physioRoutes';
import { reviewRouter } from './routes/reviewRoutes';
import { symptomRouter } from './routes/symptomRoutes';

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.frontendUrl, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: env.nodeEnv === 'production' ? 200 : 1000,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'physioconnect-api' });
});

app.use('/api/auth', authRouter);
app.use('/api/physios', physioRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/symptoms', symptomRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/reviews', reviewRouter);

app.use(notFound);
app.use(errorHandler);
