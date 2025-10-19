import { useLocation, useNavigate } from 'react-router-dom';
import { FileTextOutlined, HomeOutlined, MessageOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import type React from 'react';

import styles from './ForumBreadcrumb.module.scss';

const ForumBreadcrumb: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getBreadcrumbItems = () => {
    const path = location.pathname;
    
    if (path === '/forum') {
      return [
        {
          title: (
            <span className={styles.breadcrumbItem} onClick={() => navigate('/')}>
              <HomeOutlined /> Главная
            </span>
          )
        },
        {
          title: (
            <span className={styles['breadcrumb-item']}>
              <MessageOutlined /> Форум
            </span>
          )
        }
      ];
    }
    
    if (path === '/forum/create-topic') {
      return [
        {
          title: (
            <span className={styles.breadcrumbItem} onClick={() => navigate('/')}>
              <HomeOutlined /> Главная
            </span>
          )
        },
        {
          title: (
            <span className={styles.breadcrumbItem} onClick={() => navigate('/forum')}>
              <MessageOutlined /> Форум
            </span>
          )
        },
        {
          title: (
            <span className={styles['breadcrumb-item']}>
              <PlusOutlined /> Создание темы
            </span>
          )
        }
      ];
    }
    
    if (path.startsWith('/forum/topic/')) {
      return [
        {
          title: (
            <span className={styles.breadcrumbItem} onClick={() => navigate('/')}>
              <HomeOutlined /> Главная
            </span>
          )
        },
        {
          title: (
            <span className={styles.breadcrumbItem} onClick={() => navigate('/forum')}>
              <MessageOutlined /> Форум
            </span>
          )
        },
        {
          title: (
            <span className={styles['breadcrumb-item']}>
              <FileTextOutlined /> Тема
            </span>
          )
        }
      ];
    }
    
    return [];
  };

  return (
    <div className={styles.breadcrumbContainer}>
      <Breadcrumb
        items={getBreadcrumbItems()}
        separator=">"
        className={styles.breadcrumb}
      />
    </div>
  );
};

export { ForumBreadcrumb };
