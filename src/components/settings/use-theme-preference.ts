import debounce from 'lodash.debounce';
import { useTheme } from 'next-themes';
import { useEffect, useMemo } from 'react';

import { useAuth } from '@/src/hooks/use-auth';

import { useUpdatePreferences } from '@/src/components/settings/use-update-preferences';

export const useThemePreference = () => {
  const { sessionUser, isSignedIn } = useAuth();
  const { setTheme, theme } = useTheme();
  const { mutate, isPending } = useUpdatePreferences();

  useEffect(() => {
    if (sessionUser?.theme) {
      setTheme(sessionUser.theme);
    }
  }, [sessionUser?.theme, setTheme]);

  const debouncedThemeMutation = useMemo(
    () =>
      debounce(
        () => mutate({ theme: theme === 'DARK' ? 'LIGHT' : 'DARK' }),
        200,
      ),
    [mutate, theme],
  );

  const toggleTheme = () => {
    if (isSignedIn) {
      return debouncedThemeMutation();
    }

    setTheme(theme === 'DARK' ? 'LIGHT' : 'DARK');
  };

  const isDark = useMemo(() => theme === 'DARK', [theme]);

  return { toggleTheme, isDark, isThemeMutationPending: isPending };
};
