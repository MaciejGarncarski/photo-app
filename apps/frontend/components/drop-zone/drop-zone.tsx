import { File, Folder, FolderDashed, X } from '@phosphor-icons/react'
import clsx from 'clsx'
import { useState } from 'react'

import { useIsTabletOrMobile } from '@/hooks/use-is-tablet-or-mobile'

import { Button } from '@/components/buttons/button/button'
import { CropError } from '@/components/crop-error/crop-error'
import { useDropZone } from '@/components/drop-zone/use-drop-zone'
import { Loader } from '@/components/loader/loader'
import type { DropZoneErrors } from '@/components/pages/create-post/create-post-schema'

import styles from './drop-zone.module.scss'

type Props = {
	isAvatarCrop?: boolean
}

export const DropZone = ({ isAvatarCrop }: Props) => {
	const [error, setError] = useState<DropZoneErrors>(null)
	const { isTabletOrMobile } = useIsTabletOrMobile()

	const {
		active,
		onDrop,
		inactive,
		inputRef,
		isActive,
		onChange,
		isUploadingImage,
	} = useDropZone({
		setError,
	})

	const openFileInput = () => {
		if (inputRef.current) {
			inputRef.current.click()
		}
	}

	if (isUploadingImage) {
		return <Loader color="accent" size="small" />
	}

	return (
		<div
			className={clsx(
				isActive && styles.dropZoneActive,
				error && styles.dropZoneError,
				styles.dropZone,
			)}
			onDragOver={active}
			onDragEnter={active}
			onDrop={onDrop}
			onDragLeave={inactive}
			data-testid="dropZoneContainer"
		>
			<span className="visually-hidden">
				<input
					type="file"
					accept="image/*"
					className={styles.input}
					multiple={!isAvatarCrop}
					ref={inputRef}
					name="fileInput"
					onChange={onChange}
					tabIndex={-1}
				/>
			</span>

			<div className={styles.dropZoneState}>
				{isActive && (
					<>
						<FolderDashed size={40} className={styles.dropIcon} />
						<p className={styles.text}>Drop here</p>
					</>
				)}

				{!error && !isActive && (
					<>
						<Folder size={40} className={styles.dropIcon} />
						<p className={styles.text}>
							{isTabletOrMobile ? 'Add image here' : 'Drag photo here'}
						</p>
					</>
				)}
				{error && !isActive && (
					<>
						<X className={styles.dropIconError} />
						<CropError errorType={error} />
					</>
				)}
			</div>
			<Button type="button" variant="primary" onClick={openFileInput}>
				<File />
				Select file from device
			</Button>
		</div>
	)
}
