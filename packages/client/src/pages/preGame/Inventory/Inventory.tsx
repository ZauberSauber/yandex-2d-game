import { useMemo } from 'react';
import { Flex } from 'antd';

import styles from './Inventory.module.scss';

export const Inventory = () => {
  const cells = useMemo(
    () => Array.from({ length: 84 }, (_, i) => <div className={styles.cell} key={i}></div>),
    []
  );

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Снаряжение</h3>
      <div className={styles.cells}>
        <Flex wrap="wrap">{cells}</Flex>
      </div>
    </div>
  );
};
