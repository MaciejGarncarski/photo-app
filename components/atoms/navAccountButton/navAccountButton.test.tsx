import { fireEvent, screen, waitFor } from '@testing-library/react';

import { mockedUser } from '@/utils/tests/mockedData';
import { render } from '@/utils/tests/utils';

import { NavAccountButton } from '@/components/atoms/navAccountButton/NavAccountButton';

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

describe('NavAccountButton', () => {
  describe('User integration', () => {
    it('menu should be initially hidden', () => {
      render(<NavAccountButton userId="user" />);
      const menu = screen.queryByText('menu');
      expect(menu).toBeNull();
    });

    it('should be visible on mouseOver', () => {
      render(<NavAccountButton userId="user" />);
      const button = screen.getByTestId('button');

      fireEvent.mouseOver(button);
      const menu = screen.getByTestId('menu');

      expect(menu).toBeInTheDocument();
    });

    it('should open on avatar click', async () => {
      render(<NavAccountButton userId="user" />);

      const menu = screen.queryByTestId('menu');
      const avatarBtn = await screen.findByText(`@${mockedUser.user.username}`);
      fireEvent.click(avatarBtn);

      await waitFor(() => expect(menu).toBeNull(), { timeout: 2500 });
    });
  });
});
