import cn from 'classnames';
import type { ReactNode } from 'react';

import styles from './FormField.module.scss';

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  classNameLabel?: string;
}

export const FormField = ({
  id,
  label,
  required = false,
  children,
  className,
  classNameLabel,
}: FormFieldProps) => (
  <div className={cn(styles['input-group'], className)}>
    <label htmlFor={id} className={cn(styles['input-group__label'], classNameLabel)}>
      {label}
      {required && (
        <span className={styles['input-group__required']} aria-label="обязательное поле">
          *
        </span>
      )}
    </label>
    {children}
  </div>
);
