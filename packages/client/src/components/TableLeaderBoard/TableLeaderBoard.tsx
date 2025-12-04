import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import type { DataTypeTable } from '@src/api/leaderboardApi/types';
import type { TableProps } from 'antd';

import { ConstantsLeaderboard } from '@src/api/leaderboardApi/types';
import { PAGE_SIZE_TABLE } from '@src/constants/common';

import { Button } from '../Button';

import style from './TableLeaderBoard.module.scss';

const COLUMNS: TableProps<DataTypeTable>['columns'] = [
  {
    title: '#',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'НИКНЕЙМ ИГРОКА',
    dataIndex: 'displayName',
    key: 'displayName',
  },
  {
    title: 'УРОВЕНЬ',
    dataIndex: ConstantsLeaderboard.raitingFieldName,
    key: ConstantsLeaderboard.raitingFieldName,
  },
];

type TableLeaderBoardProps = {
  tableData: DataTypeTable[];
};

export const TableLeaderBoard = ({ tableData }: TableLeaderBoardProps) => (
  <Table<DataTypeTable>
    className={style.table}
    pagination={{
      pageSize: PAGE_SIZE_TABLE,
      position: ['bottomCenter'],
      itemRender: (_, type, originalElement) => {
        if (type === 'prev') {
          return (
            <Button className={style['button-pagination']} icon={<LeftOutlined />}>
              Назад
            </Button>
          );
        }
        if (type === 'next') {
          return (
            <Button className={style['button-pagination']} icon={<RightOutlined />}>
              Вперёд
            </Button>
          );
        }
        return originalElement;
      },
      hideOnSinglePage: true,
    }}
    components={{
      header: {
        cell: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
          <th
            {...props}
            style={{
              borderRadius: 0,
              color: '#8a2be2',
              background: '#0a0a12',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          />
        ),
      },
    }}
    columns={COLUMNS}
    dataSource={tableData}
    loading={false}
  />
);
