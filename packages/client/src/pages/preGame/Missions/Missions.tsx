import { Fragment, useMemo } from 'react';
import { Flex } from 'antd';

import { selectLocation } from '@slices';
import { useSelector } from '@src/store';

import { Mission } from './Mission';

import styles from './Mission.module.scss';

export const Missions = () => {
  const locations = useSelector(selectLocation);

  const values = Object.values(locations);

  let uncompletedMission: number | null = null;
  let allCompleted = false;

  for (let i = 0; i < values.length; i++) {
    const { isComplete } = values[i];
    if (!isComplete) {
      uncompletedMission = i;
      break;
    }
    if (isComplete && i === values.length - 1) {
      allCompleted = true;
    }
  }

  const displayMissions = useMemo(() => {
    if (allCompleted) return values;
    if (uncompletedMission) return values.slice(0, uncompletedMission + 1);
    return values[0] ? [values[0]] : values;
  }, [allCompleted, uncompletedMission, values]);

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
