import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@src/store';

import { authApi } from '@src/api/authApi';
import { extractErrorMessage } from '@src/utils/api/api';

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const signInThunk = createAsyncThunk(
  'auth/signIn',
  async (credentials: { login: string; password: string }, { rejectWithValue }) => {
    const result = await authApi.signIn(credentials);

    if (result.error) {
      return rejectWithValue(extractErrorMessage(result.data) || 'Неверный логин или пароль');
    }

    return true;
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

    return true;
  }
);

export const checkAuthThunk = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
  const result = await authApi.getUser();

  if (result.error || !result.data) {
    return rejectWithValue('Не авторизован');
  }

  return true;
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
      .addCase(signInThunk.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Ошибка авторизации';
        state.isAuthenticated = false;
      })
      .addCase(signUpThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpThunk.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Ошибка регистрации';
        state.isAuthenticated = false;
      })
      .addCase(checkAuthThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthThunk.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(checkAuthThunk.rejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
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
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;

export default authSlice.reducer;
