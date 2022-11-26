import type { AppProps, AppType } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import '@/styles/globals.scss';

import { Layout } from '@/components/Layout/Layout';

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};
export default MyApp;
