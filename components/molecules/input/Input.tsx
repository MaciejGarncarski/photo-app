import clsx from 'clsx';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './input.module.scss';

type InputProps = {
  type?: JSX.IntrinsicElements['input']['type'] | 'textarea';
  labelText: string;
  error?: FieldError;
  optional?: boolean;
  className?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', labelText, error, optional, className, ...props }, ref) => {
    const containerClassName = clsx(className, error && styles.containerError, styles.container);

    const inputClassName = clsx(
      {
        [styles.inputError]: Boolean(error),
      },
      styles.input,
    );

    return (
      <div className={containerClassName}>
        <label className={styles.label} htmlFor={labelText}>
          {labelText} {optional && '(optional)'}
        </label>
        <input ref={ref} type={type} id={labelText} data-testid="input" className={inputClassName} {...props} />
        {error && <p className={styles.error}>{error.message}</p>}
      </div>
    );
  },
);
