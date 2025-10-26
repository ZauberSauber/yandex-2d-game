import { Tabs } from 'antd';
import cn from 'classnames';
import type { TabsProps } from 'antd';

import styles from './Tabs.module.scss';

interface ITabs extends TabsProps {
  hideBottomLine?: boolean;
}

export const TabsComp = ({
  className,
  hideBottomLine = false,
  indicator = { size: 0 },
  ...rest
}: ITabs) => (
  <Tabs
    indicator={indicator}
    className={cn(styles.tabs, { [styles.hideBottomLine]: hideBottomLine }, className)}
    {...rest}
  />
);
