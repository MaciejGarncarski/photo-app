'use client';

import { IconContext } from '@phosphor-icons/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MotionConfig } from 'framer-motion';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider } from 'next-themes';
import { ReactNode, useState } from 'react';

type Props = {
  children: ReactNode;
};

export const Providers = ({ children }: Props) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1800000,
          gcTime: 2500000,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider defaultTheme="LIGHT">
        <JotaiProvider>
          <MotionConfig reducedMotion="user">
            <IconContext.Provider
              value={{
                weight: 'bold',
                size: 24,
              }}
            >
              {children}
            </IconContext.Provider>
          </MotionConfig>
        </JotaiProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
    </QueryClientProvider>
  );
};
