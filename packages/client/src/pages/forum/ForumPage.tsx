import { useNavigate } from 'react-router-dom';
import { EyeOutlined, MessageOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Input, Space, Tag, Typography } from 'antd';
import type React from 'react';

import { PATHS } from '@src/routes';

import { ForumBreadcrumb } from '../../components/ForumBreadcrumb';
import { ForumStats } from '../../components/ForumStats';

import styles from './ForumPage.module.scss';

const { Title, Text: TextComponent } = Typography;

interface Topic {
  id: string;
  title: string;
  author: string;
  category: string;
  lastMessage: string;
  lastMessageAuthor: string;
  lastMessageTime: string;
  replies: number;
  views: number;
  tags: string[];
  isNew?: boolean;
  isHot?: boolean;
  isPinned?: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  topicsCount: number;
  messagesCount: number;
  lastTopic: string;
  lastTopicAuthor: string;
  lastTopicTime: string;
}

const ForumPage: React.FC = () => {
  const navigate = useNavigate();

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
      lastTopicTime: '2 часа назад'
    },
    {
      id: '2',
      name: 'Нейронные сети и ИИ',
      description: 'Искусственный интеллект, машинное обучение и нейронные сети',
      topicsCount: 89,
      messagesCount: 567,
      lastTopic: 'GPT-5: революция в NLP',
      lastTopicAuthor: 'AI_Researcher',
      lastTopicTime: '4 часа назад'
    },
    {
      id: '3',
      name: 'Кибернетические импланты',
      description: 'Технологии интеграции человека и машины',
      topicsCount: 67,
      messagesCount: 423,
      lastTopic: 'Новые нейроинтерфейсы',
      lastTopicAuthor: 'Neural_Link',
      lastTopicTime: '1 день назад'
    },
    {
      id: '4',
      name: 'Виртуальная реальность',
      description: 'VR/AR технологии и метавселенные',
      topicsCount: 156,
      messagesCount: 1203,
      lastTopic: 'Метавселенная 2.0',
      lastTopicAuthor: 'VR_Pioneer',
      lastTopicTime: '3 часа назад'
    }
  ];

  const topics: Topic[] = [
    {
      id: '1',
      title: 'Новый алгоритм шифрования на квантовых принципах',
      author: 'Cyber_Samurai',
      category: 'Кибербезопасность',
      lastMessage: 'Квантовая криптография открывает новые горизонты...',
      lastMessageAuthor: 'Quantum_Expert',
      lastMessageTime: '2 часа назад',
      replies: 24,
      views: 156,
      tags: ['NEW'],
      isNew: true
    },
    {
      id: '2',
      title: 'GPT-5: революция в обработке естественного языка',
      author: 'AI_Researcher',
      category: 'Нейронные сети и ИИ',
      lastMessage: 'Новая архитектура показывает невероятные результаты...',
      lastMessageAuthor: 'ML_Engineer',
      lastMessageTime: '4 часа назад',
      replies: 18,
      views: 234,
      tags: ['HOT'],
      isHot: true
    },
    {
      id: '3',
      title: 'Нейроинтерфейсы нового поколения',
      author: 'Neural_Link',
      category: 'Кибернетические импланты',
      lastMessage: 'Прямое подключение к мозгу становится реальностью...',
      lastMessageAuthor: 'Brain_Interface',
      lastMessageTime: '1 день назад',
      replies: 31,
      views: 189,
      tags: ['PINNED'],
      isPinned: true
    },
    {
      id: '4',
      title: 'Метавселенная 2.0: что нас ждет',
      author: 'VR_Pioneer',
      category: 'Виртуальная реальность',
      lastMessage: 'Полное погружение в цифровые миры...',
      lastMessageAuthor: 'Digital_Explorer',
      lastMessageTime: '3 часа назад',
      replies: 42,
      views: 312,
      tags: []
    }
  ];

  const handleTopicClick = (topicId: string) => {
    navigate(`${PATHS.FORUM_TOPIC}/${topicId}`);
  };

  const handleCreateTopic = () => {
    navigate(PATHS.FORUM_CREATE_TOPIC);
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'NEW': return 'pink';
      case 'HOT': return 'orange';
      case 'PINNED': return 'green';
      default: return 'blue';
    }
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
            className={styles['create-button']}
          >
            НОВАЯ ТЕМА
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        <ForumStats 
          totalTopics={436}
          totalMessages={3085}
          totalUsers={1247}
          totalViews={15689}
        />
        
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
                    Последнее: {category.lastTopic} от {category.lastTopicAuthor} ({category.lastTopicTime})
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
                onClick={() => handleTopicClick(topic.id)}
              >
                <div className={styles['topic-header']}>
                  <div className={styles['topic-title']}>
                    {topic.tags.map((tag) => (
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
                        <MessageOutlined /> {topic.replies}
                      </TextComponent>
                      <TextComponent className={styles.stat}>
                        <EyeOutlined /> {topic.views}
                      </TextComponent>
                    </Space>
                  </div>
                </div>
                
                <div className={styles['topic-meta']}>
                  <TextComponent className={styles['topic-meta-text']}>
                    Автор: {topic.author} | Раздел: {topic.category} | Последнее сообщение: {topic.lastMessageTime}
                  </TextComponent>
                </div>
                
                <div className={styles['topic-excerpt']}>
                  <TextComponent className={styles['topic-excerpt-text']}>
                    {topic.lastMessage}
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
