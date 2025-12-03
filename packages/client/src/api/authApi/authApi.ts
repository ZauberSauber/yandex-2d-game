import type { TRequestResult } from '@src/utils/api/api';

import { API } from '@src/utils/api/api';

import type { User } from '../profileApi/types';
import type {
  OAuthCodeRequest,
  OAuthServiceIdResponse,
  SignInRequest,
  SignUpRequest,
} from './types';

export const authApi = {
  signIn: (credentials: SignInRequest): Promise<TRequestResult<void>> =>
    API.post<SignInRequest, void>('/auth/signin')(credentials),

  signUp: (userData: SignUpRequest): Promise<TRequestResult<User>> =>
    API.post<SignUpRequest, User>('/auth/signup')(userData),

  logout: (): Promise<TRequestResult<void>> => API.post<never, void>('/auth/logout')(),
  getOAuthServiceId: (redirectUri: string): Promise<TRequestResult<OAuthServiceIdResponse>> =>
    API.get<never, OAuthServiceIdResponse>('/oauth/yandex/service-id')(
      {},
      { redirect_uri: redirectUri }
    ),
  signInWithOAuth: (data: OAuthCodeRequest): Promise<TRequestResult<void>> =>
    API.post<OAuthCodeRequest, void>('/oauth/yandex')(data),
};
