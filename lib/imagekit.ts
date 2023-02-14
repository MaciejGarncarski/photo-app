import ImageKit from 'imagekit';

import { clientEnv, serverEnv } from '@/utils/env.mjs';

export const imageKit = new ImageKit({
  publicKey: clientEnv.NEXT_PUBLIC_IMG_KIT_PUBLIC,
  privateKey: serverEnv.IMG_KIT_PRIVATE,
  urlEndpoint: clientEnv.NEXT_PUBLIC_IMG_KIT_ENDPOINT,
});
