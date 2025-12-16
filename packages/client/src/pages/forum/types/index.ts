export type TTopic = {
  id: number;
  title: string;
  content: string;
  authorId: number;
  authorLogin: string;
  category?: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  replies: ForumComment[];
  tags: string[];
  commentCount?: number;
};

export interface Category {
  id: string;
  name: string;
  description: string;
  topicsCount: number;
  messagesCount: number;
  lastTopic: string;
  lastTopicAuthor: string;
  lastTopicTime: string;
}

export interface ForumComment {
  id: string;
  topicId: string;
  parentCommentId?: string | null;
  authorId: string;
  authorLogin: string;
  content: string;
  likes: number;
  dislikes: number;
  replies?: ForumComment[];
  createdAt: Date;
  updatedAt: Date;
}
