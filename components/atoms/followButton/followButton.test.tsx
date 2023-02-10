import { fireEvent, renderHook, screen, waitFor } from '@testing-library/react';

import { mockedUser } from '@/utils/tests/mockedData';
import { createWrapper, render } from '@/utils/tests/utils';

import { FollowButton } from '@/components/atoms/followButton/FollowButton';
import { useFollowMutation } from '@/components/atoms/followButton/useFollowMutation';

describe('FollowButton test', () => {
  it('should render follow button', () => {
    render(<FollowButton userId="user" />);

    const button = screen.getByText(/follow/i);
    expect(button).toBeInTheDocument();
  });

  describe('useFollowMutation', () => {
    it('should pass when isIdle', async () => {
      render(<FollowButton userId="user" />);
      const button = screen.getByText(/follow/i);

      fireEvent.click(button);

      const { result } = renderHook(() => useFollowMutation(mockedUser.user.id), {
        wrapper: createWrapper(),
      });

      await waitFor(
        () => {
          return result.current.isIdle;
        },
        { timeout: 1000 },
      );

      expect(result.current.isIdle).toBe(true);
    });
  });
});
