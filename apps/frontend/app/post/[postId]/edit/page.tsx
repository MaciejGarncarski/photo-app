import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/utils/is-authenticated'

import { EditPost } from '@/components/pages/edit-post/edit-post'

const EditPostPage = async () => {
	const isSignedIn = await isAuthenticated()

	if (!isSignedIn) {
		redirect('/access-denied')
	}

	return <EditPost />
}

export default EditPostPage
