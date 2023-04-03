import { fireEvent, screen } from '@testing-library/react';

import { mockedUser } from '@/src/utils/tests/mockedData';
import { render } from '@/src/utils/tests/utils';

import { Settings } from '@/src/components/organisms/settings/Settings';

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { name: mockedUser.name, username: mockedUser.username },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' };
    }),
  };
});

describe('Settings component', () => {
  describe('user integration', () => {
    it('should change theme', () => {
      render(<div id="modal" />);
      render(<Settings isVisible={true} closeModal={jest.fn()} />);
      const changeThemeBtn = screen.getByRole('button', { name: /Change theme to dark/i });
      fireEvent.click(changeThemeBtn);
      expect(changeThemeBtn).toHaveAccessibleName(/Change theme to light/i);
    });
  });
});
