import { useUser } from '@/hooks/use-user'

import { PostButtons } from '@/components/post/post-buttons/post-buttons'
import { usePostFooter } from '@/components/post/post-footer/use-post-footer'

import styles from './post-footer.module.css'

type Props = {
	postId: number
	authorId: string
	description: string
	isLiked: boolean
	likesCount: number
	parentModalOpen?: boolean
}

export const PostFooter = ({
	postId,
	parentModalOpen,
	isLiked,
	likesCount,
	authorId,
	description,
}: Props) => {
	const { data } = useUser({ userId: authorId })

	const { isDescriptionLong, shortDescription, showMore, toggleShowMore } =
		usePostFooter({ description: description })

	return (
		<footer className={styles.footer}>
			<PostButtons
				postId={postId}
				parentModalOpen={parentModalOpen}
				isLiked={isLiked}
				likesCount={likesCount}
			/>
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
