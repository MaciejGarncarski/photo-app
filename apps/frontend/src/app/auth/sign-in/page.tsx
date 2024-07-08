import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getPageTitle } from '@/utils/get-page-title'
import { isAuthenticated } from '@/utils/is-authenticated'

import { RegisterSignIn } from '@/components/pages/register-sign-in/register-sign-in'

export const metadata: Metadata = {
	title: getPageTitle('Sign in'),
}

const SignInPage = async () => {
	const isSignedIn = await isAuthenticated()

	if (isSignedIn) {
		redirect('/')
	}

	return <RegisterSignIn variant="sign-in" />
}

export default SignInPage
