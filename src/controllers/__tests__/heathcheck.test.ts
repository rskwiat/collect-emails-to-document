import { createTestApp } from '../../lib/create-app';
import { healthcheck } from '../heathcheck';
import { describe, expect, it } from 'bun:test';

describe('/heathcheck', () => {
  it('should render', async () => {
    const app = createTestApp();
    app.get('/healthcheck', healthcheck);
    const res = await app.request('/healthcheck');

    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toEqual({
      message: 'App is running',
    });
  });
});
