import type { TRequestResult } from '@src/utils/api/api';

import { API } from '@src/utils/api/api';

import type { User } from '../profileApi/types';
import type { SignInRequest, SignUpRequest } from './types';

const authConfig = { withCredentials: true } as const;

export const authApi = {
  signIn: (credentials: SignInRequest): Promise<TRequestResult<void>> =>
    API.post<SignInRequest, void>('/auth/signin')(credentials, {}, undefined, authConfig),

  signUp: (userData: SignUpRequest): Promise<TRequestResult<User>> =>
    API.post<SignUpRequest, User>('/auth/signup')(userData, {}, undefined, authConfig),

  logout: (): Promise<TRequestResult<void>> =>
    API.post<never, void>('/auth/logout')({}, {}, undefined, authConfig),
};
