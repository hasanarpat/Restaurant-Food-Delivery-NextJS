import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info', // 'debug' in dev, 'info' in prod
  transport:
    process.env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        }
      : undefined,
  base: {
    env: process.env.NODE_ENV,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;
