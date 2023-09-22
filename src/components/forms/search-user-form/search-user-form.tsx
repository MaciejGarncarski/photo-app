import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { ChangeEvent, FormEvent } from 'react';

import { Button } from '@/src/components/buttons/button/button';
import { Input } from '@/src/components/input/input';

import styles from './search-user-form.module.scss';

type Props = {
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
}: Props) => {
  return (
    <form
      data-cy="search user form"
      className={styles.form}
      onSubmit={onSubmit}
    >
      <Input
        labelText="Search user"
        placeholder="Username"
        type="text"
        variant="primary"
        value={inputValue}
        onChange={onChange}
      />
      <Button type="submit" variant="primary" disabled={inputValue === ''}>
        <MagnifyingGlass />
        <span className="visually-hidden">Search user</span>
      </Button>
      <Button
        type="reset"
        variant="destructive"
        onClick={resetState}
        disabled={inputValue === ''}
      >
        <X />
        <span className="visually-hidden">reset</span>
      </Button>
    </form>
  );
};
