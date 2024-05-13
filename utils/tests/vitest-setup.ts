import { QueryCache } from '@tanstack/react-query';
import { afterAll, afterEach, beforeAll } from 'vitest';
import 'vitest-dom/extend-expect';

import { server } from '@/mocks/mocks';

const queryCache = new QueryCache();

beforeAll(() => server.listen());

afterAll(() => {
  server.close();
});

afterEach(() => {
  server.resetHandlers();
  queryCache.clear();
});
