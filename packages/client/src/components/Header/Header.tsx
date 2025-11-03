import { useNavigate } from 'react-router-dom';
import type { TabsProps } from 'antd';

import { Tabs } from '@src/components/Tabs';
import { PATHS } from '@src/routes';

import styles from './Header.module.scss';

export const Header = () => {
  const navigate = useNavigate();

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

  return (
    <Tabs onTabClick={onTabClick} hideBottomLine className={styles.header} items={tabsItems} />
  );
};
