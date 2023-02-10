import { renderHook, waitFor } from '@testing-library/react';

import { createWrapper } from '@/utils/tests/utils';

import { useUser } from '@/components/pages/account/useUser';

describe('useUserTest', () => {
  it('should pass when name is correct', async () => {
    const { result } = renderHook(() => useUser({ username: 'user' }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.name).toBe('Maciej Garncarski'));
  });
});
