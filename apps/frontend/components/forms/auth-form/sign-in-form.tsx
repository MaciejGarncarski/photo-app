import { zodResolver } from '@hookform/resolvers/zod'
import { SignIn } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/buttons/button/button'
import { useSignIn } from '@/components/forms/auth-form/use-sign-in'
import { RegisterSignInMessage } from '@/components/forms/register-signin-message/register-signin-message'
import { Input } from '@/components/input/input'
import { type SignInFormValues, signInSchema } from '@/schemas/auth.schema'

import styles from './auth-form.module.scss'

export const SignInForm = () => {
	const signInCredentials = useSignIn()

	const {
		formState: { errors },
		register,
		handleSubmit,
	} = useForm<SignInFormValues>({
		resolver: zodResolver(signInSchema),
		mode: 'all',
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = handleSubmit((data) => signInCredentials.mutate(data))

	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<Input
				placeholder="email@example.com"
				labelText="Email"
				type="email"
				variant="secondary"
				error={errors.email?.message}
				{...register('email')}
			/>

			<Input
				placeholder="Type in your password"
				labelText="Password"
				variant="secondary"
				type="password"
				error={errors.password?.message}
				{...register('password')}
			/>

			<div className={styles.button}>
				<Button type="submit" variant="primary">
					Continue
					<SignIn />
				</Button>
			</div>

			<RegisterSignInMessage variant="sign-in" />
		</form>
	)
}
