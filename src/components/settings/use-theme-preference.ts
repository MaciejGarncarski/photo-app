import debounce from 'lodash.debounce';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';

import { useAuth } from '@/src/hooks/use-auth';

import { useUpdatePreferences } from '@/src/components/settings/use-update-preferences';

export const useThemePreference = () => {
  const { sessionUser, isSignedIn } = useAuth();
  const { setTheme, theme } = useTheme();
  const { mutate, isPending } = useUpdatePreferences();

  if (isSignedIn) {
    setTheme(sessionUser?.theme || 'LIGHT');
  }

  const debouncedThemeMutation = useMemo(
    () =>
      debounce(
        () => mutate({ theme: theme === 'DARK' ? 'LIGHT' : 'DARK' }),
        200,
      ),
    [mutate, theme],
  );

  const toggleTheme = () => {
    if (!isSignedIn) {
      setTheme(theme === 'DARK' ? 'LIGHT' : 'DARK');
      return;
    }

    debouncedThemeMutation();
  };

  const isDark = useMemo(() => theme === 'DARK', [theme]);

  return { toggleTheme, isDark, isThemeMutationPending: isPending };
};
