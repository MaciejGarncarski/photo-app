import clsx from 'clsx';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './input.module.scss';

type InputProps = {
  type?: JSX.IntrinsicElements['input']['type'];
  labelText: string;
  isDirty?: boolean;
  error?: FieldError;
  optional?: boolean;
  className?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', labelText, isDirty, error, optional, className, ...props }, ref) => {
    return (
      <div
        className={clsx(className && className, error && styles.containerError, styles.container)}
      >
        <input className={styles.input} ref={ref} type={type} {...props} id={labelText} />
        <label className={clsx(isDirty && styles.labelActive, styles.label)} htmlFor={labelText}>
          {labelText} {optional && '(optional)'}
        </label>
      </div>
    );
  }
);
