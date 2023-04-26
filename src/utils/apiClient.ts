import axios from 'axios';

import { clientEnv } from '@/src/utils/env';

export const apiClient = axios.create({ baseURL: `${clientEnv.NEXT_PUBLIC_API_ROOT}/api/`, withCredentials: true });
