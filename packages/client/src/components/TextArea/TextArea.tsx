import { Input } from 'antd';
import cn from 'classnames';
import type { IClassName } from '@src/types';
import type { TextAreaProps } from 'antd/es/input';

import style from './TextArea.module.scss';

type TextAreaComponentProps = TextAreaProps & {
  className?: IClassName;
};

const { TextArea } = Input;

export const TextAreaComponent = (props: TextAreaComponentProps) => {
  const { className, onChange, ...restProps } = props;

  return (
    <TextArea {...restProps} className={cn(style['text-area'], className)} onChange={onChange} />
  );
};
