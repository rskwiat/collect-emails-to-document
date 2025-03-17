import type { Context } from 'hono';
import * as HttpStatusCodes from '../constants/status-codes';
import * as HttpStatusMessages from '../constants/status-messages';

export async function healthcheck(c: Context) {
  return c.json(
    {
      message: HttpStatusMessages.HEALTHCHECK_MESSAGE,
    },
    HttpStatusCodes.OK,
  );
}
