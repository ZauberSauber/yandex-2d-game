import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { DataTypeTable } from '@src/api/leaderboardApi/types';

import { getLeaderboardTeamThunk, setLeaderboardThunk } from './thunks';
import type { RootState } from '../../store';

type LeaderboardState = {
  leaderboardTable: [] | DataTypeTable[];
  isLoading: boolean;
  error: string | null;
};

const initialState: LeaderboardState = {
  leaderboardTable: [],
  isLoading: false,
  error: null,
};

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setLeaderboardThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getLeaderboardTeamThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(
        getLeaderboardTeamThunk.fulfilled,
        (state, { payload }: PayloadAction<DataTypeTable[]>) => {
          state.leaderboardTable = payload;
          state.error = null;
          state.isLoading = false;
        }
      )
      .addCase(getLeaderboardTeamThunk.rejected, (state, action) => {
        state.error = (action.payload as string) || 'Не удалось получить данные по профилю';
        state.isLoading = false;
      });
  },
});

export const { clearError } = leaderboardSlice.actions;

export const selectLeaderboardTable = (state: RootState) => state.leaderboard.leaderboardTable;
export const selectLeaderboardError = (state: RootState) => state.leaderboard.error;
export const selectLeaderboardLoading = (state: RootState) => state.leaderboard.isLoading;

export default leaderboardSlice.reducer;
