'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { ReactNode, useState } from 'react';

import { Layout } from '@/src/components/layout/layout';

import '../styles/globals.scss';

type Props = {
  children: ReactNode;
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const DefaultLayout = ({ children }: Props) => {
  const [client] = useState(new QueryClient());

  return (
    <html suppressHydrationWarning lang="en" className={inter.className}>
      <head />
      <body>
        <ThemeProvider>
          <QueryClientProvider client={client}>
            <ReactQueryStreamedHydration>
              <Layout>{children}</Layout>
            </ReactQueryStreamedHydration>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};
export default DefaultLayout;
