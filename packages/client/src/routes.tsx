import { Game } from '@pages/Game';
import { PreGame } from '@pages/preGame';

import type { AppDispatch, RootState } from './store';

export type PageInitContext = {
  clientToken?: string;
};

export type PageInitArgs = {
  dispatch: AppDispatch;
  state: RootState;
  ctx: PageInitContext;
};

export enum PATHS {
  HOME = '/',
  START = '/start',
  GAME = '/game',
  FRIENDS = '/friends',
}

export const routes = [
  {
    path: PATHS.HOME,
    Component: () => <div>Main Page</div>,
    fetchData: (props: PageInitArgs) => {
      void props;
    },
  },
  {
    path: PATHS.START,
    Component: PreGame,
    fetchData: (props: PageInitArgs) => {
      void props;
    },
  },
  {
    path: PATHS.FRIENDS,
    Component: () => <div>Main Page</div>,
    fetchData: (props: PageInitArgs) => {
      void props;
    },
  },
  {
    path: '/game',
    Component: Game,
  },
  {
    path: '*',
    Component: () => <div>Main Page</div>,
    fetchData: (props: PageInitArgs) => {
      void props;
    },
  },
];
