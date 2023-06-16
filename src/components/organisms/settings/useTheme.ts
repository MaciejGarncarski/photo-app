import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useEffect } from 'react';

const themeAtom = atomWithStorage('darkMode', false);

export const useTheme = () => {
  const [isDark, setIsDark] = useAtom(themeAtom);

  useEffect(() => {
    document.documentElement.className = isDark ? 'dark' : '';
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((isThemeDark) => !isThemeDark);
  };

  return {
    isDark,
    toggleTheme,
  };
};
