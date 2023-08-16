import { z } from 'zod';

export const clientSchema = z.object({
  NEXT_PUBLIC_API_ROOT: z.string().url(),
});
export const serverSchema = z.object({
  API_URL: z.string().url(),
});

/**
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] }}
 */
export const clientEnv = {
  NEXT_PUBLIC_API_ROOT: process.env.NEXT_PUBLIC_API_ROOT,
};

/**
 * @type {{ [k in keyof z.infer<typeof serverSchema>]: z.infer<typeof serverSchema>[k] }}
 */
export const serverEnv = {
  API_URL: process.env.API_URL,
};
