import type { TRequestResult } from '@src/utils/api/api';

import { API } from '@src/utils/api/api';

import type { User } from '../profileApi/types';
import type { SignInRequest, SignUpRequest } from './types';

export const authApi = {
  signIn: (credentials: SignInRequest): Promise<TRequestResult<void>> =>
    API.post<SignInRequest, void>('/auth/signin')(credentials),

  signUp: (userData: SignUpRequest): Promise<TRequestResult<User>> =>
    API.post<SignUpRequest, User>('/auth/signup')(userData),

  logout: (): Promise<TRequestResult<void>> => API.post<never, void>('/auth/logout')(),
};
