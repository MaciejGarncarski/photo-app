import clsx from 'clsx';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './input.module.scss';

type InputProps = {
  type?: JSX.IntrinsicElements['input']['type'] | 'textarea';
  labelText: string;
  isDirty?: boolean;
  isEmpty?: boolean;
  error?: FieldError;
  optional?: boolean;
  className?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', labelText, isDirty, error, optional, isEmpty, className, ...props }, ref) => {
    const containerClassName = clsx(className, error && styles.containerError, styles.container);
    const labelClassName = clsx(isDirty && styles.labelActive, !isEmpty && styles.labelActive, styles.label);

    return (
      <div className={containerClassName}>
        <label className={labelClassName} htmlFor={labelText}>
          {labelText} {optional && '(optional)'}
        </label>
        <input
          ref={ref}
          type={type}
          id={labelText}
          className={clsx(error && styles.inputError, styles.input)}
          {...props}
        />
        {error && <p className={styles.error}>{error.message}</p>}
      </div>
    );
  },
);
