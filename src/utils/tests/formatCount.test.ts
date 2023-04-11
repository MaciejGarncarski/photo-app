import { formatCount } from '@/src/utils/formatCount';

describe('formatCount', () => {
  it('should return correct string', () => {
    expect(formatCount(1000)).toBe('1k');
    expect(formatCount(1500)).toBe('1.5k');
    expect(formatCount(1000000)).toBe('1m');
    expect(formatCount(100)).toBe('100');
  });
});
