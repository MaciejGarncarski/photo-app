import { forwardRef, useId } from 'react';

import styles from './TextArea.module.scss';

type PropsTypes = {
  label: string;
  error?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, PropsTypes>(({ label, error, ...otherProps }, ref) => {
  const id = useId();
  return (
    <div>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <textarea id={id} ref={ref} className={styles.textArea} cols={30} rows={10} {...otherProps} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
});
