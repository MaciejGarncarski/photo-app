import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';

const renderWithClient = (ui: ReactNode) => {
  const queryClient = new QueryClient();
  const { rerender, ...result } = render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(<QueryClientProvider client={queryClient}>{rerenderUi}</QueryClientProvider>),
  };
};

export { renderWithClient as render };
