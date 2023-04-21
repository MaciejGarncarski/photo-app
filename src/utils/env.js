import { z } from 'zod';

export const clientSchema = z.object({
  NEXT_PUBLIC_WS_URL: z.string(),
  NEXT_PUBLIC_API_ROOT: z.string(),
});

/**
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] }}
 */
export const clientEnv = {
  NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
  NEXT_PUBLIC_API_ROOT: process.env.NEXT_PUBLIC_API_ROOT,
};
