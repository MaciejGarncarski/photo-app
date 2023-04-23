import { io } from 'socket.io-client';

import { clientEnv } from '@/src/utils/env';

export const socket = io(clientEnv.NEXT_PUBLIC_API_ROOT, { transports: ['websocket', 'polling', 'flashsocket'] });
