import { fireEvent, screen, waitFor } from '@testing-library/react';

import { mockedUser } from '@/utils/tests/mockedData';
import { render } from '@/utils/tests/utils';

import { NavAccountButton } from '@/components/molecules/navAccountButton/NavAccountButton';

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { name: mockedUser.user.name, id: mockedUser.user.id },
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
    it('menu initially hidden', () => {
      render(<NavAccountButton />);
      const menu = screen.queryByText('menu');
      expect(menu).toBeNull();
    });

    it('menu visible on mouseOver', () => {
      render(<NavAccountButton />);
      const button = screen.getByTestId('button');

      fireEvent.mouseOver(button);
      const menu = screen.getByTestId('menu');

      expect(menu).toBeInTheDocument();
    });

    it('menu visible on avatar click', async () => {
      render(<NavAccountButton />);

      const menu = screen.queryByTestId('menu');
      const avatarBtn = await screen.findByText(`@${mockedUser.user.username}`);
      fireEvent.click(avatarBtn);

      await waitFor(() => expect(menu).toBeNull(), { timeout: 2500 });
    });
  });
});
