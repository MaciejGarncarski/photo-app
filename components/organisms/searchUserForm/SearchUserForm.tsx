import { IconSearch } from '@tabler/icons';

import { Button } from '@/components/atoms/buttons/button/Button';
import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';

import styles from './searchUserForm.module.scss';

type PropsTypes = {
  inputVal: string;
  setInputVal: (value: string) => void;
};

export const SearchUserForm = ({ inputVal, setInputVal }: PropsTypes) => {
  const resetState = () => {
    setInputVal('');
  };

  return (
    <form className={styles.form}>
      <label htmlFor="search-user-input">
        <IconSearch />
        <VisuallyHiddenText text="Search user" />
      </label>
      <input
        id="search-user-input"
        className={styles.input}
        placeholder="Search"
        size={3}
        value={inputVal}
        onChange={(ev) => setInputVal(ev.target.value)}
      />
      <Button type="reset" onClick={resetState} disabled={inputVal === ''}>
        Reset
      </Button>
    </form>
  );
};
