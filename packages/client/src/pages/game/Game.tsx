import { useEffect, useState } from 'react';

import GameEngine from '../../gameEngine/GameEngine';

import styles from './Game.module.scss';

export const Game = () => {
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);

  const onGameOver = () => {
    // eslint-disable-next-line no-console
    console.log('Game over');
  };

  const onResourceUpdate = () => {
    // eslint-disable-next-line no-console
    console.log('Update resource');
  };

  useEffect(() => {
    const engine = new GameEngine({
      containerId: 'game',
      onGameOver,
      onResourceUpdate,
    });

    setGameEngine(engine);

    return () => {
      gameEngine?.destroy();
    };
  }, []);

  return (
    <div id="container">
      <div id="game" className={styles.game}></div>
    </div>
  );
};
