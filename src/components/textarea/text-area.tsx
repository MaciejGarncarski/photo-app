import clsx from 'clsx';
import { forwardRef, useId } from 'react';

import styles from './text-area.module.scss';

type Props = {
  label: string;
  isEmpty: boolean;
  error?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, isEmpty, ...otherProps }, ref) => {
    const id = useId();
    return (
      <div className={styles.textAreaContainer}>
        <textarea
          id={id}
          ref={ref}
          className={styles.textArea}
          cols={30}
          rows={10}
          {...otherProps}
        />
        <label
          className={clsx(!isEmpty && styles.notEmpty, styles.label)}
          htmlFor={id}
        >
          {label}
        </label>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  },
);