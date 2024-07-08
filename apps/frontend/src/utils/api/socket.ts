import { io } from 'socket.io-client'

import { clientEnv } from '@/utils/env'

export const socket = io(clientEnv.NEXT_PUBLIC_API_ROOT, {
	transports: ['websocket'],
})
