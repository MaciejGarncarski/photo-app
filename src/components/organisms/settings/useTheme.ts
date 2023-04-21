import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useCallback, useEffect, useMemo } from 'react';

const themeAtom = atomWithStorage('isDark', false);

export const useTheme = () => {
  const [isDark, setIsDark] = useAtom(themeAtom);

  const changeTheme = useCallback(() => {
    setIsDark((isDark) => !isDark);
  }, [setIsDark]);

  useEffect(() => {
    document.documentElement.className = isDark ? 'dark' : '';
  }, [isDark]);

  return useMemo(() => {
    return {
      isDark,
      changeTheme,
    };
  }, [changeTheme, isDark]);
};
