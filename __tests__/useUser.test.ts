import { renderHook, waitFor } from '@testing-library/react';

import { useUser } from '@/hooks/useUser';
import { mockedUser } from '@/utils/tests/mockedData';
import { createWrapper } from '@/utils/tests/utils';

describe('useUserTest', () => {
  it('should pass when name is correct', async () => {
    const { result } = renderHook(() => useUser({ username: 'user' }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.id).toBe(mockedUser.user.id), { timeout: 500 });
  });
});
