import { IconSearch } from '@tabler/icons';
import { MouseEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { IconXWrapper } from '@/components/atoms/icons/IconXWrapper';
import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';
import { useClickOutside } from '@/components/molecules/layoutSearch/useClickOutside';

import styles from './layoutSearch.module.scss';

type FormValues = {
  input: string;
};

export const LayoutSearch = () => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    reset,
    register,
    formState: { isDirty, defaultValues },
  } = useForm<FormValues>({
    defaultValues: {
      input: '',
    },
  });

  const isEnabled = isFocus || isDirty;

  const handleReset = () => {
    reset({
      input: defaultValues?.input,
    });
    setIsFocus(false);
  };

  const handleClick = (ev: MouseEvent) => {
    ev.stopPropagation();
    setIsFocus(true);
  };

  useClickOutside({ ref: formRef, callback: () => setIsFocus(false) });

  return (
    <form ref={formRef} className={styles.form}>
      <label className={styles.label}>
        {!isEnabled && (
          <div className={styles.searchIcon}>
            <IconSearch />
          </div>
        )}
        <VisuallyHiddenText text="Search" />
        <input className={styles.input} type="text" placeholder="Search" onClick={handleClick} {...register('input')} />
      </label>
      {isEnabled && (
        <button type="reset" onClick={handleReset} className={styles.resetIcon}>
          <VisuallyHiddenText text="Reset" />
          <IconXWrapper />
        </button>
      )}
    </form>
  );
};
