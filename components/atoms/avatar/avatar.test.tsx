import { screen, waitFor } from '@testing-library/react';

import { mockedUser } from '@/utils/tests/mockedData';
import { render } from '@/utils/tests/utils';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { snapshotComponent } from '@/components/molecules/input/input.test';

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { name: mockedUser.user.name, username: mockedUser.user.username },
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
  describe('match snapshot', () => {
    snapshotComponent(<Avatar />);
  });

  it('Should render avatar with no image.', () => {
    render(<Avatar />);
    expect(screen.getByTestId('empty icon')).toBeInTheDocument();
  });

  it('Should render users avatar', async () => {
    render(<Avatar userId="user" />);
    await waitFor(() => expect(screen.getByTestId('customImage')).toBeInTheDocument(), { timeout: 2000 });
  });
});
