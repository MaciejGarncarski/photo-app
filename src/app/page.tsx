import { dehydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/src/utils/api/get-query-client';
import { Hydrate } from '@/src/utils/api/hydrate';
import { prefetchSession } from '@/src/utils/api/prefetch-session';

import { Home } from '@/src/components/pages/home/home';

const HomePage = async () => {
  const queryClient = getQueryClient();
  await prefetchSession(queryClient);

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <Home />
    </Hydrate>
  );
};

export default HomePage;
