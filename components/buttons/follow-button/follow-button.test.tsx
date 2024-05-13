import { afterEach, describe, expect, test } from 'vitest';

import { cleanup, render, screen, waitFor } from '@/utils/tests/utils';

import { FollowButton } from '@/components/buttons/follow-button/follow-button';

afterEach(cleanup);

describe('follow button test', () => {
  test('should not be visible if userId is empty', async () => {
    render(<FollowButton userId="" />);

    waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Unfollow' }),
      ).not.toBeInTheDocument();
    });
  });

  test('should display correct text', async () => {
    render(<FollowButton userId="someId" />);
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent(/follow|unfollow/i);
    });
  });
});
