import { CreatePost } from '@/components/pages/createPost/CreatePost';

import { render, screen } from '@/tests';

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
  beforeEach(() => {
    render(<CreatePost />);
  });

  it('CreatePost component should render', async () => {
    const container = await screen.findByTestId(/createPost-container/i);
    expect(container).toBeInTheDocument();
  });

  it('button should be disabled when no description provided', async () => {
    const button = await screen.findByText(/complete/i);
    expect(button).toHaveAttribute('disabled', '');
    expect(button).toMatchSnapshot();
  });
});
