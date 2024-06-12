"use client";

import { IconContext } from "@phosphor-icons/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

import { getQueryClient } from "@/utils/get-query-client";

type Props = {
  children: ReactNode;
};

export const Providers = ({ children }: Props) => {
  const client = getQueryClient();

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider defaultTheme="LIGHT">
        <JotaiProvider>
          <IconContext.Provider
            value={{
              weight: "bold",
              size: 24,
            }}
          >
            {children}
          </IconContext.Provider>
        </JotaiProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
    </QueryClientProvider>
  );
};
