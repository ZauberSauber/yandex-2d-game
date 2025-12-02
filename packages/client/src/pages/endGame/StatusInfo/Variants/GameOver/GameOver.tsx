import { useEffect } from 'react';
import { notification } from 'antd';
import cn from 'classnames';

import { Button } from '@components';
import { DURATION_NOTIFY } from '@src/constants/common';
import { setLeaderboardThunk } from '@src/slices/leaderboardSlice';
import { getUserInfoThunk, selectUser } from '@src/slices/userSlice';
import { useDispatch, useSelector } from '@src/store';

import styles from '../../../EndGame.module.scss';
import gameOverStyles from './GameOver.module.scss';

export const GameOver = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector(selectUser);

  //TODO: убрать захордкоженное отправку данных о результатах игры
  const handleCkick = async () => {
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
        message: 'Неудалось сохранить результаты игры на сервере',
        duration: DURATION_NOTIFY,
        closable: true,
      });

      return;
    }

    notification.warning({
      message: 'Неудалось сохранить результаты игры на сервере. Проверьте наличие у вас никнейма',
      duration: DURATION_NOTIFY,
      closable: true,
    });
  };

  useEffect(() => {
    dispatch(getUserInfoThunk());
  }, [dispatch]);

  return (
    <>
      <h1 className={cn(styles.statusTitle, gameOverStyles.title)}>Провалено</h1>
      <Button className={styles.actionBtn} onClick={handleCkick}>
        Повторить
      </Button>
    </>
  );
};
