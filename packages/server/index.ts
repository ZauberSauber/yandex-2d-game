import path from 'path';
import { fileURLToPath } from 'url';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// из dist до .env
const envPath = path.resolve(__dirname, '..', '..', '..', '.env');
dotenv.config({ path: envPath });

import { createClientAndConnect } from './db.js';
import { LOCATIONS } from './mock.js';
import reactionRoutes from './src/routes/reactionRoutes.js';
import themeRoutes from './src/routes/themeRoutes.js';

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json());
const port = Number(process.env.SERVER_PORT) || 3001;

createClientAndConnect();

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
app.use('/theme', themeRoutes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
