import { Home } from '@/components/pages/home/home'

export const revalidate = 600

export default async function HomePage() {
	return <Home />
}
