import { Fragment } from 'react';
import { Flex } from 'antd';

import { selectLocation } from '@slices';
import { useSelector } from '@src/store';

import { Mission } from './Mission';

import styles from './Mission.module.scss';

export const Missions = () => {
  const locations = useSelector(selectLocation);

  const values = Object.values(locations);

  let firstUncompleted = 0;

  for (let i = 0; i < values.length; i++) {
    const { isComplete } = values[i];
    if (!isComplete) {
      firstUncompleted = i;
      break;
    }
  }

  const displayMissions = !firstUncompleted ? values : values.slice(0, firstUncompleted + 1);

  const missions = displayMissions.map(({ name, isComplete, achievementText, reward }, idx) => (
    <Fragment key={name}>
      <Mission
        award={reward}
        title={`${idx + 1}. ${name}`}
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
