import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { TabsProps } from 'antd';

import { Button } from '@components/Button';
import {
  fullscreenApi,
} from '@src/api/fullscreenApi';
import { notificationsApi } from '@src/api/notificationsApi';
import { Tabs } from '@src/components/Tabs';
import { PATHS } from '@src/routes/constants';

import styles from './Header.module.scss';


export const Header = () => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isNotifiesEnabled, setIsNotifiesEnabled] = useState(false);
  const fullScreenBtnRef = useRef<HTMLParagraphElement>(null);

  const tabsItems: TabsProps['items'] = [
    { key: PATHS.HOME, label: 'Главная' },
    { key: PATHS.END, label: 'Последний экран' },
    { key: PATHS.GAME, label: 'Игра' },
    { key: PATHS.PROFILE, label: 'Профиль' },
    { key: PATHS.SIGN_IN, label: 'Войти' },
    { key: PATHS.SIGN_UP, label: 'Регистрация' },
    { key: PATHS.FORUM, label: 'Форум' },
    { key: PATHS.LEADERBOARD, label: 'Лидербоард' },
  ];

  const onTabClick = (key: string) => navigate(key);

  const handleFullscreenToggle = () => {
    const fullscreenElement = fullscreenApi.getFullscreenElement();

    if (!fullscreenElement) {
      fullscreenApi.requestFullscreen(document.documentElement)
        .then(() => {
          setIsFullscreen(true);
          if (fullScreenBtnRef.current) {
            fullScreenBtnRef.current.style.display = 'block';
          }
        })
        .catch((err) => {
          console.error('Ошибка при включении полноэкранного режима:', err);
        });
    } else {
      fullscreenApi.exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch((err) => {
          console.error('Ошибка при выходе из полноэкранного режима:', err);
        });
    }
  };

  const handleNotifiesEnable = async () => {
    if (!notificationsApi.isSupported()) {
      alert('Браузер не поддерживает уведомления');
      return;
    }

    const granted = await notificationsApi.requestPermission();

    if (granted) {
      setIsNotifiesEnabled(true);

      await notificationsApi.show('Уведомления включены');
    }
  };

  useEffect(() => {
    setIsFullscreen(fullscreenApi.getFullscreenElement() !== null);

    const handleFullscreenChange = () => {
      const message = fullScreenBtnRef.current;
      const fullscreenElement = fullscreenApi.getFullscreenElement();

      if (!fullscreenElement) {
        setIsFullscreen(false);
        if (message) {
          message.style.display = 'none';
        }
      } else {
        setIsFullscreen(true);
        if (message) {
          message.style.display = 'block';
        }
      }
    };

    const eventName = fullscreenApi.getFullscreenChangeEvent();
    document.addEventListener(eventName, handleFullscreenChange);

    return () => {
      document.removeEventListener(eventName, handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (isFullscreen) {
      const message = fullScreenBtnRef.current;
      const timer = setTimeout(() => {
        if (message) {
          message.style.display = 'none';
        }
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
    return undefined;
  }, [isFullscreen]);

  return (
    <div className={styles.headerContainer}>
      <Button onClick={handleNotifiesEnable}>
        Уведомления: {isNotifiesEnabled ? 'включены' : 'включить'}
      </Button>
      <Tabs onTabClick={onTabClick} hideBottomLine className={styles.header} items={tabsItems} />
      <div className={styles.fullscreenControls}>
        <p ref={fullScreenBtnRef} className={styles.message} style={{ display: 'none' }}>
          Полноэкранный режим включен
        </p>
        <Button onClick={handleFullscreenToggle} className={styles.toggler}>
          Fullscreen: {isFullscreen ? 'OFF' : 'ON'}
        </Button>
      </div>
    </div>
  );
};
