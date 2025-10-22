import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from '@layout';
import {
  BlogPage,
  EndScreen,
  Game,
  LeaderboardPage,
  MainPage,
  NotFoundPage,
  PreGame,
  ProfilePage,
  SignInPage,
  SignUpPage,
} from '@pages';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/start" element={<PreGame />} />
        {/* TODO: выпилить рут после https://yandex-2d-game.atlassian.net/browse/TASK-16 */}
        <Route path="/end" element={<EndScreen />} />
        <Route path="/game" element={<Game />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<LeaderboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
