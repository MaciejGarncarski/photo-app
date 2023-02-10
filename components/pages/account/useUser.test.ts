import { renderHook, waitFor } from '@testing-library/react';

import { mockedUser } from '@/utils/tests/mockedData';
import { createWrapper } from '@/utils/tests/utils';

import { useUser } from '@/components/pages/account/useUser';

describe('useUserTest', () => {
  it('should pass when name is correct', async () => {
    const { result } = renderHook(() => useUser({ username: 'user' }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.id).toBe(mockedUser.user.id), { timeout: 500 });
  });
});
