import { SignIn } from '@phosphor-icons/react'

import { ButtonLink } from '@/components/buttons/button-link/button-link'

export const SignInButton = () => {
	return (
		<ButtonLink href="/auth/sign-in">
			<SignIn />
			Sign in
		</ButtonLink>
	)
}
