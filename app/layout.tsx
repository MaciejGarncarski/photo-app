import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';

import { Providers } from '@/app/providers';
import { Layout } from '@/components/layout/layout';

import '../styles/globals.scss';

type Props = {
  children: ReactNode;
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const description =
  'PhotoApp is social media application created in the modern tech stack. In this app, you can chat with friends, create posts, comment on them and follow other users. It was my first attempt to create a backend in Next.js, so I learned a lot of things while creating this app.';

export const metadata: Metadata = {
  title: 'Photo App',
  description,
  icons: {
    icon: '/icons/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: 'rgb(109, 194, 171)',
};

const DefaultLayout = ({ children }: Props) => {
  return (
    <html suppressHydrationWarning lang="en" className={inter.className}>
      <head />
      <body>
        <Providers>
          <Toaster
            richColors
            position="top-center"
            closeButton
            className={inter.className}
          />
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
};
export default DefaultLayout;
