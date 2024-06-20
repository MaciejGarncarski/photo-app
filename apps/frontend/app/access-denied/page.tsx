import type { Metadata } from 'next'

import { AccessDenied } from '@/components/access-denied/access-denied'

export const metadata: Metadata = {
	title: 'Access Denied',
}

const AccessDeniedPage = async () => {
	return <AccessDenied />
}

export default AccessDeniedPage
