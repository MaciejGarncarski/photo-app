import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),
  NEXT_PUBLIC_IMG_KIT_PUBLIC: z.string(),
  NEXT_PUBLIC_IMG_KIT_PRIVATE: z.string(),
  NEXT_PUBLIC_IMG_KIT_ENDPOINT: z.string(),
  EMAIL_SERVER_PASSWORD: z.string(),
  EMAIL_SERVER_USER: z.string(),
  EMAIL_SERVER_HOST: z.string(),
  EMAIL_SERVER_PORT: z.string(),
  EMAIL_FROM: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(parsed.error.format(), null, 4)
  );
  process.exit(1);
}

export const env = parsed.data;
