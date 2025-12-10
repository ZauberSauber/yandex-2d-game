import type { NextFunction, Request, Response } from 'express';

import { fetchPraktikumUser } from '../common/index.js';

interface AuthRequest extends Request {
  userId?: number;
  userLogin?: string;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cookies = req.headers.cookie;

    if (!cookies || !cookies.includes('token=')) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const response = await fetchPraktikumUser(cookies);

    if (response?.data && response?.data.id) {
      req.userId = response.data.id;
      req.userLogin =
        response.data.login || response.data.display_name || response.data.first_name || 'User';
      next();
      return;
    } else {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
};
