import clsx from "clsx";
import { Ref, useId } from "react";

import styles from "./text-area.module.scss";

type Props = {
  placeholder: string;
  label?: string;
  error?: string;
  rows: number;
  secondaryBg?: boolean;
  ref?: Ref<HTMLTextAreaElement>;
};

export const TextArea = ({
  label,
  error,
  secondaryBg,
  placeholder,
  rows,
  ref,
  ...otherProps
}: Props) => {
  const id = useId();
  return (
    <div className={styles.container}>
      {label ? (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      ) : null}
      <div className={styles.textAreaContainer}>
        <textarea
          id={id}
          ref={ref}
          className={clsx(
            {
              [styles.secondaryBg]: secondaryBg,
            },
            styles.textArea
          )}
          cols={30}
          rows={rows}
          placeholder={placeholder}
          {...otherProps}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
