import { MouseEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import styles from './layoutSearch.module.scss';

import { ResetIcon } from '@/components/atoms/icons/ResetIcon/ResetIcon';
import { SearchIcon } from '@/components/atoms/icons/SearchIcon/SearchIcon';
import { useClickOutside } from '@/components/molecules/layoutSearch/useClickOutside';

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
            <SearchIcon />
          </div>
        )}
        <span className='visually-hidden'>Search</span>
        <input
          className={styles.input}
          type='text'
          placeholder='Search'
          onClick={handleClick}
          {...register('input')}
        />
      </label>
      {isEnabled && (
        <button type='reset' onClick={handleReset} className={styles.resetIcon}>
          <span className='visually-hidden'>reset input</span>
          <ResetIcon />
        </button>
      )}
    </form>
  );
};
