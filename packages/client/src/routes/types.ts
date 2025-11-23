import type { AppDispatch, RootState } from '@src/store';
import type { RouteObject } from 'react-router';

export type PageInitContext = {
  clientToken?: string;
};

export type PageInitArgs = {
  dispatch: AppDispatch;
  state: RootState;
  ctx: PageInitContext;
};

export type AppRouteObject = RouteObject & {
  fetchData?: (args: PageInitArgs) => Promise<void> | void;
  children?: AppRouteObject[];
};
