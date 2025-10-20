import type { TabsProps } from 'antd';

import { Tabs } from '@components';
import { Missions } from '@pages/preGame/Missions';

import { GameProfile } from './GameProfile';
import { Inventory } from './Inventory';

import styles from './PreGame.module.scss';

export const PreGame = () => {
  const tabsItems: TabsProps['items'] = [
    {
      key: 'inventory',
      label: 'Снаряжение',
      children: <Inventory />,
    },
    {
      key: 'missions',
      label: 'Миссии',
      children: <Missions />,
    },
  ];

  return (
    <div>
      <h4 className={styles.title}>Neo‑Tokyo Network</h4>
      <div className={styles.wrapper}>
        <GameProfile />
        <Tabs items={tabsItems} className={styles.antTabsNav} />
      </div>
    </div>
  );
};
