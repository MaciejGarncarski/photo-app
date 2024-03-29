import { afterEach, describe, expect, test } from 'vitest';

import { cleanup, render, screen, waitFor } from '@/src/utils/tests/utils';

import { AccountPost } from '@/src/components/account-post/account-post';

afterEach(() => cleanup());

describe('account post test', () => {
  test('should display image', async () => {
    render(<AccountPost postId={2} />);

    await waitFor(() => {
      expect(screen.getByRole('img', { name: 'post' })).toBeInTheDocument();
    });
  });
});
