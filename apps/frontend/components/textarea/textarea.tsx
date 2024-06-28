import clsx from 'clsx'
import { useId, useRef } from 'react'
import { RefCallBack } from 'react-hook-form'

import { useAutosizeTextArea } from '@/components/textarea/use-autosize-textarea'

import styles from './textarea.module.scss'

type Props = {
	placeholder: string
	label?: string
	error?: string
	secondaryBg?: boolean
	ref?: RefCallBack
	maxHeight?: number
	value: string
}

export const TextArea = ({
	label,
	error,
	secondaryBg,
	placeholder,
	value,
	ref,
	maxHeight,
	...otherProps
}: Props) => {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null)

	useAutosizeTextArea(textareaRef, value, maxHeight)

	const id = useId()
	return (
		<div className={styles.container}>
			{label ? (
				<label className={styles.label} htmlFor={id}>
					{label}
				</label>
			) : null}
			<div className={styles.textAreaContainer}>
				<textarea
					id={id}
					className={clsx(
						{
							[styles.secondaryBg]: secondaryBg,
						},
						styles.textArea,
					)}
					rows={1}
					placeholder={placeholder}
					{...otherProps}
					ref={(e) => {
						ref?.(e)
						textareaRef.current = e
					}}
				/>
			</div>
			{error && <p className={styles.error}>{error}</p>}
		</div>
	)
}
