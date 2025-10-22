import { Variants } from '@pages/endGame/constants';

import { StatusInfo } from './StatusInfo';

import styles from './EndGame.module.scss';

/** variant будет браться из состояния завершения игры */
const variant = Variants.COMPLETE;

export const EndGame = () => (
  <div className={styles.wrapper}>
    <StatusInfo variant={variant} />
  </div>
);
