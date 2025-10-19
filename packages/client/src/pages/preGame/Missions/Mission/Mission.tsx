import { Button } from '@components';

import styles from './Mission.module.scss';

interface IMission {
  title: string;
  description: string;
  award: string;
  complete?: boolean;
}

export const Mission = ({ title, complete, award, description }: IMission) => (
  <div className={styles.mission}>
    <h4 className={styles.title}>{title}</h4>
    <div className={styles.description}>{description}</div>
    <div className={styles.award}>Награда: {award}</div>
    {complete ? (
      <h4 className={styles.complete}>Пройден</h4>
    ) : (
      <Button className={styles.btn}>Начать</Button>
    )}
  </div>
);
