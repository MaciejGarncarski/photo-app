import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
      return { data: mockSession, status: 'authenticated' }; // return type is [] in v3 but changed to {} in v4
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
  test('button should not be disabled when image and description provided', async () => {
    const file = new File(['hello'], 'hello.webp', { type: 'image/webp' });
    const user = userEvent.setup();

    const button = await screen.findByText<HTMLButtonElement>(/complete/i);
    const fileInput = await screen.findByTestId('fileInput');
    const descriptionInput = await screen.findByTestId('descriptionInput');

    await user.upload(fileInput, file);
    await user.type(descriptionInput, 'random descripion');

    await waitFor(() => expect(button).toHaveProperty('disabled', false), { timeout: 500 });
  });
});
