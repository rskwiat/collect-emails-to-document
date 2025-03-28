//@ts-ignore

import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from 'bun:test';
import mongoose, { connect, disconnect, connection } from 'mongoose';

import { createTestApp } from '../../lib/create-app';
import { deleteUser, getAllUsers, saveUser, searchForUser } from '../user';

describe('/users', async () => {
  (
    await connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test-db')
  ).connection
    .once('open', (done) => {
      done();
    })
    .on('error', (err) => {
      console.log('error', err);
    });

  afterAll(async (done) => {
    const { users } = mongoose.connection.collections;
    users
      .drop()
      .then(() => done())
      .catch(() => done());
  });

  it('should get all users', async () => {
    const app = createTestApp();
    app.get('/users', getAllUsers);

    await mongoose.connection.collection('users').insertMany([
      {
        name: 'John Sandwhich',
        email: 'john.sandwhich@example.com',
        optIn: true,
      },
      { name: 'Jane Smith', email: 'jane.smith@example.com', optIn: false },
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        optIn: true,
      },
    ]);

    const res = await app.request('/users');
    expect(res.status).toBe(200);

    // Assert the response body
    const body = await res.json();
    expect(body.data.length).toEqual(3); // Expect 3 users in the response
    expect(body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'John Sandwhich',
          email: 'john.sandwhich@example.com',
          optIn: true,
        }),
        expect.objectContaining({
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          optIn: false,
        }),
        expect.objectContaining({
          name: 'Alice Johnson',
          email: 'alice.johnson@example.com',
          optIn: true,
        }),
      ]),
    );
  });

  it('should allow us to create a users', async () => {
    const app = createTestApp();
    app.post('/user', saveUser);
    const res = await app.request('/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john.doe@example.com',
        optIn: true,
      }),
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({
      message: 'User saved successfully.',
    });
    const savedUser = await mongoose.connection
      .collection('users')
      .findOne({ email: 'john.doe@example.com' });
    expect(savedUser).toBeTruthy();

    if (savedUser) {
      expect(savedUser.name).toBe('John Doe');
      expect(savedUser.optIn).toBe(true);
    }
  });

  it('should allow us to search by a users email', async () => {
    const app = createTestApp();
    app.post('/search', searchForUser);
    const res = await app.request('/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'john.doe@example.com',
      }),
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.email).toBe('john.doe@example.com');
  });

  it('should fail if a user inputs a wrong email address', async () => {
    const app = createTestApp();
    app.post('/search', searchForUser);
    const res = await app.request('/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'john.doe1@example.com',
      }),
    });

    expect(res.status).toBe(404);
  });

  it('should a remove a user by their email address', async () => {
    const app = createTestApp();
    app.delete('/delete', deleteUser);
    const res = await app.request('/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'john.sandwhich@example.com',
      }),
    });

    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toEqual({
      message: 'User deleted successfully.',
    });

    const deletedUser = await mongoose.connection
      .collection('users')
      .findOne({ email: 'john.sandwhich@example.com' });

    expect(deletedUser).toBeNull();
  });
});
