import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getPageTitle } from '@/utils/get-page-title'
import { isAuthenticated } from '@/utils/is-authenticated'

import { CreatePost } from '@/components/pages/create-post/create-post'

export const metadata: Metadata = {
	title: getPageTitle('Create Post'),
}

export const dynamic = 'force-dynamic'

const CreatePostPage = async () => {
	const isSignedIn = await isAuthenticated()

	if (!isSignedIn) {
		redirect('/access-denied')
	}

	return <CreatePost />
}

export default CreatePostPage
