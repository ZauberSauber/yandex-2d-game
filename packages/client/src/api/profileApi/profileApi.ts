import axios, { HttpStatusCode, isAxiosError } from 'axios';
import type { TError } from '@src/utils/api/types';

import { API, axiosConfig } from '@src/utils/api/api';

import type { ChangePassword } from './types';

export const profileApi = {
  uploadAvatar: async (imgData: FormData) => {
    try {
      const response = await axios.put('user/profile/avatar', imgData, {
        ...axiosConfig,
        headers: {
          ...axiosConfig.headers,
          'Content-Type': 'multipart/form-data',
        },
      });

      const { data, status } = response || {};

      if (status === HttpStatusCode.Ok) {
        return { error: false, data, status };
      }

      return { error: true, data, status };
    } catch (error: unknown) {
      if (!isAxiosError(error)) {
        return { error: true, status: null };
      }

      return {
        error: true,
        status: error.response?.status || null,
        data: error.response?.data,
      };
    }
  },

  changePassword: async (param: ChangePassword) => {
    try {
      const { status, data } = await API.put<ChangePassword, void | TError>('/user/password')(
        param
      );

      if (status === HttpStatusCode.Ok && data) {
        return;
      }
      return { error: true, data, status };
    } catch (error: unknown) {
      if (!isAxiosError(error)) {
        return { error: true, status: null };
      }

      return {
        error: true,
        status: error.response?.status || null,
        data: error.response?.data,
      };
    }
  },
};
