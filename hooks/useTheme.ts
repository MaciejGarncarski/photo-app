import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const themeAtom = atomWithStorage('theme', 'light');

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  const handleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      // document.documentElement.classList.remove('dark');
    }
    if (theme === 'light') {
      setTheme('dark');
      // document.documentElement.classList.add('dark');
    }
  };

  return { theme, handleTheme };
};
