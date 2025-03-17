import { connect } from 'mongoose';
import { userModel, userZodSchema } from './models/UserSchema';

import { healthcheck } from './controllers/heathcheck';
import { getAllUsers, saveUser, getUserById } from './controllers/user';

import createApp from './lib/create-app';

connect(process.env.MONGO_URI);

const app = createApp();

app.get('/healthcheck', healthcheck);
app.get('/users', getAllUsers);
app.post('/user', saveUser);
app.get('/user/:id', getUserById);
app.delete('/', async (c) => {});

export default app;
