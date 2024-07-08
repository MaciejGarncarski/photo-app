import { preconnect, prefetchDNS } from 'react-dom'

import { clientEnv } from '@/utils/env'

export function PreloadResources() {
	prefetchDNS(clientEnv.NEXT_PUBLIC_API_ROOT)
	preconnect(clientEnv.NEXT_PUBLIC_API_ROOT)

	return null
}
