import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Variants } from '@pages/endGame/constants';
import { PATHS } from '@src/routes/constants';

import GameEngine from '../../gameEngine/GameEngine';

import styles from './Game.module.scss';

export const Game = () => {
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);
  const navigate = useNavigate();
  const { state } = useLocation();

  const onGameOver = () => {
    navigate(PATHS.END, { state: { isComplete: Variants.GAME_OVER } });
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
      playerStatsInit: state,
    });

    setGameEngine(engine);

    return () => {
      gameEngine?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div id="container">
      <div id="game" className={styles.game}></div>
    </div>
  );
};
