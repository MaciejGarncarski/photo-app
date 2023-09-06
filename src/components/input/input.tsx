import clsx from 'clsx';
import { ChangeEvent, forwardRef } from 'react';

import styles from './input.module.scss';

type Props = {
  labelText: string;
  placeholder: string;
  type?: 'text' | 'number' | 'tel' | 'email' | 'password';
  error?: string;
  optional?: boolean;
  value?: string;
  onChange?: (changeEv: ChangeEvent<HTMLInputElement>) => void;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    { type = 'text', labelText, error, optional, placeholder, ...props },
    ref,
  ) => {
    const containerClassName = clsx(
      error && styles.containerError,
      styles.container,
    );

    const inputClassName = clsx(
      {
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
            placeholder={placeholder}
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
