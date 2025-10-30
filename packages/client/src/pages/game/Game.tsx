import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import GameEngine from '../../gameEngine/GameEngine';

import styles from './Game.module.scss';

export const Game = () => {
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);
  const navigate = useNavigate();

  const onGameOver = () => {
    // todo: вынести PATHS, чтобы не было циклической связи
    navigate('/end');
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
