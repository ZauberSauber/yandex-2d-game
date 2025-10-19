import { useEffect } from 'react';

import GameEngine from '../../gameEngine/GameEngine';

import styles from './Game.module.scss';

export const Game = () => {
  const onGameOver = () => {
    console.log('Game over')
  }

  const onResourceUpdate = () => {
    console.log('Update resource')
  }

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
