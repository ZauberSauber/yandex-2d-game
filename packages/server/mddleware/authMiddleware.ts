import axios from 'axios';
import type { NextFunction, Request, Response } from 'express';

import type { User } from '../types/express-augment.js';

const AUTH_CHECK_URL = 'https://ya-praktikum.tech/api/v2/auth/user';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cookies = req.cookies;
    const authHeader = req.headers.authorization;

    const headers: Record<string, string> = {};

    if (cookies && Object.keys(cookies).length > 0) {
      const cookieString = Object.entries(cookies)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');
      headers.Cookie = cookieString;
    } else if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      headers.Cookie = `authCookie=${token}`;
    } else {
      res.status(401).json({ reason: 'Unauthorized' });
      return;
    }

    const response = await axios.get<User>(AUTH_CHECK_URL, {
      headers,
      validateStatus: (status) => status < 500,
    });

    if (response.status === 200 && response.data) {
      req.user = response.data;
      next();
      return;
    }

    res.status(401).json({ reason: 'Unauthorized' });
  } catch (error) {
    res.status(500).json({ reason: 'Internal server error' });
  }
};
