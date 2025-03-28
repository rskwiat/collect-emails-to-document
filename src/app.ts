import { connect } from 'mongoose';

import { healthcheck } from './controllers/heathcheck';
import {
  deleteUser,
  getAllUsers,
  saveUser,
  searchForUser,
} from './controllers/user';

import createApp from './lib/create-app';

connect(process.env.MONGO_URI);

const app = createApp();

app.get('/healthcheck', healthcheck);
app.get('/users', getAllUsers);
app.post('/user', saveUser);
app.post('/search', searchForUser);
app.delete('/user', deleteUser);

export default app;
