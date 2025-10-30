import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ChangePassword, SetUserData } from '@src/api/profileApi/types';

import { profileApi } from '@src/api/profileApi';

export const getUserInfoThunk = createAsyncThunk('auth/User', async (_, { rejectWithValue }) => {
  const result = await profileApi.getUserInfo();

  if (result.error || !result.data) {
    return rejectWithValue('Не удалось получить данные пользователя');
  }
  return result.data;
});

export const changePasswordThunk = createAsyncThunk(
  '/user/password',
  async (data: ChangePassword, { rejectWithValue }) => {
    const result = await profileApi.changePassword(data);

    if (result.error || !result.data) {
      return rejectWithValue('Не удалось сменить пароль');
    }

    return result.data;
  }
);

export const setUserInfoThunk = createAsyncThunk(
  '/user/profile',
  async (data: SetUserData, { rejectWithValue }) => {
    const result = await profileApi.setUserInfo(data);

    if (result.error || !result.data) {
      return rejectWithValue('Не удалось сменить информацию пользователя');
    }

    return result.data;
  }
);

export const setProfileAvatarThunk = createAsyncThunk(
  'user/profile/avatar',
  async (data: FormData, { rejectWithValue }) => {
    const result = await profileApi.uploadAvatar(data);

    if (result.error || !result.data) {
      return rejectWithValue('Не удалось сохранить аватар');
    }

    return result.data;
  }
);
