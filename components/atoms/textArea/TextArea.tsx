import { forwardRef, useId } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './textArea.module.scss';

type PropsTypes = {
  label: string;
  error?: FieldError;
};

export const TextArea = forwardRef<HTMLTextAreaElement, PropsTypes>(({ label, error, ...otherProps }, ref) => {
  const id = useId();
  return (
    <div>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <textarea id={id} ref={ref} className={styles.textArea} cols={30} rows={10} {...otherProps} />
      <p>{error?.message}</p>
    </div>
  );
});
