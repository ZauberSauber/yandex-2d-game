import type { ForumComment, TTopic } from '@src/pages/forum/types';
import type { TRequestResult } from '@src/utils/api/api';

import { SERVER_HOST } from '@src/constants';
import { API } from '@src/utils/api/api';

export const forumApi = {
  getTopics: (data = {}): Promise<TRequestResult<TTopic[]>> =>
    API.get<unknown, TTopic[]>('/forum/topics')(data, undefined, undefined, {
      baseURL: SERVER_HOST,
    }),

  getTopicById: (id: string): Promise<TRequestResult<TTopic>> =>
    API.get<{ id: string }, TTopic>(`/forum/topics/${id}`)({ id }, undefined, undefined, {
      baseURL: SERVER_HOST,
    }),

  createTopic: (values: Omit<TTopic, 'replies' | 'id'>): Promise<TRequestResult<unknown>> =>
    API.put('/forum/topics')(values, undefined, undefined, { baseURL: SERVER_HOST }),

  createComment: (comment: Omit<ForumComment, 'id' | 'likes' | 'dislikes'>) =>
    API.put<Omit<ForumComment, 'id' | 'likes' | 'dislikes'>, ForumComment>(
      `/forum/comment/${comment.topicId}`
    )(comment, undefined, undefined, {
      baseURL: SERVER_HOST,
    }),
};
