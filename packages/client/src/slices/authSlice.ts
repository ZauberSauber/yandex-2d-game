import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@src/api/authApi/types';
import type { RootState } from '@src/store';

import { authApi } from '@src/api/authApi';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Helper для извлечения сообщения об ошибке из ответа API
const extractErrorMessage = (data: unknown): string => {
  if (data && typeof data === 'object' && 'reason' in data) {
    return (data as { reason: string }).reason;
  }
  return '';
};

export const signInThunk = createAsyncThunk(
  'auth/signIn',
  async (credentials: { login: string; password: string }, { rejectWithValue }) => {
    const result = await authApi.signIn(credentials);

    if (result.error) {
      return rejectWithValue(extractErrorMessage(result.data) || 'Неверный логин или пароль');
    }

    const userResult = await authApi.getUser();

    if (userResult.error || !userResult.data) {
      return rejectWithValue('Не удалось получить данные пользователя');
    }

    return userResult.data;
  }
);

export const signUpThunk = createAsyncThunk(
  'auth/signUp',
  async (
    userData: {
      first_name: string;
      second_name: string;
      login: string;
      email: string;
      password: string;
      phone: string;
    },
    { rejectWithValue }
  ) => {
    const result = await authApi.signUp(userData);

    if (result.error || !result.data) {
      return rejectWithValue(extractErrorMessage(result.data) || 'Ошибка регистрации');
    }

    return result.data;
  }
);

export const checkAuthThunk = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
  const result = await authApi.getUser();

  if (result.error || !result.data) {
    return rejectWithValue('Не авторизован');
  }

  return result.data;
});

export const logoutThunk = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  const result = await authApi.logout();

  if (result.error) {
    return rejectWithValue('Ошибка выхода');
  }

  return true;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Ошибка авторизации';
        state.isAuthenticated = false;
      })
      // Sign Up
      .addCase(signUpThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Ошибка регистрации';
        state.isAuthenticated = false;
      })
      // Check Auth
      .addCase(checkAuthThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(checkAuthThunk.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearError } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;

export default authSlice.reducer;
