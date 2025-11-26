import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import type { TableProps } from 'antd';

import { Button } from '../Button';
import { MOCK_DATA } from './MockData';
import type { DataType } from './MockData';

import style from './TableLeaderBoard.module.scss';

const COLUMNS: TableProps<DataType>['columns'] = [
  {
    title: '#',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'НИКНЕЙМ ИГРОКА',
    dataIndex: 'display_Name',
    key: 'display_Name',
  },
  {
    title: 'УРОВЕНЬ',
    dataIndex: 'level',
    key: 'level',
  },
];

export const TableLeaderBoard = () => (
  <Table<DataType>
    className={style.table}
    pagination={{
      pageSize: 10,
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
    dataSource={MOCK_DATA}
    loading={false}
  />
);
