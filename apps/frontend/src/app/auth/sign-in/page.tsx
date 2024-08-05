import type { Metadata } from 'next'

import { getPageTitle } from '@/utils/get-page-title'

import { RegisterSignIn } from '@/components/pages/register-sign-in/register-sign-in'

export const metadata: Metadata = {
	title: getPageTitle('Sign in'),
}

const SignInPage = async () => {
	return <RegisterSignIn variant="sign-in" />
}

export default SignInPage
