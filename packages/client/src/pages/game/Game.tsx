import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { notification } from 'antd';

import { Variants } from '@pages/endGame/constants';
import { DURATION_NOTIFY } from '@src/constants/common';
import { PATHS } from '@src/routes/constants';
import { setLeaderboardThunk } from '@src/slices/leaderboardSlice';
import { getUserInfoThunk, selectUser } from '@src/slices/userSlice';
import { useDispatch, useSelector } from '@src/store';

import GameEngine from '../../gameEngine/GameEngine';

import styles from './Game.module.scss';

export const Game = () => {
  const dispatch = useDispatch();
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const userInfo = useSelector(selectUser);

  const onGameOver = async () => {
    navigate(PATHS.END, { state: { isComplete: Variants.GAME_OVER } });

    if (userInfo?.display_name) {
      const result = await dispatch(
        setLeaderboardThunk({
          displayName: userInfo.display_name,
          DisplayFlexersLevel: 1,
        })
      );

      if (setLeaderboardThunk.fulfilled.match(result)) {
        notification.success({
          message: 'Данные успешно сохранены',
          duration: DURATION_NOTIFY,
          closable: true,
        });

        return;
      }

      notification.error({
        message: 'Неудалось сохранить результаты игры на сервере. Проверьте наличие у вас никнейма',
        duration: DURATION_NOTIFY,
        closable: true,
      });

      return;
    }
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

  useEffect(() => {
    dispatch(getUserInfoThunk());
  }, [dispatch]);

  return (
    <div id="container">
      <div id="game" className={styles.game}></div>
    </div>
  );
};
