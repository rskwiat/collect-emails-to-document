import mongoose, { connect, disconnect, connection } from 'mongoose';
import { createTestApp } from '../../lib/create-app';
import { getAllUsers } from '../user';
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';

describe('/users', () => {
  beforeEach(async () => {
    await connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test-db');
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await disconnect();
  });

  it('should get all users', async () => {
    const app = createTestApp();
    app.get('/users', getAllUsers);
    const res = await app.request('/users');

    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.data.length).toEqual(1);
  });
});
