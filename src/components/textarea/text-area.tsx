import { forwardRef, useId } from 'react';

import styles from './text-area.module.scss';

type Props = {
  label: string;
  placeholder: string;
  error?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, placeholder, ...otherProps }, ref) => {
    const id = useId();
    return (
      <div className={styles.textAreaContainer}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        <textarea
          id={id}
          ref={ref}
          className={styles.textArea}
          cols={30}
          rows={10}
          placeholder={placeholder}
          {...otherProps}
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  },
);
