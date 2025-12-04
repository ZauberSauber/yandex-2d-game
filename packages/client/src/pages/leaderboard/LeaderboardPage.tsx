import { useEffect } from 'react';
import { Typography } from 'antd';

import { Spinner } from '@src/components';
import { Overlay } from '@src/components/Overlay';
import { TableLeaderBoard } from '@src/components/TableLeaderBoard';
import {
  getLeaderboardTeamThunk,
  selectLeaderboardLoading,
  selectLeaderboardTable,
} from '@src/slices/leaderboardSlice';
import { useDispatch, useSelector } from '@src/store';

import style from './LeaderboardPage.module.scss';

export const LeaderboardPage = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();

  const leaderboardTableData = useSelector(selectLeaderboardTable);
  const leaderboardLoading = useSelector(selectLeaderboardLoading);

  useEffect(() => {
    dispatch(getLeaderboardTeamThunk(0));
  }, [dispatch]);

  return (
    <div className={style.container}>
      <Title level={2} className={style.title}>
        {'Рейтинг игроков'}
      </Title>
      {!leaderboardLoading && leaderboardTableData && (
        <TableLeaderBoard tableData={leaderboardTableData} />
      )}
      {!leaderboardLoading && !leaderboardTableData && (
        <Title level={2} className={style.title}>
          {'Нет данных о турнирной таблице'}
        </Title>
      )}
      {leaderboardLoading && (
        <Overlay>
          <Spinner />
        </Overlay>
      )}
    </div>
  );
};
