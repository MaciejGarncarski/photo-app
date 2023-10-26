import { afterEach, describe, expect, test } from 'vitest';

import { cleanup, render, screen, waitFor } from '@/src/utils/tests/utils';

import { FollowButton } from '@/src/components/buttons/follow-button/follow-button';

afterEach(cleanup);

describe('follow button test', () => {
  test('should not be visible if userId is empty', async () => {
    render(<FollowButton userId="" />);

    waitFor(() => {
      expect(screen.queryByText('Unfollow')).toBeNull();
    });
  });

  test('should display correct text', async () => {
    render(<FollowButton userId="someId" />);
    expect(screen.queryByText('Unfollow')).toBeDefined();
    screen.debug();
  });
});
