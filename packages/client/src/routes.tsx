import { CreateTopicPage, ForumPage, TopicPage } from './pages/forum';
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
    Component: () => <div>Main Page</div>,
    fetchData: (props: PageInitArgs) => {
      void props;
    },
  },
  {
    path: '/friends',
    Component: () => <div>Main Page</div>,
    fetchData: (props: PageInitArgs) => {
      void props;
    },
  },
  {
    path: '/forum',
    Component: ForumPage,
    fetchData: (props: PageInitArgs) => {
      void props;
    },
  },
  {
    path: '/forum/create-topic',
    Component: CreateTopicPage,
    fetchData: (props: PageInitArgs) => {
      void props;
    },
  },
  {
    path: '/forum/topic/:id',
    Component: TopicPage,
    fetchData: (props: PageInitArgs) => {
      void props;
    },
  },
  {
    path: '*',
    Component: () => <div>Main Page</div>,
    fetchData: (props: PageInitArgs) => {
      void props;
    },
  },
];
