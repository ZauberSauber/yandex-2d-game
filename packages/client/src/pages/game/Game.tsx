import { useEffect } from 'react';

import GameEngine from '../../gameEngine/GameEngine';

import styles from './Game.module.scss';

export const Game = () => {
  const onGameOver = () => {
    // eslint-disable-next-line no-console
    console.log('Game over');
  };

  const onResourceUpdate = () => {
    // eslint-disable-next-line no-console
    console.log('Update resource');
  };

  useEffect(() => {
    new GameEngine({
      containerId: 'game',
      onGameOver,
      onResourceUpdate,
    });
  }, []);

  return (
    <div id="container">
      <div id="game" className={styles.game}></div>
    </div>
  );
};
