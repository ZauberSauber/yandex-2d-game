import { Flex } from 'antd';

import { Button } from '@components';

import styles from './GameProfile.module.scss';

export const GameProfile = () => (
  <aside className={styles.wrapper}>
    <h4>
      <span className={styles.name}>Имя:</span> <span className={styles['name-value']}>Джеймс</span>
    </h4>
    <div className={styles.progress}>
      <Flex className={styles.item} justify="space-between">
        <div>Уровень</div>
        <div>1</div>
      </Flex>
      <Flex className={styles.item} justify="space-between">
        <div>Кредиты</div>
        <div>0</div>
      </Flex>
      <Flex className={styles.item} justify="space-between">
        <div>Опыт</div>
        <div>0 / 1000</div>
      </Flex>
    </div>
    <Button>НАЧАТЬ</Button>
  </aside>
);
