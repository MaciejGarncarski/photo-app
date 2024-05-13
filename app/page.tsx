import { dehydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/utils/api/get-query-client';
import { Hydrate } from '@/utils/api/hydrate';

import { Home } from '@/components/pages/home/home';

const HomePage = async () => {
  const queryClient = getQueryClient();

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <Home />
    </Hydrate>
  );
};

export default HomePage;
