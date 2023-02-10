import { fireEvent, screen } from '@testing-library/react';

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
    // it('should be initially hidden', async () => {
    //   render(<NavAccountButton userId="user" />);
    //   const menu = await screen.findByTestId('menu');
    //   expect(menu).not.toBeInTheDocument();
    // });

    it('should be visible on mouseOver', () => {
      render(<NavAccountButton userId="user" />);
      const button = screen.getByTestId('button');

      fireEvent.mouseOver(button);

      const menu = screen.getByTestId('menu');

      expect(menu).toBeInTheDocument();
    });
  });
});
