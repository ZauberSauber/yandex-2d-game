import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ELocation, TLocation } from '@src/gameEngine/types';

import { SERVER_HOST } from '../constants';
import type { RootState } from '../store';

type TStoreLocations = Partial<Record<ELocation, TLocation>>;

export interface PreGameState {
  data: TStoreLocations;
  isLoading: boolean;
}

const initialState: PreGameState = {
  data: {},
  isLoading: false,
};

export const fetchLocationsThunk = createAsyncThunk('preGame/fetchLocations', async () => {
  const url = `${SERVER_HOST}/locations`;
  const response = await fetch(url, { credentials: 'include' });
  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status}`);
  }
  return response.json();
});

export const preGameSlice = createSlice({
  name: 'preGame',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationsThunk.pending.type, (state) => {
        state.data = {};
        state.isLoading = true;
      })
      .addCase(
        fetchLocationsThunk.fulfilled.type,
        (state, { payload }: PayloadAction<TStoreLocations>) => {
          state.data = payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchLocationsThunk.rejected.type, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectLocation = (state: RootState) => state.preGame.data;

export const selectIsLoadingLocations = (state: RootState) => state.preGame.isLoading;

export default preGameSlice.reducer;
