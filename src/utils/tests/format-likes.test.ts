import { describe, expect, test } from 'vitest';

import { formatLikes } from '@/src/utils/format-likes';

describe('format likes test', () => {
  test('it should convert to k', () => {
    const result = formatLikes(2000);
    expect(result).toBe('2k');
  });

  test('it should convert to m', () => {
    const result = formatLikes(2000000);
    expect(result).toBe('2m');
  });
});
