import { screen, within } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { render } from '@/src/utils/tests/utils';

import { Avatar } from '@/src/components/avatar/avatar';

describe('Avatar component', () => {
  test('should render placeholder if no userId provided', () => {
    render(<Avatar size="small" userId="" />);

    const loadingText = within(screen.getByText(/Loading avatar/));
    expect(loadingText).toBeDefined();
  });
});
