import { IconSearch } from '@tabler/icons-react';
import { ChangeEvent, FormEvent } from 'react';

import { Button } from '@/src/components/atoms/buttons/button/Button';
import { IconXWrapper } from '@/src/components/atoms/icons/IconXWrapper';
import { VisuallyHidden } from '@/src/components/atoms/visuallyHiddenText/VisuallyHidden';

import styles from './SearchUserForm.module.scss';

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
        size={3}
        value={inputValue}
        onChange={onChange}
      />
      <Button type="submit" variant="primary" disabled={inputValue === ''}>
        <IconSearch />
        <VisuallyHidden>Search user</VisuallyHidden>
      </Button>
      <Button
        type="reset"
        variant="primary"
        onClick={resetState}
        disabled={inputValue === ''}
      >
        <IconXWrapper />
        <VisuallyHidden>Reset input</VisuallyHidden>
      </Button>
    </form>
  );
};
