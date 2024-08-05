import Image from 'next/image'
import { type ReactNode } from 'react'

import ellipse from '@/assets/ellipse.svg'
import { Navbar } from '@/components/navbar/navbar'

import styles from './layout.module.css'

type Props = {
	children: ReactNode
}

export const Layout = ({ children }: Props) => {
	return (
		<div className={styles.layout}>
			<Navbar />
			<div className={styles.container}>{children}</div>
			<Image
				src={ellipse}
				alt="ellipse"
				quality={100}
				width={512}
				height={512}
				className={styles.ellipse}
			/>
			<Image
				src={ellipse}
				alt="ellipse"
				quality={100}
				width={512}
				height={512}
				className={styles.ellipseRight}
			/>
		</div>
	)
}
