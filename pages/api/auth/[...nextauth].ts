import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { prisma } from '@/lib/prismadb';
import { serverEnv } from '@/utils/env.mjs';

const saltRounds = 10;

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
          const isUserCreated = await prisma.user.findFirst({
            where: {
              email,
            },
          });

          if (!isUserCreated) {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
              if (err) {
                return null;
              }

              const createdUser = await prisma.user.create({
                data: {
                  email,
                  password: hash,
                },
                select: {
                  id: true,
                  role: true,
                  created_at: true,
                },
              });

              return createdUser;
            });
          }

          const user = await prisma.user.findFirst({
            where: {
              email,
            },
          });

          if (user?.password) {
            const isPasswordEqual = await bcrypt.compare(password, user.password);
            if (isPasswordEqual) {
              return user;
            }
          }
        } catch (error) {
          return null;
        }

        return null;
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
