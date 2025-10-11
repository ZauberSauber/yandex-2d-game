import { FriendsPage, MainPage, NotFoundPage } from '@pages';
import { initFriendsPage } from '@pages/FriendsPage/initFriendsPage';
import { initMainPage } from '@pages/Main/initMaiPage';
import { initNotFoundPage } from '@pages/NotFound/initNotFoundPage';

import type { AppDispatch, RootState } from './store';

export type PageInitContext = {
  clientToken?: string;
};

export type PageInitArgs = {
  dispatch: AppDispatch;
  state: RootState;
  ctx: PageInitContext;
};

export const routes = [
  {
    path: '/',
    Component: MainPage,
    fetchData: initMainPage,
  },
  {
    path: '/friends',
    Component: FriendsPage,
    fetchData: initFriendsPage,
  },
  {
    path: '*',
    Component: NotFoundPage,
    fetchData: initNotFoundPage,
  },
];
