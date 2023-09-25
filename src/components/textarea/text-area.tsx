import { forwardRef, useId } from 'react';

import styles from './text-area.module.scss';

type Props = {
  placeholder: string;
  label?: string;
  error?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, placeholder, ...otherProps }, ref) => {
    const id = useId();
    return (
      <div className={styles.container}>
        <div className={styles.textAreaContainer}>
          {label ? (
            <label className={styles.label} htmlFor={id}>
              {label}
            </label>
          ) : null}
          <textarea
            id={id}
            ref={ref}
            className={styles.textArea}
            cols={30}
            rows={2}
            placeholder={placeholder}
            {...otherProps}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  },
);
