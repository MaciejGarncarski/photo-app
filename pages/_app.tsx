import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps, AppType } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';

import '/styles/globals.scss';

import { Layout } from '@/components/Layout/Layout';

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  const [client] = useState(() => new QueryClient());
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </SessionProvider>
  );
};
export default MyApp;
