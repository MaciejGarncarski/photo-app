'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import { useModal } from '@/hooks/use-modal'
import { useUser } from '@/hooks/use-user'

import { Loader } from '@/components/loader/loader'
import { Account } from '@/components/pages/account/account'
import { usePost } from '@/components/pages/account/use-post'
import { PostModal } from '@/components/post/post-modal/post-modal'
import { Heading } from '@/components/typography/heading/heading'

import styles from './post-by-id.module.scss'

export const PostById = () => {
	const params = useParams()
	const postId = Number.parseInt(params.postId as string)
	const postModal = useModal(true)
	const { data, isSuccess, isError } = usePost({ postId })
	const { data: authorData, isPending } = useUser({
		userId: data?.authorId || '',
	})

	const postModalClose = () => {
		postModal.closeModal()
	}

	if (isError || Number.isNaN(postId)) {
		return (
			<div className={styles.error}>
				<Heading tag="h2" size="big">
					Post not found.
				</Heading>
				<Link href="/" className={styles.link}>
					Go back to homepage.
				</Link>
			</div>
		)
	}

	if (!isSuccess || !authorData?.username || isPending) {
		return <Loader marginTop color="accent" size="big" />
	}

	return (
		<>
			<Account username={authorData.username} />

			{data && (
				<PostModal
					isVisible={postModal.isModalOpen}
					postId={postId}
					closeModal={postModalClose}
					isPostPage
				/>
			)}
		</>
	)
}
