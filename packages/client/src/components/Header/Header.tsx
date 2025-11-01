import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { TabsProps } from 'antd';

import { Button } from '@components/Button';
import { Tabs } from '@src/components/Tabs';
import { PATHS } from '@src/routes';

import styles from './Header.module.scss';

interface DocumentWithFullscreen extends Document {
  webkitFullscreenElement?: Element | null;
  mozFullScreenElement?: Element | null;
  msFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
}

interface HTMLElementWithFullscreen extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

const getFullscreenElement = (): Element | null =>
  (document.fullscreenElement ||
    (document as DocumentWithFullscreen).webkitFullscreenElement ||
    (document as DocumentWithFullscreen).mozFullScreenElement ||
    (document as DocumentWithFullscreen).msFullscreenElement) || null;

const requestFullscreen = (element: HTMLElement): Promise<void> => {
  if (element.requestFullscreen) {
    return element.requestFullscreen();
  }
  const fullscreenElement = element as HTMLElementWithFullscreen;
  if (fullscreenElement.webkitRequestFullscreen) {
    return fullscreenElement.webkitRequestFullscreen();
  }
  if (fullscreenElement.mozRequestFullScreen) {
    return fullscreenElement.mozRequestFullScreen();
  }
  if (fullscreenElement.msRequestFullscreen) {
    return fullscreenElement.msRequestFullscreen();
  }
  return Promise.reject(new Error('Fullscreen API не поддерживается'));
};

const exitFullscreen = (): Promise<void> => {
  if (document.exitFullscreen) {
    return document.exitFullscreen();
  }
  const fullscreenDocument = document as DocumentWithFullscreen;
  if (fullscreenDocument.webkitExitFullscreen) {
    return fullscreenDocument.webkitExitFullscreen();
  }
  if (fullscreenDocument.mozCancelFullScreen) {
    return fullscreenDocument.mozCancelFullScreen();
  }
  if (fullscreenDocument.msExitFullscreen) {
    return fullscreenDocument.msExitFullscreen();
  }
  return Promise.reject(new Error('Fullscreen API не поддерживается'));
};

const getFullscreenChangeEvent = (): string => {
  if (document.fullscreenElement !== undefined) {
    return 'fullscreenchange';
  }
  const fullscreenDocument = document as DocumentWithFullscreen;
  if (fullscreenDocument.webkitFullscreenElement !== undefined) {
    return 'webkitfullscreenchange';
  }
  if (fullscreenDocument.mozFullScreenElement !== undefined) {
    return 'mozfullscreenchange';
  }
  if (fullscreenDocument.msFullscreenElement !== undefined) {
    return 'MSFullscreenChange';
  }
  return 'fullscreenchange';
};

export const Header = () => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const messageRef = useRef<HTMLParagraphElement>(null);

  const tabsItems: TabsProps['items'] = [
    { key: PATHS.HOME, label: 'Главная' },
    { key: PATHS.END, label: 'Последний экран' },
    { key: PATHS.GAME, label: 'Игра' },
    { key: PATHS.PROFILE, label: 'Профиль' },
    { key: PATHS.SIGN_IN, label: 'Войти' },
    { key: PATHS.SIGN_UP, label: 'Регистрация' },
    { key: PATHS.BLOG, label: 'Блог' },
    { key: PATHS.LEADERBOARD, label: 'Лидербоард' },
  ];

  const onTabClick = (key: string) => navigate(key);

  const handleToggle = () => {
    const fullscreenElement = getFullscreenElement();

    if (!fullscreenElement) {
      requestFullscreen(document.documentElement)
        .then(() => {
          setIsFullscreen(true);
          if (messageRef.current) {
            messageRef.current.style.display = 'block';
          }
        })
        .catch((err) => {
          console.error('Ошибка при включении полноэкранного режима:', err);
        });
    } else {
      exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch((err) => {
          console.error('Ошибка при выходе из полноэкранного режима:', err);
        });
    }
  };

  useEffect(() => {
    setIsFullscreen(getFullscreenElement() !== null);

    const handleFullscreenChange = () => {
      const message = messageRef.current;
      const fullscreenElement = getFullscreenElement();

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

    const eventName = getFullscreenChangeEvent();
    document.addEventListener(eventName, handleFullscreenChange);

    return () => {
      document.removeEventListener(eventName, handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (isFullscreen) {
      const message = messageRef.current;
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
      <Tabs onTabClick={onTabClick} hideBottomLine className={styles.header} items={tabsItems} />
      <div className={styles.fullscreenControls}>
        <p ref={messageRef} className={styles.message} style={{ display: 'none' }}>
          Полноэкранный режим включен
        </p>
        <Button onClick={handleToggle} className={styles.toggler}>
          Fullscreen: {isFullscreen ? 'OFF' : 'ON'}
        </Button>
      </div>
    </div>
  );
};
