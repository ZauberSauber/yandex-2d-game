import { Button } from 'antd';
import classNames from 'classnames';
import type { ReactNode } from 'react';

import type { ClassName } from '../types';

import styles from './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
  size?: 'small' | 'middle' | 'large';
  className: ClassName;
}

export const ButtonComponent = (props: ButtonProps) => {
  const { children, size, className, ...restProps } = props;

  return (
    <Button ghost size={size} className={classNames(styles.button, className)} {...restProps}>
      {children}
    </Button>
  );
};
