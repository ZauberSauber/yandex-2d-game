import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@layout';

import {
  BlogPage,
  EndScreen,
  LeaderboardPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
  StartScreen,
} from '@pages';

import { CreateTopicPage, ForumPage, TopicPage } from './pages/forum';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          {/* TODO: выпилить рут после https://yandex-2d-game.atlassian.net/browse/TASK-14 */}
          <Route path="/start" element={<StartScreen />} />
          {/* TODO: выпилить рут после https://yandex-2d-game.atlassian.net/browse/TASK-16 */}
          <Route path="/end" element={<EndScreen />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<LeaderboardPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/forum/create-topic" element={<CreateTopicPage />} />
          <Route path="/forum/topic/:id" element={<TopicPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
