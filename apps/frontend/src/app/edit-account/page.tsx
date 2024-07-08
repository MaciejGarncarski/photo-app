import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getPageTitle } from '@/utils/get-page-title'
import { isAuthenticated } from '@/utils/is-authenticated'

import { EditAccount } from '@/components/pages/edit-account/edit-account'

export const metadata: Metadata = {
	title: getPageTitle('Edit account'),
}

const EditAccountPage = async () => {
	const isSignedIn = await isAuthenticated()

	if (!isSignedIn) {
		redirect('/access-denied')
	}

	return <EditAccount />
}

export default EditAccountPage
