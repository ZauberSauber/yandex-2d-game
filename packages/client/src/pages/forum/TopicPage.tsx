import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  ArrowLeftOutlined,
  DislikeOutlined,
  LikeOutlined,
  SendOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Divider, Input, message, Space, Typography } from 'antd';
import type { FC } from 'react';

import { ForumBreadcrumb } from '@components/ForumBreadcrumb';
import { forumApi } from '@src/api/forumApi';
import { profileApi } from '@src/api/profileApi';
import { PATHS } from '@src/routes/constants';

import type { ForumComment, TTopic } from './types';

import styles from './TopicPage.module.scss';

const { Title, Text: TextComponent, Paragraph } = Typography;
const { TextArea } = Input;

const TopicPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState<TTopic | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    forumApi.getTopicById(id).then(({ data }) => {
      setTopic(data || null);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    navigate(PATHS.FORUM);
  };

  const handleAddComment = async () => {
    const content = newComment.trim();
    if (!content) {
      message.warning('Введите текст комментария');
      return;
    }

    setLoading(true);

    const responseUser = await profileApi.getUserInfo();

    if (!responseUser.data) {
      message.error('Ошибка получения пользователя');
      return;
    }

    forumApi
      .createComment({
        authorId: `${responseUser.data.id}`,
        authorLogin: responseUser.data.login,
        content,
        topicId: id || '',
        parentCommentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .then((comment) => {
        message.success('Комментарий успешно добавлен!');
        setNewComment('');

        const newTopic = {
          ...topic,
          replies: [...(topic?.replies || []), comment.data],
        };
        setTopic(newTopic as TTopic);
      })
      .finally(() => setLoading(false));
  };

  const handleLike = (_commentId: string) => {
    // console.log('Liking comment:', commentId);
    // Здесь будет логика лайка
  };

  const handleDislike = (_commentId: string) => {
    // console.log('Disliking comment:', commentId);
    // Здесь будет логика дизлайка
  };

  const renderComment = (comment: ForumComment, isReply = false) => (
    <Card
      key={comment.id}
      className={`${styles['comment-card']} ${isReply ? styles['reply-card'] : ''}`}>
      <div className={styles['comment-header']}>
        <div className={styles['comment-author']}>
          <Avatar icon={<UserOutlined />} className={styles.avatar} />
          <div className={styles['author-info']}>
            <TextComponent className={styles['author-name']}>{comment.authorId}</TextComponent>
          </div>
        </div>
        <div className={styles['comment-actions']}>
          <Button
            type="text"
            icon={<LikeOutlined />}
            onClick={() => handleLike(comment.id)}
            className={styles['action-button']}>
            {comment.likes}
          </Button>
          <Button
            type="text"
            icon={<DislikeOutlined />}
            onClick={() => handleDislike(comment.id)}
            className={styles['action-button']}>
            {comment.dislikes}
          </Button>
        </div>
      </div>

      <div className={styles['comment-content']}>
        <Paragraph className={styles['comment-text']}>{comment.content}</Paragraph>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className={styles.replies}>
          {comment.replies.map((reply) => renderComment(reply, true))}
        </div>
      )}
    </Card>
  );

  return (
    <div className={styles['topic-page']}>
      <ForumBreadcrumb />

      <div className={styles.header}>
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack} className={styles['back-button']}>
          Назад к форуму
        </Button>
      </div>

      {topic ? (
        <>
          <Card className={styles['topic-card']}>
            <div className={styles['topic-header']}>
              <div className={styles['topic-meta']}>
                <Title level={1} className={styles['topic-title']}>
                  {topic.title}
                </Title>
                <div className={styles['topic-info']}>
                  <TextComponent className={styles['topic-author']}>
                    Автор: {topic.authorLogin}
                  </TextComponent>
                  <TextComponent className={styles['topic-category']}>
                    Категория: {topic.category}
                  </TextComponent>
                </div>
              </div>
              <div className={styles['topic-stats']}>
                <Space>
                  <TextComponent className={styles.stat}>
                    <LikeOutlined /> {'topic.likes'}
                  </TextComponent>
                  <TextComponent className={styles.stat}>
                    <DislikeOutlined /> {'topic.dislikes'}
                  </TextComponent>
                  <TextComponent className={styles.stat}>Просмотров: {topic.views}</TextComponent>
                </Space>
              </div>
            </div>

            <Divider className={styles.divider} />

            <div className={styles['topic-content']}>
              <Paragraph className={styles['content-text']}>{topic.content}</Paragraph>
            </div>
          </Card>

          <div className={styles['comments-section']}>
            <Title level={2} className={styles['comments-title']}>
              Комментарии ({topic.replies.length})
            </Title>

            <Card className={styles['add-comment-card']}>
              <div className={styles['add-comment-form']}>
                <TextArea
                  placeholder="Добавить комментарий..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  className={styles['comment-input']}
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleAddComment}
                  loading={loading}
                  className={styles['submit-comment-button']}
                  disabled={loading}>
                  Отправить
                </Button>
              </div>
            </Card>

            <div className={styles['comments-list']}>
              {topic.replies.map((comment) => renderComment(comment))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export { TopicPage };
