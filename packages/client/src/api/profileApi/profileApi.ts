import type { TRequestResult } from '@src/utils/api/api';

import { API, axiosConfig } from '@src/utils/api/api';

import type { ChangePassword, SetUserData, User } from './types';

export const profileApi = {
  uploadAvatar: (imgData: FormData): Promise<TRequestResult<User>> =>
    API.put<FormData, User>('user/profile/avatar')(imgData, {}, undefined, {
      ...axiosConfig,
      headers: {
        ...axiosConfig.headers,
        'Content-Type': 'multipart/form-data',
      },
    }),

  changePassword: (data: ChangePassword): Promise<TRequestResult<void>> =>
    API.put<ChangePassword, void>('/user/password')(data, {}, undefined, { withCredentials: true }),

  getUserInfo: (): Promise<TRequestResult<User>> =>
    API.get<never, User>('/auth/user')({}, {}, undefined, { withCredentials: true }),

  setUserInfo: (data: SetUserData): Promise<TRequestResult<User>> =>
    API.put<never, User>('/user/profile')(data, {}, undefined, { withCredentials: true }),
};
