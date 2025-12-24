import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HttpStatusCode } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';

import { profileApi } from '@src/api/profileApi';
import { themeApi } from '@src/api/themeApi';
import { ThemesId } from '@src/api/themeApi/types';

import type { RootState } from '../store';

export interface ThemeState {
  theme: ThemesId;
  isLoading: boolean;
  error: string | null;
}

const initialState: ThemeState = {
  theme: ThemesId.Dark,
  isLoading: false,
  error: null,
};

// Thunk для получения темы
export const fetchThemeThunk = createAsyncThunk('theme/fetch', async (_, { rejectWithValue }) => {
  try {
    const responseUser = await profileApi.getUserInfo();

    const user = responseUser?.data;

    if (!user?.id) return ThemesId.Dark;

    const response = await themeApi.getTheme(user);

    if (response.status !== HttpStatusCode.Ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data?.id || ThemesId.Dark;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
  }
});

export const saveThemeThunk = createAsyncThunk<ThemesId, ThemesId, { state: RootState }>(
  'theme/save',
  async (themeId: ThemesId, { rejectWithValue }) => {
    try {
      const responseUser = await profileApi.getUserInfo();

      const user = responseUser?.data;

      if (!user?.id) return themeId;

      const response = await themeApi.saveTheme({ theme: { id: themeId }, user });

      if (response.status !== HttpStatusCode.Ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return themeId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemesId>) => {
      state.theme = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Загрузка темы
    builder
      .addCase(fetchThemeThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchThemeThunk.fulfilled, (state, action: PayloadAction<ThemesId>) => {
        state.isLoading = false;
        state.theme = action.payload;
      })
      .addCase(fetchThemeThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Сохранение темы
      .addCase(saveThemeThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveThemeThunk.fulfilled, (state, action: PayloadAction<ThemesId>) => {
        state.isLoading = false;
        state.theme = action.payload;
      })
      .addCase(saveThemeThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setTheme, clearError } = ThemeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.theme;
export const selectIsThemeLoading = (state: RootState) => state.theme.isLoading;
export const selectThemeError = (state: RootState) => state.theme.error;

export default ThemeSlice.reducer;
