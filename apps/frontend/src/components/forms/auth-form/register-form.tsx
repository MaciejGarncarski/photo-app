import { zodResolver } from '@hookform/resolvers/zod'
import { SignIn } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/buttons/button/button'
import { useRegister } from '@/components/forms/auth-form/use-register'
import { RegisterSignInMessage } from '@/components/forms/register-signin-message/register-signin-message'
import { Input } from '@/components/input/input'
import { type RegisterFormValues, registerSchema } from '@/schemas/auth.schema'

import styles from './auth-form.module.css'

export const RegisterForm = () => {
	const { mutate: mutateRegister, isPending } = useRegister()

	const {
		formState: { errors },
		register,
		handleSubmit,
	} = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		mode: 'all',
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = handleSubmit((data) => mutateRegister(data))

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
				placeholder="Your username"
				labelText="Username"
				type="text"
				variant="secondary"
				error={errors.username?.message}
				{...register('username')}
			/>

			<Input
				placeholder="Type in your password"
				labelText="Password"
				variant="secondary"
				type="password"
				error={errors.password?.message}
				{...register('password')}
			/>

			<Input
				placeholder="Type in again your password"
				labelText="Confirm password"
				variant="secondary"
				type="password"
				error={errors.confirmPassword?.message}
				{...register('confirmPassword')}
			/>

			<div className={styles.button}>
				<Button type="submit" variant="primary" disabled={isPending}>
					Continue
					<SignIn />
				</Button>
			</div>

			<RegisterSignInMessage variant="register" />
		</form>
	)
}
