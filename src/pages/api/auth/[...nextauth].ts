import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { serverEnv } from '@/src/utils/env';

import { prisma } from '../../../../prisma/prismadb';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: serverEnv.GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          type: 'text',
        },
        password: {
          type: 'password',
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const { email, password } = credentials;

        try {
          const user = await prisma.user.findFirst({
            where: {
              email,
            },
          });

          if (user && user?.password) {
            const isPasswordEqual = await argon2.verify(user.password, password);
            return isPasswordEqual ? user : null;
          }

          const hash = await argon2.hash(password);
          const createdUser = await prisma.user.create({
            data: {
              email,
              password: hash,
            },
          });
          return createdUser;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },

    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id;
        token.user = user;
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
