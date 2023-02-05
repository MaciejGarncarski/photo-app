import { screen } from '@testing-library/react';

import { render } from '@/utils/tests/utils';

import { Avatar } from '@/components/atoms/avatar/Avatar';

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { name: 'Maciej Garncarski' },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' };
    }),
  };
});

describe('Avatar', () => {
  it('Should render avatar with no image.', async () => {
    render(<Avatar />);
    const avatar = await screen.findByTestId('empty avatar');
    expect(avatar).toBeInTheDocument();
  });
});
