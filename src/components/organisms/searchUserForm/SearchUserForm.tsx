import { IconSearch } from '@tabler/icons-react';
import { FormEvent } from 'react';

import { Button } from '@/src/components/atoms/buttons/button/Button';
import { IconXWrapper } from '@/src/components/atoms/icons/IconXWrapper';
import { VisuallyHidden } from '@/src/components/atoms/visuallyHiddenText/VisuallyHidden';

import styles from './searchUserForm.module.scss';

type PropsTypes = {
  inputVal: string;
  setInputVal: (value: string) => void;
  setSearchedUser: (value: string) => void;
  setIsEnabled: (val: boolean) => void;
};

export const SearchUserForm = ({ inputVal, setInputVal, setIsEnabled, setSearchedUser }: PropsTypes) => {
  const resetState = () => {
    setSearchedUser('');
    setInputVal('');
  };

  const onSubmit = (submitEv: FormEvent<HTMLFormElement>) => {
    submitEv.preventDefault();
    setSearchedUser(inputVal);
    setIsEnabled(true);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        id="search-user-input"
        className={styles.input}
        placeholder="Search"
        size={3}
        value={inputVal}
        onChange={(ev) => setInputVal(ev.target.value)}
      />
      <Button type="submit" variant="primary" disabled={inputVal === ''}>
        <IconSearch />
        <VisuallyHidden>Search user</VisuallyHidden>
      </Button>
      <Button type="reset" variant="primary" onClick={resetState} disabled={inputVal === ''}>
        <IconXWrapper />
        <VisuallyHidden>Reset input</VisuallyHidden>
      </Button>
    </form>
  );
};
