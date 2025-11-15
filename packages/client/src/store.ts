import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
  useStore as useStoreBase,
} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import type { PreloadedState } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';

import authReducer from './slices/authSlice';
import friendsReducer from './slices/friendsSlice';
import ssrReducer from './slices/ssrSlice';
import userReducer from './slices/userSlice/userSlice';

declare global {
  interface Window {
    APP_INITIAL_STATE?: RootState;
  }
}

export const reducer = combineReducers({
  auth: authReducer,
  friends: friendsReducer,
  ssr: ssrReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof reducer>;

const isServer = typeof window === 'undefined';

export const createStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      const defaultMiddleware = getDefaultMiddleware();
      return (isServer ? [] : defaultMiddleware) as typeof defaultMiddleware;
    },
  });
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];

export const useDispatch: () => AppDispatch = useDispatchBase;
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase;
export const useStore: () => AppStore = useStoreBase;
