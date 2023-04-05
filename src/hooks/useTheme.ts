import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useCallback, useEffect } from 'react';

const themeAtom = atomWithStorage('isDark', false);

export const useTheme = () => {
  const [isDark, setIsDark] = useAtom(themeAtom);

  const changeTheme = useCallback(() => {
    setIsDark((isDark) => !isDark);
  }, [setIsDark]);

  useEffect(() => {
    document.documentElement.className = isDark ? 'dark' : '';

    return () => {
      document.documentElement.className = '';
    };
  }, [isDark]);

  return { isDark, changeTheme };
};
