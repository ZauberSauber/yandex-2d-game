import { Input as AntInput } from 'antd';
import cn from 'classnames';
import type { InputProps } from 'antd';

import type { IClassName } from '../../types/className';

import styles from './Input.module.scss';

interface IInputProps extends Omit<InputProps, 'className'> {
  className?: IClassName;
}

export const InputComponent = (props: IInputProps) => {
  const { className, ...restProps } = props;

  return <AntInput {...restProps} className={cn(styles.input, className)} />;
};
