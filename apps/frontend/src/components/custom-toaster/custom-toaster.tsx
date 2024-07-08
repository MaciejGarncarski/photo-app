'use client'

import { Toaster } from 'sonner'

import { useIsTabletOrMobile } from '@/hooks/use-is-tablet-or-mobile'

export const CustomToaster = () => {
	const { isTabletOrMobile } = useIsTabletOrMobile()
	return (
		<Toaster
			richColors
			position={isTabletOrMobile ? 'top-center' : 'top-right'}
		/>
	)
}
