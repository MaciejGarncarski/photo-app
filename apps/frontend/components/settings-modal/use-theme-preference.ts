import { useTheme } from 'next-themes'
import { useMemo } from 'react'

export const useThemePreference = () => {
	const { setTheme, theme } = useTheme()

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	const isDark = useMemo(() => theme === 'dark', [theme])

	return { toggleTheme, isDark }
}
