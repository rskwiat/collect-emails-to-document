import app from './src/app';

declare module 'bun' {
  interface Env {
    MONGO_URI: string;
    PORT: string;
    LOG_LEVEL: string;
  }
}

export default {
  port: process.env.PORT,
  fetch: app.fetch,
};
