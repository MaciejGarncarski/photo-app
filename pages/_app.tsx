import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { AppProps, AppType } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';

import { seoConfig } from '@/lib/next-seo.config';

import '/styles/globals.scss';

import { Layout } from '@/components/Layout/Layout';
const queryClient = new QueryClient();

dayjs.extend(relativeTime);

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Layout>
          <DefaultSeo {...seoConfig} />
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </SessionProvider>
  );
};
export default MyApp;
