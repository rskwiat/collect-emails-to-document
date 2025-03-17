import { pinoLogger } from 'hono-pino';

export function Logger() {
  if (process.env.NODE_ENV === 'production') {
    return pinoLogger({
      pino: {
        level: 'debug',
      },
      http: {
        reqId: () => crypto.randomUUID(),
      },
    });
  }

  return pinoLogger({
    pino: {
      level: process.env?.LOG_LEVEL || 'info',
      transport: {
        target: 'pino-pretty',
      },
    },
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}
