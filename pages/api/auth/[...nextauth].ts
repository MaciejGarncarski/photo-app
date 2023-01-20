import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';

import { prisma } from '@/lib/prismadb';
import { serverEnv } from '@/utils/env.mjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: serverEnv.GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      server: {
        host: serverEnv.EMAIL_SERVER_HOST,
        port: serverEnv.EMAIL_SERVER_PORT,
        auth: {
          user: serverEnv.EMAIL_SERVER_USER,
          pass: serverEnv.EMAIL_SERVER_PASSWORD,
        },
      },
      from: serverEnv.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user = user;
      }
      return session;
    },

    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: serverEnv.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
