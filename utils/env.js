import { z } from 'zod';

export const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),
  NODE_ENV: z.string(),
  IMG_KIT_PRIVATE: z.string(),
});

/**
 * @type {{ [k in keyof z.infer<typeof serverSchema>]: z.infer<typeof serverSchema>[k] }}
 */
export const serverEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NODE_ENV: process.env.NODE_ENV,
  IMG_KIT_PRIVATE: process.env.IMG_KIT_PRIVATE,
};

export const clientSchema = z.object({
  NEXT_PUBLIC_API_ROOT: z.string(),
  NEXT_PUBLIC_IMG_KIT_PUBLIC: z.string(),
  NEXT_PUBLIC_IMG_KIT_ENDPOINT: z.string(),
  NEXT_PUBLIC_WS_URL: z.string(),
});

/**
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] }}
 */
export const clientEnv = {
  NEXT_PUBLIC_IMG_KIT_ENDPOINT: process.env.NEXT_PUBLIC_IMG_KIT_ENDPOINT,
  NEXT_PUBLIC_IMG_KIT_PUBLIC: process.env.NEXT_PUBLIC_IMG_KIT_PUBLIC,
  NEXT_PUBLIC_API_ROOT: process.env.NEXT_PUBLIC_API_ROOT,
  NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
};
