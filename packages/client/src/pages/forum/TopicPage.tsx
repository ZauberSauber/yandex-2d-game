import { useState } from 'react';
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
import { PATHS } from '@src/routes/constants';

import styles from './TopicPage.module.scss';

const { Title, Text: TextComponent, Paragraph } = Typography;
const { TextArea } = Input;

interface ForumComment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  replies?: ForumComment[];
}

interface Topic {
  id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  timestamp: string;
  views: number;
  likes: number;
  dislikes: number;
  comments: ForumComment[];
}

const TopicPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  // Моковые данные для демонстрации
  const topic: Topic = {
    id: id || '1',
    title: 'Новый алгоритм шифрования на квантовых принципах',
    author: 'Cyber_Samurai',
    category: 'Кибербезопасность',
    content: `Добро пожаловать в обсуждение революционного алгоритма шифрования, основанного на принципах квантовой механики.

Этот новый подход к криптографии использует квантовые свойства частиц для создания практически невзламываемых систем шифрования. В отличие от традиционных методов, которые полагаются на сложность математических операций, квантовое шифрование использует фундаментальные законы физики.

Основные преимущества:
- Квантовая запутанность для генерации ключей
- Принцип неопределенности Гейзенберга для обнаружения подслушивания
- Квантовые вычисления для оптимизации алгоритмов

Мы приглашаем всех специалистов в области квантовой физики, криптографии и информационной безопасности к обсуждению этого прорывного направления.`,
    timestamp: '2 часа назад',
    views: 156,
    likes: 12,
    dislikes: 1,
    comments: [
      {
        id: '1',
        author: 'Quantum_Expert',
        content:
          'Интересный подход! Как вы планируете решать проблему декогеренции в реальных условиях?',
        timestamp: '1 час назад',
        likes: 5,
        dislikes: 0,
        replies: [
          {
            id: '1-1',
            author: 'Cyber_Samurai',
            content:
              'Мы используем специальные квантовые корректоры ошибок и изоляцию от внешних воздействий.',
            timestamp: '45 минут назад',
            likes: 3,
            dislikes: 0,
          },
        ],
      },
      {
        id: '2',
        author: 'Crypto_Analyst',
        content:
          'А как насчет совместимости с существующими системами? Это может стать серьезным препятствием для внедрения.',
        timestamp: '30 минут назад',
        likes: 2,
        dislikes: 1,
        replies: [],
      },
    ],
  };

  const handleBack = () => {
    navigate(PATHS.FORUM);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      message.warning('Введите текст комментария');
      return;
    }

    setLoading(true);
    try {
      // Здесь будет логика отправки комментария на сервер
      // console.log('Adding comment:', newComment);

      // Имитация задержки
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success('Комментарий добавлен!');
      setNewComment('');
    } catch (error) {
      message.error('Ошибка при добавлении комментария');
    } finally {
      setLoading(false);
    }
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
            <TextComponent className={styles['author-name']}>{comment.author}</TextComponent>
            <TextComponent className={styles['comment-time']}>{comment.timestamp}</TextComponent>
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

      <Card className={styles['topic-card']}>
        <div className={styles['topic-header']}>
          <div className={styles['topic-meta']}>
            <Title level={1} className={styles['topic-title']}>
              {topic.title}
            </Title>
            <div className={styles['topic-info']}>
              <TextComponent className={styles['topic-author']}>
                Автор: {topic.author}
              </TextComponent>
              <TextComponent className={styles['topic-category']}>
                Категория: {topic.category}
              </TextComponent>
              <TextComponent className={styles['topic-time']}>{topic.timestamp}</TextComponent>
            </div>
          </div>
          <div className={styles['topic-stats']}>
            <Space>
              <TextComponent className={styles.stat}>
                <LikeOutlined /> {topic.likes}
              </TextComponent>
              <TextComponent className={styles.stat}>
                <DislikeOutlined /> {topic.dislikes}
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
          Комментарии ({topic.comments.length})
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
              className={styles['submit-comment-button']}>
              Отправить
            </Button>
          </div>
        </Card>

        <div className={styles['comments-list']}>
          {topic.comments.map((comment) => renderComment(comment))}
        </div>
      </div>
    </div>
  );
};

export { TopicPage };
