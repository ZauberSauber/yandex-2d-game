import { Typography } from 'antd';

import { TableLeaderBoard } from '@src/components/TableLeaderBoard';

import style from './LeaderboardPage.module.scss';

export const LeaderboardPage = () => {
  const { Title } = Typography;

  return (
    <div className={style.container}>
      <Title level={2} className={style.title}>
        {'Рейтинг игроков'}
      </Title>
      <TableLeaderBoard />
    </div>
  );
};
