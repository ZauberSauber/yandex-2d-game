import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

import express from 'express';
import { createClientAndConnect } from './db.js';
import { LOCATIONS } from './mock.js';
import sequelize from './src/config/database.js';
import reactionRoutes from './src/routes/reactionRoutes.js';

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json());
const port = Number(process.env.SERVER_PORT) || 3001;

createClientAndConnect();

sequelize
  .authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('  ➜ 🎸 Sequelize connection established');
    return sequelize.sync({ alter: false });
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('  ➜ 🎸 Database synchronized');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('  ➜ ❌ Database connection error:', err.message);
    // eslint-disable-next-line no-console
    console.error('  ➜ ⚠️  Make sure PostgreSQL is running. Start it with: docker-compose up postgres -d');
  });

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
