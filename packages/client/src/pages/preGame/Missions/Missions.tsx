import { Flex } from 'antd';

import { Mission } from './Mission';

import styles from './Mission.module.scss';

export const Missions = () => (
  <div className={styles.wrapper}>
    <h3 className={styles.title}>Миссии</h3>
    <Flex gap={10} wrap className={styles.missions}>
      <Mission
        award="+200$"
        title="1. Побег"
        description="Выйти из сектора без поднятия тревоги."
        complete
      />
      <Mission award="+200$" title="2. Начало пути" description="Изуть окрестности" />
    </Flex>
    <div className={styles['helper-text']}>
      Доступен только следующий по порядку уровень. Будущие уровни скрыты, пока не пройдёте текущий.
    </div>
  </div>
);
