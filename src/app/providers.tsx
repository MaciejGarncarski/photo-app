'use client';

import { IconContext } from '@phosphor-icons/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MotionConfig } from 'framer-motion';
import { Provider } from 'jotai';
import { ThemeProvider } from 'next-themes';
import { ReactNode, useState } from 'react';

type Props = {
  children: ReactNode;
};

export const Providers = ({ children }: Props) => {
  const [client] = useState(new QueryClient());

  return (
    <ThemeProvider>
      <QueryClientProvider client={client}>
        <Provider>
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
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};
