import type { Metadata, Viewport } from 'next'
// import { Lato } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

import { PreloadResources } from '@/app/preload-resources'
import { Providers } from '@/app/providers'
import { CustomToaster } from '@/components/custom-toaster/custom-toaster'
import { Layout } from '@/components/layout/layout'

import '../styles/globals.css'
import '../styles/variables.global.css'

type Props = {
	children: ReactNode
}

// const font = Lato({
// 	subsets: ['latin', 'latin-ext'],
// 	weight: ['400', '700', '900'],
// })

const description =
	'PhotoApp is social media application created in the modern tech stack. In this app, you can chat with friends, create posts, comment on them and follow other users. It was my first attempt to create a backend in Next.js, so I learned a lot of things while creating this app.'

export const metadata: Metadata = {
	title: 'Photo App',
	description,
	icons: {
		icon: '/icons/favicon.ico',
	},
}

export const viewport: Viewport = {
	themeColor: 'rgb(109, 194, 171)',
}

const DefaultLayout = ({ children }: Props) => {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body>
				<PreloadResources />
				<Providers>
					<ThemeProvider defaultTheme="light" disableTransitionOnChange>
						<CustomToaster />
						<Layout>{children}</Layout>
					</ThemeProvider>
				</Providers>
			</body>
		</html>
	)
}
export default DefaultLayout
