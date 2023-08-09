import { IconSearch, IconX } from '@tabler/icons-react';
import { ChangeEvent, FormEvent } from 'react';

import { Button } from '@/src/components/buttons/button/button';

import styles from './search-user-form.module.scss';

type PropsTypes = {
  resetState: () => void;
  onSubmit: (submitEv: FormEvent<HTMLFormElement>) => void;
  onChange: (changeEv: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
};

export const SearchUserForm = ({
  onChange,
  onSubmit,
  resetState,
  inputValue,
}: PropsTypes) => {
  return (
    <form
      data-cy="search user form"
      className={styles.form}
      onSubmit={onSubmit}
    >
      <input
        data-cy="search user input"
        className={styles.input}
        placeholder="Search"
        value={inputValue}
        onChange={onChange}
      />
      <Button type="submit" variant="primary" disabled={inputValue === ''}>
        <IconSearch />
        <span className="visually-hidden">Search user</span>
      </Button>
      <Button
        type="reset"
        variant="primary"
        onClick={resetState}
        disabled={inputValue === ''}
      >
        <IconX />
        <span className="visually-hidden">reset</span>
      </Button>
    </form>
  );
};
