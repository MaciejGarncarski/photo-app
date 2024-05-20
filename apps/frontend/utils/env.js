import { z } from "zod";

export const clientSchema = z.object({
  NEXT_PUBLIC_API_ROOT: z.string().url(),
});

/**
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] }}
 */
export const clientEnv = {
  NEXT_PUBLIC_API_ROOT: process.env.NEXT_PUBLIC_API_ROOT,
};
