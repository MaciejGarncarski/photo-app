import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import { CreatePost } from '@/components/pages/createPost/CreatePost';

jest.mock('next/router', () => require('next-router-mock'));

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: 'admin' },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' };
    }),
  };
});

describe('<CreatePost />', () => {
  const queryClient = new QueryClient();
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreatePost />
      </QueryClientProvider>
    );
  });

  test('button should be disabled when no description provided', async () => {
    const button = await screen.findByText(/complete/i);
    expect(button).toHaveAttribute('disabled', '');
  });
});
