import { useTheme } from 'next-themes'
import { useMemo } from 'react'

export const useThemePreference = () => {
	const { setTheme, theme } = useTheme()

	const toggleTheme = () => {
		const css = document.createElement('style')
		css.type = 'text/css'
		css.appendChild(
			document.createTextNode(
				`* {
			   -webkit-transition: none !important;
			   -moz-transition: none !important;
			   -o-transition: none !important;
			   -ms-transition: none !important;
			   transition: none !important;
			}`,
			),
		)
		document.head.appendChild(css)

		setTheme(theme === 'dark' ? 'light' : 'dark')

		window.getComputedStyle(css).opacity
		document.head.removeChild(css)
	}

	const isDark = useMemo(() => theme === 'dark', [theme])

	return { toggleTheme, isDark }
}
