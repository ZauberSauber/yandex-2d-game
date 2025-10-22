import cn from 'classnames';

import { Button } from '@components';

import styles from '../../../EndGame.module.scss';
import completeStyles from './Complete.module.scss';

export const Complete = () => (
  <>
    <h1 className={cn(styles.statusTitle, completeStyles.title)}>Пройдено</h1>
    <div className={completeStyles.info}>
      <span className={completeStyles.label}>Получено опыта: </span>
      <span className={completeStyles.text}>1000</span>
    </div>
    <Button className={styles.actionBtn}>Следующий уровень</Button>
  </>
);
