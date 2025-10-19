import { EyeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import type React from 'react';

import styles from './ForumStats.module.scss';

interface ForumStatsProps {
  totalTopics: number;
  totalMessages: number;
  totalUsers: number;
  totalViews: number;
}

const ForumStats: React.FC<ForumStatsProps> = ({
  totalTopics,
  totalMessages,
  totalUsers,
  totalViews
}) => (
    <Card className={styles['stats-card']}>
      <Row gutter={16}>
        <Col span={6}>
          <Statistic
            title="Темы"
            value={totalTopics}
            prefix={<MessageOutlined />}
            className={styles.statistic}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Сообщения"
            value={totalMessages}
            prefix={<MessageOutlined />}
            className={styles.statistic}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Пользователи"
            value={totalUsers}
            prefix={<UserOutlined />}
            className={styles.statistic}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Просмотры"
            value={totalViews}
            prefix={<EyeOutlined />}
            className={styles.statistic}
          />
        </Col>
      </Row>
    </Card>
  );

export { ForumStats };
