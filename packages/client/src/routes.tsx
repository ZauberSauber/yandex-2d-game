import { Game } from '@pages/game/Game';
import { PreGame } from '@pages/preGame';

import { SignInPage } from './pages/Sign/SignIn';
import { SignUpPage } from './pages/Sign/SignUp';
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
  END = '/end',
  GAME = '/game',
  FRIENDS = '/friends',
  PROFILE = '/profile',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  BLOG = '/blog',
  LEADERBOARD = '/leaderboard',
}

export const routes = [
  {
    path: PATHS.SIGN_IN,
    Component: SignInPage,
    fetchData: () => Promise.resolve(),
  },
  {
    path: PATHS.SIGN_UP,
    Component: SignUpPage,
    fetchData: () => Promise.resolve(),
  },
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
    path: PATHS.END,
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
    path: PATHS.GAME,
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
