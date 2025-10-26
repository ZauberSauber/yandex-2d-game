import cn from 'classnames';

import { Button } from '@components';

import styles from '../../../EndGame.module.scss';
import gameOverStyles from './GameOver.module.scss';

export const GameOver = () => (
  <>
    <h1 className={cn(styles.statusTitle, gameOverStyles.title)}>Провалено</h1>
    <Button className={styles.actionBtn}>Повторить</Button>
  </>
);
