import { io } from 'socket.io-client';

import { clientEnv } from '@/utils/env';

export const socket = io(clientEnv.NEXT_PUBLIC_WS_URL, { transports: ['websocket', 'polling', 'flashsocket'] });
