import { z } from 'zod';

const editAccountInputSchema = z.object({
  username: z.string().nullish(),
  name: z.string().nullish(),
  bio: z.string().nullish(),
});

export type EditAccountInput = z.infer<typeof editAccountInputSchema>;
