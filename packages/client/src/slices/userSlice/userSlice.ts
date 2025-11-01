import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@src/api/profileApi/types';

import { userMockData } from './MockData';
import {
  changePasswordThunk,
  getUserInfoThunk,
  setProfileAvatarThunk,
  setUserInfoThunk,
} from './thunks';
import type { RootState } from '../../store';

type ExtendedUserData = User & {
  biography: string;
  level: number;
  rating: number;
  statistics: { name: string; value: string }[];
  achivments: { name: string; description: string }[];
};

export interface UserState {
  user: ExtendedUserData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfoThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(changePasswordThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(setUserInfoThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(setProfileAvatarThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getUserInfoThunk.fulfilled, (state, { payload }: PayloadAction<User>) => {
        state.user = {
          ...payload,
          biography: userMockData.biography,
          level: userMockData.level,
          rating: userMockData.rating,
          statistics: userMockData.statistics,
          achivments: userMockData.achivments,
        };
        state.error = null;
        state.isLoading = false;
      })
      .addCase(setUserInfoThunk.fulfilled, (state, { payload }: PayloadAction<User>) => {
        state.user = {
          ...payload,
          biography: userMockData.biography,
          level: userMockData.level,
          rating: userMockData.rating,
          statistics: userMockData.statistics,
          achivments: userMockData.achivments,
        };
        state.error = null;
        state.isLoading = false;
      })
      .addCase(setProfileAvatarThunk.fulfilled, (state, { payload }: PayloadAction<User>) => {
        state.user = {
          ...payload,
          biography: userMockData.biography,
          level: userMockData.level,
          rating: userMockData.rating,
          statistics: userMockData.statistics,
          achivments: userMockData.achivments,
        };
        state.error = null;
        state.isLoading = false;
      })

      .addCase(changePasswordThunk.fulfilled, (state) => {
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getUserInfoThunk.rejected, (state, action) => {
        state.error = (action.payload as string) || 'Не удалось получить данные по профилю';
        state.isLoading = false;
      })
      .addCase(setUserInfoThunk.rejected, (state, action) => {
        state.error = (action.payload as string) || 'Не удалось сменить данные по профилю';
        state.isLoading = false;
      })
      .addCase(setProfileAvatarThunk.rejected, (state, action) => {
        state.error = (action.payload as string) || 'Не удалось сохранить аватар';
        state.isLoading = false;
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.error = (action.payload as string) || 'Не удалось сменить пароль';
        state.isLoading = false;
      });
  },
});

export const { clearError } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectProfileError = (state: RootState) => state.user.error;
export const selectProfileLoading = (state: RootState) => state.user.isLoading;

export default userSlice.reducer;
