import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { EyeOutlined, MessageOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Input, Space, Tag, Typography } from 'antd';
import type React from 'react';

import { ForumBreadcrumb, ForumStats } from '@components';
import { forumApi } from '@src/api/forumApi';
import { PATHS } from '@src/routes/constants';

import type { Category, TTopic } from './types';

import styles from './ForumPage.module.scss';

const { Title, Text: TextComponent } = Typography;

const ForumPage: React.FC = () => {
  const [topics, setTopics] = useState<TTopic[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    forumApi.getTopics().then(({ data }) => {
      setTopics(data || []);
    });
  }, []);

  // Моковые данные для демонстрации
  const categories: Category[] = [
    {
      id: '1',
      name: 'Кибербезопасность',
      description: 'Обсуждение вопросов информационной безопасности, шифрования и защиты данных',
      topicsCount: 124,
      messagesCount: 892,
      lastTopic: 'Новый алгоритм шифрования',
      lastTopicAuthor: 'Cyber_Samurai',
      lastTopicTime: '2 часа назад',
    },
    {
      id: '2',
      name: 'Нейронные сети и ИИ',
      description: 'Искусственный интеллект, машинное обучение и нейронные сети',
      topicsCount: 89,
      messagesCount: 567,
      lastTopic: 'GPT-5: революция в NLP',
      lastTopicAuthor: 'AI_Researcher',
      lastTopicTime: '4 часа назад',
    },
    {
      id: '3',
      name: 'Кибернетические импланты',
      description: 'Технологии интеграции человека и машины',
      topicsCount: 67,
      messagesCount: 423,
      lastTopic: 'Новые нейроинтерфейсы',
      lastTopicAuthor: 'Neural_Link',
      lastTopicTime: '1 день назад',
    },
    {
      id: '4',
      name: 'Виртуальная реальность',
      description: 'VR/AR технологии и метавселенные',
      topicsCount: 156,
      messagesCount: 1203,
      lastTopic: 'Метавселенная 2.0',
      lastTopicAuthor: 'VR_Pioneer',
      lastTopicTime: '3 часа назад',
    },
  ];

  const handleCreateTopic = () => {
    navigate(PATHS.FORUM_CREATE_TOPIC);
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'NEW':
        return 'pink';
      case 'HOT':
        return 'orange';
      case 'PINNED':
        return 'green';
      default:
        return 'blue';
    }
  };

  const onTopciClick = (topicId: string) => {
    navigate(topicId);
  };

  return (
    <div className={styles['forum-page']}>
      <ForumBreadcrumb />

      <div className={styles.header}>
        <Title level={1} className={styles.title}>
          Форум Neo-Tokyo
        </Title>

        <div className={styles['search-section']}>
          <Input
            placeholder="Поиск по форуму..."
            prefix={<SearchOutlined />}
            className={styles['search-input']}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateTopic}
            className={styles['create-button']}>
            НОВАЯ ТЕМА
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        <ForumStats totalTopics={436} totalMessages={3085} totalUsers={1247} totalViews={15689} />

        <section className={styles['categories-section']}>
          <Title level={2} className={styles['section-title']}>
            Категории
          </Title>

          <div className={styles['categories-list']}>
            {categories.map((category) => (
              <Card key={category.id} className={styles['category-card']}>
                <div className={styles['category-header']}>
                  <Title level={4} className={styles['category-name']}>
                    {category.name}
                  </Title>
                  <TextComponent className={styles['category-stats']}>
                    Тем: {category.topicsCount} | Сообщений: {category.messagesCount}
                  </TextComponent>
                </div>

                <TextComponent className={styles['category-description']}>
                  {category.description}
                </TextComponent>

                <div className={styles['category-footer']}>
                  <TextComponent className={styles['last-post']}>
                    Последнее: {category.lastTopic} от {category.lastTopicAuthor} (
                    {category.lastTopicTime})
                  </TextComponent>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Divider className={styles.divider} />

        <section className={styles['topics-section']}>
          <Title level={2} className={styles['section-title']}>
            Последние темы
          </Title>

          <div className={styles['topics-list']}>
            {topics.map((topic) => (
              <Card
                key={topic.id}
                className={styles['topic-card']}
                onClick={() => onTopciClick(`${topic.id}`)}>
                <div className={styles['topic-header']}>
                  <div className={styles['topic-title']}>
                    {topic.tags?.map((tag) => (
                      <Tag key={tag} color={getTagColor(tag)} className={styles['topic-tag']}>
                        {tag}
                      </Tag>
                    ))}
                    <Title level={4} className={styles['topic-title-text']}>
                      {topic.title}
                    </Title>
                  </div>
                  <div className={styles['topic-stats']}>
                    <Space>
                      <TextComponent className={styles.stat}>
                        <MessageOutlined /> {topic.commentCount}
                      </TextComponent>
                      <TextComponent className={styles.stat}>
                        <EyeOutlined /> {topic.views}
                      </TextComponent>
                    </Space>
                  </div>
                </div>

                <div className={styles['topic-meta']}>
                  <TextComponent className={styles['topic-meta-text']}>
                    Автор: {topic.authorLogin} | Раздел: {topic.category} | Последнее сообщение:{' '}
                    {`${new Date(topic.updatedAt).getUTCDate()}.${new Date(topic.updatedAt).getUTCMonth()}.${new Date(topic.updatedAt).getUTCFullYear()}`}
                  </TextComponent>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export { ForumPage };
