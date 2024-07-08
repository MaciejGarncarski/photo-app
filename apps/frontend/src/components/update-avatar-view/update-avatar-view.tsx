'use client'

import Image from 'next/image'

import { Button } from '@/components/buttons/button/button'
import { CropImage } from '@/components/crop-image/crop-image'
import { Loader } from '@/components/loader/loader'
import { useFinalImages } from '@/components/pages/create-post/use-final-images'
import { useUploadAvatar } from '@/components/update-avatar-view/use-upload-avatar'

import styles from './update-avatar-view.module.css'

type Props = {
	closeModal: () => void
}

export const UpdateAvatarView = ({ closeModal }: Props) => {
	const { onSaveImage, isPending, isFinalImageEmpty } = useUploadAvatar({
		closeModal,
	})
	const { previewImages } = useFinalImages()

	if (isPending) {
		return <Loader color="accent" size="big" />
	}

	const previewImage = previewImages[0]

	const isNewAvatarReady = previewImage?.src

	return (
		<div className={styles.updateAvatar}>
			{!isNewAvatarReady && <CropImage isAvatarCrop />}
			{isNewAvatarReady && (
				<>
					<div className={styles.preview}>
						<Image
							alt="avatar preview"
							src={previewImage?.src}
							width={250}
							height={250}
							className={styles.previewImg}
						/>
					</div>
					<div className={styles.buttons}>
						<Button
							type="button"
							variant="primary"
							disabled={isPending || isFinalImageEmpty}
							onClick={onSaveImage}
						>
							Save new image
						</Button>
					</div>
				</>
			)}
		</div>
	)
}
