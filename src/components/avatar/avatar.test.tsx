import { afterEach, describe, expect, test } from 'vitest';

import {
  cleanup,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@/src/utils/tests/utils';

import { Avatar } from '@/src/components/avatar/avatar';

afterEach(cleanup);

describe('Avatar component', () => {
  test('should render loading if no userId provided', async () => {
    render(<Avatar size="small" userId="" />);
    const loadingText = screen.queryByText(/Loading avatar/);
    expect(loadingText).toBeDefined();
    expect(loadingText?.className).toBe('visually-hidden');

    await waitFor(() => {
      expect(screen.queryByText(`@`)).toBeNull();
    });
  });

  test('should render avatar with userId provided', async () => {
    render(<Avatar size="small" userId="someId" />);

    await waitForElementToBeRemoved(() => screen.queryByText(/Loading avatar/));

    const avatar = screen.queryByAltText(/@/);
    const avatarPlaceholder = screen.queryByText(/@/);
    expect(avatar || avatarPlaceholder).toBeDefined();
  });
});
