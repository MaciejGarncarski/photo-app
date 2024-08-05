import type { Metadata } from 'next'

import { getPageTitle } from '@/utils/get-page-title'

import { CreatePost } from '@/components/pages/create-post/create-post'

export const metadata: Metadata = {
	title: getPageTitle('Create Post'),
}

const CreatePostPage = async () => {
	return <CreatePost />
}

export default CreatePostPage
