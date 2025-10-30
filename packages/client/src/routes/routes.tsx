import { EndGame, Game, PreGame, SignInPage, SignUpPage } from '@pages';

import { PATHS } from './constants';
import type { PageInitArgs } from './types';

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
    Component: EndGame,
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
