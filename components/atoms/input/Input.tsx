import clsx from 'clsx';
import { ChangeEvent, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './input.module.scss';

type PropsTypes = {
  type?: 'text' | 'number' | 'tel' | 'email' | 'password';
  labelText: string;
  error?: FieldError;
  optional?: boolean;
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

export const Input = forwardRef<HTMLInputElement, PropsTypes>(
  ({ type = 'text', labelText, error, optional, onChange, value, ...props }, ref) => {
    const containerClassName = clsx(error && styles.containerError, styles.container);

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
        <input
          ref={ref}
          type={type}
          id={labelText}
          data-testid="input"
          className={inputClassName}
          onChange={onChange}
          value={value}
          {...props}
        />
        <p className={styles.error}>{error && error.message}</p>
      </div>
    );
  },
);
