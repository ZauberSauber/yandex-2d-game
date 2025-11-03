import { Fragment } from 'react';
import { Flex } from 'antd';

import { LOCATIONS } from '@src/gameEngine/constants/locations';

import { Mission } from './Mission';

import styles from './Mission.module.scss';

export const Missions = () => {
  const values = Object.values(LOCATIONS);

  let firstUncompleted = 0;

  for (let i = 0; i < values.length; i++) {
    const { isComplete } = values[i];
    if (!isComplete) {
      firstUncompleted = i;
      break;
    }
  }
  const displayMissions = values.slice(0, firstUncompleted + 1);

  const missions = displayMissions.map(({ name, isComplete, achievementText, reward }) => (
    <Fragment key={name}>
      <Mission
        award={reward}
        title={`1. ${name}`}
        description={achievementText ?? ''}
        complete={isComplete}
      />
    </Fragment>
  ));

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Миссии</h3>
      <Flex gap={10} wrap className={styles.missions}>
        {missions}
      </Flex>
      <div className={styles['helper-text']}>
        Доступен только следующий по порядку уровень. Будущие уровни скрыты, пока не пройдёте
        текущий.
      </div>
    </div>
  );
};
