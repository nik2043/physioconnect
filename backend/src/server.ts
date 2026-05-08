import { app } from './app';
import { connectDatabase } from './config/database';
import { env } from './config/env';
import { logger } from './utils/logger';

const start = async () => {
  await connectDatabase();
  app.listen(env.port, () => {
    logger.info(`Backend running on port ${env.port}`);
  });
};

start().catch((error) => {
  logger.error('Failed to start server', error);
  process.exit(1);
});
