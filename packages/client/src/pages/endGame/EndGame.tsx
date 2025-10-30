import { useLocation } from 'react-router-dom';

import { Variants } from '@pages/endGame/constants';

import { StatusInfo } from './StatusInfo';

import styles from './EndGame.module.scss';

/** variant будет браться из состояния завершения игры */
const variant = Variants.GAME_OVER;

export const EndGame = () => {
  const { state } = useLocation();

  return (
    <div className={styles.wrapper}>
      <StatusInfo variant={state?.isComplete ?? variant} />
    </div>
  );
};
