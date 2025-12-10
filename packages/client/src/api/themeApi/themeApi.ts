import type { User } from '@src/api/profileApi/types';
import type { TRequestResult } from '@src/utils/api/api';

import { SERVER_HOST } from '@src/constants';
import { API } from '@src/utils/api/api';

import type { ITheme } from './types';

const baseURL = SERVER_HOST;

export const themeApi = {
  getTheme: (user: User): Promise<TRequestResult<ITheme>> =>
    API.post<never, ITheme>(`/theme`)(user, undefined, undefined, {
      baseURL,
    }),

  saveTheme: (data: { theme: ITheme; user: User }): Promise<TRequestResult<void>> =>
    API.put<ITheme, void>('/theme')(data, undefined, undefined, {
      baseURL,
    }),
};
