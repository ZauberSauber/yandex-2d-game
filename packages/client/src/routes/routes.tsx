import { ProtectedRoute } from '@components';
import { Layout } from '@layout';
import {
  BlogPage,
  CreateTopicPage,
  EndGame,
  ForumPage,
  Game,
  initPreGamePage,
  LeaderboardPage,
  MainPage,
  NotFoundPage,
  PreGame,
  ProfilePage,
  SignInPage,
  SignUpPage,
  TopicPage,
} from '@pages';

import { PATHS } from './constants';
import type { AppRouteObject } from './types';

export const routes: AppRouteObject[] = [
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
    Component: Layout,
    children: [
      {
        index: true,
        Component: () => (
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        ),
        fetchData: (props) => {
          void props;
        },
      },
      {
        path: PATHS.START,
        Component: () => (
          <ProtectedRoute>
            <PreGame />
          </ProtectedRoute>
        ),
        fetchData: initPreGamePage,
      },
      {
        path: PATHS.GAME,
        Component: () => (
          <ProtectedRoute>
            <Game />
          </ProtectedRoute>
        ),
        fetchData: (props) => {
          void props;
        },
      },
      {
        path: PATHS.END,
        Component: () => (
          <ProtectedRoute>
            <EndGame />
          </ProtectedRoute>
        ),
        fetchData: (props) => {
          void props;
        },
      },
      {
        path: PATHS.PROFILE,
        Component: () => (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
        fetchData: (props) => {
          void props;
        },
      },
      {
        path: PATHS.LEADERBOARD,
        Component: () => (
          <ProtectedRoute>
            <LeaderboardPage />
          </ProtectedRoute>
        ),
        fetchData: (props) => {
          void props;
        },
      },
      {
        path: PATHS.BLOG,
        Component: () => (
          <ProtectedRoute>
            <BlogPage />
          </ProtectedRoute>
        ),
        fetchData: (props) => {
          void props;
        },
      },
      {
        path: PATHS.BLOG_TOPIC,
        Component: () => (
          <ProtectedRoute>
            <TopicPage />
          </ProtectedRoute>
        ),
        fetchData: (props) => {
          void props;
        },
      },
      {
        path: PATHS.FORUM,
        Component: () => (
          <ProtectedRoute>
            <ForumPage />
          </ProtectedRoute>
        ),
        fetchData: (props) => {
          void props;
        },
      },
      {
        path: PATHS.FORUM_CREATE_TOPIC,
        Component: () => (
          <ProtectedRoute>
            <CreateTopicPage />
          </ProtectedRoute>
        ),
        fetchData: (props) => {
          void props;
        },
      },
      {
        path: PATHS.FORUM_TOPIC,
        Component: () => (
          <ProtectedRoute>
            <TopicPage />
          </ProtectedRoute>
        ),
        fetchData: (props) => {
          void props;
        },
      },
      { path: '*', Component: NotFoundPage },
    ],
  },
];
