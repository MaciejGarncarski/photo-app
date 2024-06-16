import type { Metadata } from 'next'

import { getPageTitle } from '@/utils/get-page-title'

import { EditAccount } from '@/components/pages/edit-account/edit-account'

export const metadata: Metadata = {
	title: getPageTitle('Edit account'),
}

const EditAccountPage = () => {
	return <EditAccount />
}

export default EditAccountPage
