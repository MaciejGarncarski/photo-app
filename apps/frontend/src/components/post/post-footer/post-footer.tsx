import { useUser } from '@/hooks/use-user'

import { usePost } from '@/components/pages/account/use-post'
import { PostButtons } from '@/components/post/post-buttons/post-buttons'
import { usePostFooter } from '@/components/post/post-footer/use-post-footer'

import styles from './post-footer.module.css'

type Props = {
	postId: number
	parentModalOpen?: boolean
}

export const PostFooter = ({ postId, parentModalOpen }: Props) => {
	const { data: post, isPending } = usePost({ postId })

	const { data } = useUser({ userId: post?.authorId || '' })

	const { isDescriptionLong, shortDescription, showMore, toggleShowMore } =
		usePostFooter({ description: post?.description || '' })

	if (isPending || !post) {
		return null
	}

	const { description } = post

	return (
		<footer className={styles.footer}>
			<PostButtons postId={postId} parentModalOpen={parentModalOpen} />
			<div className={styles.descriptionContainer}>
				<p className={styles.author}>{data?.username}</p>
				{isDescriptionLong ? (
					<>
						<p className={styles.description}>
							{showMore ? description : shortDescription}
						</p>
						&nbsp;
						<button
							className={styles.showMore}
							type="button"
							onClick={toggleShowMore}
						>
							{showMore ? 'less' : 'more'}
						</button>
					</>
				) : (
					<p className={styles.description}>{description}</p>
				)}
			</div>
		</footer>
	)
}
