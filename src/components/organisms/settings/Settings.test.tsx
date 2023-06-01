import { fireEvent, screen } from '@testing-library/react';

import { render } from '@/src/utils/tests/utils';

import { Settings } from '@/src/components/organisms/settings/Settings';

describe('Settings component', () => {
  describe('user integration', () => {
    it('should change theme', () => {
      render(<Settings isVisible={true} closeModal={jest.fn()} />);
      const changeThemeBtn = screen.getByRole('button', {
        name: /Change theme to dark/i,
      });
      fireEvent.click(changeThemeBtn);
      expect(changeThemeBtn).toHaveAccessibleName(/Change theme to light/i);
    });
  });
});
