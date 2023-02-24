import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const themeAtom = atomWithStorage<string>('theme', 'light');

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  const handleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      document.documentElement.classList.add('dark');
      return;
    }

    setTheme('dark');
    document.documentElement.classList.remove('dark');
  };

  return { theme, handleTheme };
};
