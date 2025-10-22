import { Tabs } from 'antd';
import cn from 'classnames';
import type { TabsProps } from 'antd';

import styles from './Tabs.module.scss';

export const TabsComp = ({ className, ...rest }: TabsProps) => (
  <Tabs indicator={{ size: 0 }} className={cn(styles.tabs, className)} {...rest} />
);
