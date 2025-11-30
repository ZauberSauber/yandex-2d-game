import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
  useStore as useStoreBase,
} from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';

import authReducer from './slices/authSlice';
import leaderboardReducer from './slices/leaderboardSlice/leaderboardSlice';
import preGameReducer from './slices/preGameSlice';
import ssrReducer from './slices/ssrSlice';
import userReducer from './slices/userSlice/userSlice';

declare global {
  interface Window {
    APP_INITIAL_STATE?: RootState;
  }
}

export const reducer = combineReducers({
  auth: authReducer,
  ssr: ssrReducer,
  user: userReducer,
  leaderboard: leaderboardReducer,
  preGame: preGameReducer,
});

export type RootState = ReturnType<typeof reducer>;

export const createStore = (preloadedState?: RootState) =>
  configureStore({ reducer, preloadedState });

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];

export const useDispatch: () => AppDispatch = useDispatchBase;
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase;
export const useStore: () => AppStore = useStoreBase;
