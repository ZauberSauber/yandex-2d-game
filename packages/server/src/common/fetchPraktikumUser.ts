import axios from 'axios';

import { PRAKTIKUM_API_URL } from './practikumBaseUrl.js';
import type { IUser } from '../models/User.js';

export const fetchPraktikumUser = async (cookies?: string) => {
  if (!cookies || !cookies.includes('token=')) {
    return null;
  }

  return axios.get<IUser>(`${PRAKTIKUM_API_URL}/auth/user`, {
    headers: { Cookie: cookies },
    withCredentials: true,
  });
};
