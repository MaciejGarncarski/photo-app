import clsx from 'clsx'
import { type ChangeEvent, Ref } from 'react'

import styles from './input.module.scss'

type Props = {
	labelText: string
	placeholder: string
	type?: 'text' | 'number' | 'tel' | 'email' | 'password'
	variant: 'primary' | 'secondary'
	error?: string
	optional?: boolean
	value?: string
	ref?: Ref<HTMLInputElement>
	onChange?: (changeEv: ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({
	type = 'text',
	labelText,
	error,
	optional,
	placeholder,
	variant,
	ref,
	...props
}: Props) => {
	const containerClassName = clsx(
		error && styles.containerError,
		styles.container,
	)

	const inputClassName = clsx(
		{
			[styles.inputError]: Boolean(error),
		},
		styles[variant],
		styles.input,
	)

	return (
		<div>
			<div className={containerClassName}>
				<label className={styles.label} htmlFor={labelText}>
					{labelText} {optional && '(optional)'}
				</label>
				<input
					ref={ref}
					type={type}
					id={labelText}
					data-testid="input"
					placeholder={placeholder}
					className={inputClassName}
					{...props}
				/>
			</div>
			{error && <p className={styles.error}>{error}</p>}
		</div>
	)
}
