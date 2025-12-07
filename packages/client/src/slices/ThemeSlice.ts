import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { SERVER_HOST } from '../constants';
import type { RootState } from '../store';

export interface ThemeState {
  theme: number; // 0 - light, 1 - dark
  isLoading: boolean;
  error: string | null;
}

const initialState: ThemeState = {
  theme: 1,
  isLoading: false,
  error: null,
};

// Thunk для получения темы
export const fetchThemeThunk = createAsyncThunk(
  'theme/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const url = `${SERVER_HOST}/theme`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  },
);


export const saveThemeThunk = createAsyncThunk(
  'theme/save',
  async (theme: number, { rejectWithValue }) => {
    try {
      const url = `${SERVER_HOST}/theme`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  },
);

export const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<number>) => {
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
      .addCase(fetchThemeThunk.fulfilled, (state, action: PayloadAction<{ theme: number }>) => {
        state.isLoading = false;
        state.theme = action.payload.theme;
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
      .addCase(saveThemeThunk.fulfilled, (state, action: PayloadAction<{ theme: number }>) => {
        state.isLoading = false;
        state.theme = action.payload.theme;
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