import { useTheme } from "next-themes";
import { useMemo } from "react";

export const useThemePreference = () => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "DARK" ? "LIGHT" : "DARK");
  };

  const isDark = useMemo(() => theme === "DARK", [theme]);

  return { toggleTheme, isDark };
};
