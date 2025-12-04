import type { Request, Response, NextFunction } from 'express';
import axios from 'axios';

interface AuthRequest extends Request {
  userId?: number;
  userLogin?: string;
}

const AUTH_API_URL = 'https://ya-praktikum.tech/api/v2/auth/user';

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const cookies = req.headers.cookie;

    if (!cookies || !cookies.includes('token=')) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const response = await axios.get(AUTH_API_URL, {
      headers: {
        Cookie: cookies,
      },
      withCredentials: true,
    });

    if (response.data && response.data.id) {
      req.userId = response.data.id;
      req.userLogin = response.data.login || response.data.display_name || response.data.first_name || 'User';
      next();
      return;
    } else {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
};

