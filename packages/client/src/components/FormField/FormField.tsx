import type { ReactNode } from 'react';

import styles from './FormField.module.scss';

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export const FormField = ({ id, label, required = false, children, className }: FormFieldProps) => (
  <div className={`${styles['input-group']} ${className || ''}`}>
    <label htmlFor={id} className={styles['input-group__label']}>
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
