import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { createClientAndConnect } from './db.js';
import { LOCATIONS } from './mock.js';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './mddleware/authMiddleware.js';

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
  const publicPaths = ['/auth/signin', '/auth/signup', '/auth/logout', '/oauth'];
  const isPublicPath = publicPaths.some((path) => req.path.startsWith(path));

  if (isPublicPath) {
    next();
  } else {
    authMiddleware(req, res, next);
  }
});

const port = Number(process.env.SERVER_PORT) || 3001;

createClientAndConnect();

app.get('/friends', (_: Request, res: Response) => {
  res.json([
    { name: 'Саша', secondName: 'Панов' },
    { name: 'Лёша', secondName: 'Садовников' },
    { name: 'Серёжа', secondName: 'Иванов' },
  ]);
});

app.get('/user', (_: Request, res: Response) => {
  res.json({ name: '</script>Степа', secondName: 'Степанов' });
});

app.get('/', (_: Request, res: Response) => {
  res.json('👋 Howdy from the server :)');
});

app.get('/locations', (_req: Request, res: Response) => {
  res.json(LOCATIONS);
});

app.get('/auth/check', (req: Request, res: Response) => {
  res.json({
    authenticated: !!req.user,
    user: req.user || null,
    cookies: req.cookies,
    hasAuthHeader: !!req.headers.authorization,
  });
});

app.listen(port, () => {});
