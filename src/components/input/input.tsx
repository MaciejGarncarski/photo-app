import clsx from 'clsx';
import { forwardRef } from 'react';

import styles from './input.module.scss';

type Props = {
  type?: 'text' | 'number' | 'tel' | 'email' | 'password';
  labelText: string;
  error?: string;
  optional?: boolean;
  isEmpty: boolean;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ type = 'text', labelText, error, optional, isEmpty, ...props }, ref) => {
    const containerClassName = clsx(
      error && styles.containerError,
      styles.container,
    );

    const inputClassName = clsx(
      {
        [styles.notEmpty]: !isEmpty,
        [styles.inputError]: Boolean(error),
      },
      styles.input,
    );

    return (
      <div>
        <div className={containerClassName}>
          <input
            ref={ref}
            type={type}
            id={labelText}
            data-testid="input"
            className={inputClassName}
            {...props}
          />
          <label className={styles.label} htmlFor={labelText}>
            {labelText} {optional && '(optional)'}
          </label>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  },
);
