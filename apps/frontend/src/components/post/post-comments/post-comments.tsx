import { CaretDown } from '@phosphor-icons/react'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'
import { useState } from 'react'

import { useInfiniteScroll } from '@/hooks/use-infinite-scroll'
import { useOnEscape } from '@/hooks/use-on-escape'

import { Comment } from '@/components/comment/comment'
import { DropdownContent } from '@/components/dropdown/dropdown-content/dropdown-content'
import { Loader } from '@/components/loader/loader'
import { useInfiniteComments } from '@/components/post/post-comments/use-infinite-comments'
import { radioItems, useSort } from '@/components/post/post-comments/use-sort'

import styles from './post-comments.module.css'

type Props = {
	postId: number
	closeModal: () => void
}

export const PostComments = ({ postId, closeModal }: Props) => {
	const { data, hasNextPage, fetchNextPage, isPending } = useInfiniteComments({
		postId: postId,
	})

	const [isOpen, setIsOpen] = useState(false)
	useOnEscape({ callback: closeModal, disabled: isOpen })

	const { sortOption, changeSelectedSort, sortedData } = useSort({
		commentsData: data,
	})

	const { ref } = useInfiniteScroll({
		hasNextPage: Boolean(hasNextPage),
		fetchNextPage,
		enabled: true,
	})

	if (!sortedData || !data) {
		return null
	}

	const commentsCount = data.pages[0].commentsCount

	return (
		<>
			{commentsCount === 0 ? (
				<p className={styles.noComments}>No comments added yet.</p>
			) : (
				<>
					<Dropdown.Root open={isOpen} onOpenChange={setIsOpen}>
						<Dropdown.Trigger asChild>
							<button type="button" className={styles.sort}>
								{
									radioItems.find((sortItem) => sortItem.value === sortOption)
										?.text
								}
								<span>
									<CaretDown size={20} />
								</span>
							</button>
						</Dropdown.Trigger>
						<Dropdown.Portal>
							<DropdownContent className={styles.dropdownContent}>
								<Dropdown.RadioGroup
									value={sortOption}
									onValueChange={changeSelectedSort}
									className={styles.radioGroup}
								>
									{radioItems.map(({ text, value, icon: Icon }) => {
										return (
											<Dropdown.RadioItem
												key={value}
												value={value}
												className={clsx(styles.radioItem, {
													[styles.radioItemChecked]: value === sortOption,
												})}
											>
												<Icon
													weight="fill"
													size={20}
													className={styles.dropdownItemIcon}
												/>
												{text}
											</Dropdown.RadioItem>
										)
									})}
								</Dropdown.RadioGroup>
							</DropdownContent>
						</Dropdown.Portal>
					</Dropdown.Root>
					<div className={styles.commentsList}>
						{sortedData.map((comment) => {
							return <Comment key={comment.commentId} commentData={comment} />
						})}
						{hasNextPage && !isPending && (
							<span ref={ref}>
								<Loader color="accent" size="small" />
							</span>
						)}
					</div>
				</>
			)}
		</>
	)
}
