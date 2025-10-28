import { Button } from 'antd';
import cn from 'classnames';
import type { ButtonProps } from 'antd';
import type { ReactNode } from 'react';

import type { IClassName } from '../../types/className';

import styles from './Button.module.scss';

interface IButtonProps extends Omit<ButtonProps, 'className'> {
  children: ReactNode;
  className?: IClassName;
}

export const ButtonComponent = (props: IButtonProps) => {
  const { children, className, ...restProps } = props;

  return (
    <Button ghost {...restProps} className={cn(styles.button, className)}>
      {children}
    </Button>
  );
};
