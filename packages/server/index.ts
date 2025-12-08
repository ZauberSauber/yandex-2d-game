import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

import express from 'express';
import { createClientAndConnect, initSequelize } from './db';
import { LOCATIONS } from './mock.js';
import reactionRoutes from './src/routes/reactionRoutes.js';

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json());
const port = Number(process.env.SERVER_PORT) || 3001;

createClientAndConnect();
initSequelize();

app.get('/friends', (_, res) => {
  res.json([
    { name: 'Саша', secondName: 'Панов' },
    { name: 'Лёша', secondName: 'Садовников' },
    { name: 'Серёжа', secondName: 'Иванов' },
  ]);
});

app.get('/user', (_, res) => {
  res.json({ name: '</script>Степа', secondName: 'Степанов' });
});

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)');
});

app.get('/locations', (_, res) => {
  res.json(LOCATIONS);
});

app.use('/api', reactionRoutes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
