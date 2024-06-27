import { FloppyDisk, Hand, Image, Mouse } from '@phosphor-icons/react'
import { atom, useAtom } from 'jotai'
import Cropper from 'react-easy-crop'

import { useIsTabletOrMobile } from '@/hooks/use-is-tablet-or-mobile'
import { useModal } from '@/hooks/use-modal'

import { AspectRatioButtons } from '@/components/buttons/aspect-ratio-buttons/aspect-ratio-buttons'
import { Button } from '@/components/buttons/button/button'
import { useCropImage } from '@/components/crop-image/use-crop-image'
import { DropZone } from '@/components/drop-zone/drop-zone'
import { Loader } from '@/components/loader/loader'
import { ConfirmationDialog } from '@/components/modals/confirmation-dialog/confirmation-dialog'

import styles from './crop-image.module.scss'

type Props = {
	isAvatarCrop?: boolean
}

export const imageSourcesAtom = atom<Array<string>>([])

export const CropImage = ({ isAvatarCrop }: Props) => {
	const [imageSources, setImageSources] = useAtom(imageSourcesAtom)

	const areImageSourcesEmpty = imageSources.length === 0

	const { openModal, isModalOpen, closeModal } = useModal()
	const { isTabletOrMobile } = useIsTabletOrMobile()

	const {
		aspect,
		setAspect,
		setZoom,
		zoom,
		crop,
		setCrop,
		onCropComplete,
		isCropping,
		saveCrop,
	} = useCropImage()

	if (isCropping) {
		return <Loader size="big" color="accent" />
	}

	if (imageSources.length === 0) {
		return <DropZone />
	}

	const currentImage = imageSources[imageSources.length - 1]

	const handleRemoveImage = () => {
		setImageSources((prev) => prev.filter((val) => val !== currentImage))
		closeModal()
	}

	return (
		<>
			<section className={styles.addPhoto}>
				<div className={styles.cropContainer}>
					<Cropper
						image={currentImage}
						zoom={zoom}
						aspect={aspect}
						crop={crop}
						onZoomChange={setZoom}
						onCropChange={setCrop}
						onCropComplete={onCropComplete}
						classes={{ mediaClassName: styles.cropImage }}
					/>
				</div>
				<p className={styles.info}>
					{isTabletOrMobile ? <Hand /> : <Mouse />}
					<span>
						{isTabletOrMobile ? 'Pinch' : 'Use scroll to'} to zoom in your
						picture
					</span>
				</p>
				{!isAvatarCrop && (
					<AspectRatioButtons aspect={aspect} setAspect={setAspect} />
				)}
				<section className={styles.saveOrAnotherImage}>
					<div className={styles.buttons}>
						<Button type="button" variant="primary" onClick={saveCrop}>
							{isTabletOrMobile ? 'Save crop' : 'Save cropped image'}
							<FloppyDisk />
						</Button>
						<Button
							type="button"
							variant="destructive"
							disabled={areImageSourcesEmpty}
							onClick={openModal}
						>
							Remove
							{isTabletOrMobile ? '' : ' image'}
							{!isTabletOrMobile && <Image />}
						</Button>
					</div>
				</section>
			</section>
			{isModalOpen && (
				<ConfirmationDialog
					isVisible={isModalOpen}
					text="Do you want to remove this image?"
					closeModal={closeModal}
				>
					<Button
						variant="destructive"
						onClick={handleRemoveImage}
						disabled={areImageSourcesEmpty}
					>
						Confirm
					</Button>

					<Button variant="secondary" onClick={closeModal}>
						Cancel
					</Button>
				</ConfirmationDialog>
			)}
		</>
	)
}
