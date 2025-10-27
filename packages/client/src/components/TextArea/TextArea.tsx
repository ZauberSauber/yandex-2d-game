import { Input } from 'antd';
import cn from 'classnames';
import type { IClassName } from '@src/types';

import style from './TextArea.module.scss';

type TextAreaComponentProps = {
  value: string;
  className?: IClassName;
};

const { TextArea } = Input;

export const TextAreaComponent = ({ value, className }: TextAreaComponentProps) => (
  <TextArea className={cn(style['text-area'], className)} rows={4} value={value} />
);
