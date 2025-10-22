import { memo, useMemo } from 'react';
import { Flex } from 'antd';

import { Complete, GameOver } from './Variants';
import type { Variants } from '../constants';

interface IStatusInfo {
  variant: Variants;
}

export const StatusInfo = memo(({ variant }: IStatusInfo) => {
  /** По необходимости сюда добавляются варианты окончания игры */
  const renderVariant = useMemo(() => {
    switch (variant) {
      case 'complete': {
        return <Complete />;
      }
      case 'gameOver': {
        return <GameOver />;
      }
      default:
        return <Complete />;
    }
  }, [variant]);

  return (
    <Flex gap={35} vertical align="center" justify="center" style={{ height: '100%' }}>
      {renderVariant}
    </Flex>
  );
});
