import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import { ProtectedRoute } from '@components/ProtectedRoute';
import { Layout } from '@layout';
import {
  BlogPage,
  CreateTopicPage,
  EndGame,
  ForumPage,
  Game,
  LeaderboardPage,
  MainPage,
  NotFoundPage,
  PreGame,
  ProfilePage,
  SignInPage,
  SignUpPage,
  TopicPage,
} from '@pages';

import { PATHS } from './routes/constants';

export const App = () => (
  <ConfigProvider wave={{ disabled: true }}>
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/start"
            element={
              <ProtectedRoute>
                <PreGame />
              </ProtectedRoute>
            }
          />
          <Route
            path="/game"
            element={
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            }
          />
          <Route
            path="/end"
            element={
              <ProtectedRoute>
                <EndGame />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <LeaderboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog"
            element={
              <ProtectedRoute>
                <BlogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <ProtectedRoute>
                <LeaderboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATHS.FORUM}
            element={
              <ProtectedRoute>
                <ForumPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATHS.FORUM_CREATE_TOPIC}
            element={
              <ProtectedRoute>
                <CreateTopicPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATHS.FORUM_TOPIC}
            element={
              <ProtectedRoute>
                <TopicPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ConfigProvider>
);
