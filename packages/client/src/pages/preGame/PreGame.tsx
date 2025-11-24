import { usePage } from '@hooks';
import type { TabsProps } from 'antd';

import { Tabs } from '@components/Tabs';

import { GameProfile } from './GameProfile';
import { initPreGamePage } from './initPreGamePage';
import { Inventory } from './Inventory';
import { Missions } from './Missions';

import styles from './PreGame.module.scss';

export const PreGame = () => {
  const tabsItems: TabsProps['items'] = [
    { key: 'missions', label: 'Миссии', children: <Missions /> },
    { key: 'inventory', label: 'Снаряжение', children: <Inventory /> },
  ];

  usePage({ initPage: initPreGamePage });

  return (
    <>
      <h4 className={styles.title}>Neo‑Tokyo Network</h4>
      <div className={styles.wrapper}>
        <GameProfile />
        <Tabs items={tabsItems} className={styles.antTabsNav} />
      </div>
    </>
  );
};
