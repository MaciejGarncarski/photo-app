type Button = {
	variant: 'secondary' | 'primary'
	onClick?: () => void
	disabled?: boolean
	type: 'submit' | 'button' | 'reset'
	text: string
}

export const getButtonList = (
	onCancel: () => void,
	submitDisabled: boolean,
) => {
	const buttonList: Array<Button> = [
		{
			variant: 'secondary',
			onClick: onCancel,
			text: 'Cancel',
			type: 'button',
		},
		{
			disabled: submitDisabled,
			type: 'submit',
			text: 'Upload new post',
			variant: 'primary',
		},
	]

	return buttonList
}
