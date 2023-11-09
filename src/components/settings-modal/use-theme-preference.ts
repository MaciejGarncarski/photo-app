import debounce from 'lodash.debounce';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';

import { useAuth } from '@/src/hooks/use-auth';

import { useUpdatePreferences } from '@/src/components/settings-modal/use-update-preferences';

export const useThemePreference = () => {
  const { isSignedIn } = useAuth();
  const { setTheme, theme } = useTheme();
  const { mutate, isPending } = useUpdatePreferences();

  const debouncedThemeMutation = useMemo(
    () =>
      debounce(
        () => mutate({ theme: theme === 'DARK' ? 'LIGHT' : 'DARK' }, {}),
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
