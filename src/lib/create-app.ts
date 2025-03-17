import { Hono } from 'hono';

import * as HttpStatusCodes from '../constants/status-codes';
import * as HttpStatusMessages from '../constants/status-messages';

import { Logger } from '../middlewares/logger';

export default function createApp() {
  const app = new Hono();
  app.use(Logger());

  app.notFound((c) => {
    return c.json(
      {
        message: `${HttpStatusMessages.NOT_FOUND} - ${c.req.path}`,
      },
      HttpStatusCodes.NOT_FOUND,
    );
  });

  app.onError((err, c) => {
    return c.json(
      {
        message: err.message,
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
    );
  });

  return app;
}
